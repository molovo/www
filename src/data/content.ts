import ArticleType from '@/types/article'
import CaseStudyType from '@/types/case-study'
import ProjectType from '@/types/project'
import { glob } from 'glob'
import { readFile } from 'fs/promises'
import { cacheLife } from 'next/cache'
import { SoftwareSourceCode } from 'schema-dts'
import { importContent } from './helpers'

export type StudyIndexEntry = CaseStudyType & {
  prevSlug?: string
  nextSlug?: string
  sectionFiles: string[]
}

const drafts = process.env.NODE_ENV === 'development' ? '{_drafts/,}' : ''

const findSlugs = async (pattern: string, matcher: RegExp) =>
  (await glob(`${process.cwd()}/content/${drafts}${pattern}`))
    .map((filename) => filename.match(matcher)?.[1])
    .filter((slug): slug is string => !!slug)
    .sort()

// Components (e.g. HeaderComponent) can't be cached, so they're dropped here
// and loaded alongside the MDX content in getPost/getStudy instead.
const serialisable = <T>(metadata: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(metadata).filter(([, value]) => typeof value !== 'function'),
  ) as T

const loadPosts = async () => {
  const slugs = await findSlugs('posts/*.mdx', /\/([^/]+)\.mdx$/)

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = await importContent(`posts/${slug}`)
      return { ...serialisable<ArticleType>(metadata), slug }
    }),
  )

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

const loadStudies = async () => {
  const slugs = await findSlugs('studies/*/index.mdx', /\/([^/]+)\/index\.mdx$/)

  const studies = await Promise.all(
    slugs.map(async (slug) => {
      const [{ metadata }, sectionFiles] = await Promise.all([
        importContent(`studies/${slug}/index`),
        findSlugs(`studies/${slug}/sections/*.mdx`, /\/([0-9]+\.[^/]+)\.mdx$/),
      ])
      return { ...serialisable<CaseStudyType>(metadata), slug, sectionFiles }
    }),
  )

  studies.sort((a, b) => (a.order ?? 999) - (b.order ?? 999))

  return studies.map(
    ({ prev, next, ...study }, index): StudyIndexEntry =>
      ({
        ...study,
        prevSlug: (prev as unknown as string) ?? studies[index - 1]?.slug,
        nextSlug:
          (next as unknown as string) ??
          (studies[index + 1] || studies[0])?.slug,
      }) as StudyIndexEntry,
  )
}

const loadProjects = async () => {
  const slugs = await findSlugs('projects/*.mdx', /\/([^/]+)\.mdx$/)

  const projects = await Promise.all(
    slugs.map(async (slug): Promise<ProjectType> => {
      const { metadata } = await importContent(`projects/${slug}`)
      const code = await readFile(
        `${process.cwd()}/content/projects/${slug}.code`,
        'utf-8',
      )

      const jsonLd: SoftwareSourceCode = {
        '@type': 'SoftwareSourceCode',
        name: metadata.title,
        description: metadata.description,
        url: metadata.url,
        codeRepository: metadata.repo,
        programmingLanguage: metadata.language,
      }

      return { slug, metadata: serialisable(metadata), code, jsonLd }
    }),
  )

  return projects.sort((a, b) => a.metadata.order - b.metadata.order)
}

export const getContentIndex = async () => {
  'use cache'
  cacheLife('max')

  const [posts, studies, projects] = await Promise.all([
    loadPosts(),
    loadStudies(),
    loadProjects(),
  ])

  return { posts, studies, projects }
}

export const pick = <T extends { slug: string }>(items: T[], slugs?: string[]) =>
  slugs
    ? slugs
        .map((slug) => items.find((item) => item.slug === slug))
        .filter((item): item is T => item !== undefined)
    : items
