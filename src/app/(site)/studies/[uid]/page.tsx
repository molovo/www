import { glob } from 'glob'
import CaseStudy from './case-study'
import { notFound } from 'next/navigation'
import CaseStudyType, { CaseStudySectionType } from '@/types/case-study'

export const getSections = async (
  slug: string,
): Promise<CaseStudySectionType[]> => {
  const files = await glob(
    `${process.cwd()}/content/studies/${slug}/sections/*.mdx`,
  )
  const sections = await Promise.all(
    files
      .map((filename) => filename.match(/([0-9]+)\.([^\/]+)\.mdx$/))
      .map(async (matches) => {
        const [, order, sectionSlug] = matches || []
        const { metadata, default: Content } = await import(
          `/content/studies/${slug}/sections/${order}.${sectionSlug}.mdx`
        )
        return {
          order,
          content: <Content />,
          slug: sectionSlug,
          ...metadata,
        } as CaseStudySectionType
      })
      .sort((a, b) => ((a.order || 99) > (b.order || 99) ? 1 : -1)),
  )

  return sections.filter((value) => value !== undefined)
}

export const getPost = async (slug: string): Promise<CaseStudyType> => {
  'use server'

  try {
    const { metadata } = await import(`content/studies/${slug}/index.mdx`)
    const sections = await getSections(slug)

    return { ...metadata, slug: slug, sections }
  } catch (error) {
    console.error(error)
    notFound()
  }
}

export const generateMetadata = async ({
  params: { uid },
}: {
  params: { uid: string }
}) => {
  const study = await getPost(uid)

  study.image = `/api/content/studies/${uid}/og-image`

  return study
}

const Page = async ({ params: { uid } }: { params: { uid: string } }) => {
  const study = await getPost(uid)

  return <CaseStudy study={study} sections={study.sections} />
}

export default Page
