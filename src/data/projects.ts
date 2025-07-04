'use server'

import ProjectType from '@/types/project'
import { glob } from 'glob'
import { readFile } from 'fs/promises'
import { importContent } from './helpers'
import { SoftwareSourceCode } from 'schema-dts'

export const getProjects = async (slugs?: string[]): Promise<ProjectType[]> => {
  const files = (
    await glob(
      `${process.cwd()}/content/${
        process.env.NODE_ENV === 'development' ? '{_drafts/,}' : ''
      }projects/${slugs ? `{${slugs.join(',')}}` : '*'}.mdx`,
    )
  ).map((filename: string) => filename.match(/\/([^\/]+)\.mdx$/)?.[1])

  const projects = await Promise.all(
    files.map(async (slug) => {
      const project = await importContent(`projects/${slug}`)
      const { metadata } = project
      const code = await readFile(
        `${process.cwd()}/content/projects/${slug}.code`,
        'utf-8',
      )

      // Pre-process JSON-LD schema at build time
      const jsonLd: SoftwareSourceCode = {
        '@type': 'SoftwareSourceCode',
        name: metadata.title,
        description: metadata.description,
        url: metadata.url,
        codeRepository: metadata.repo,
        programmingLanguage: metadata.language,
      }

      return { slug, metadata, code, jsonLd } as ProjectType
    }),
  )

  if (slugs) {
    return slugs
      .map((slug) => projects.find(({ slug: s }) => s === slug))
      .filter((project) => project !== undefined) as ProjectType[]
  }

  projects.sort((a, b) => a.metadata.order - b.metadata.order)

  return projects.filter((project) => project !== undefined)
}
