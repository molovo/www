import { glob } from 'glob'
import CaseStudy from './case-study'
import { notFound } from 'next/navigation'

const getSections = async (slug: string) => {
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
          metadata: { ...metadata, slug: sectionSlug },
        }
      })
      .sort((a, b) => (a.order > b.order ? 1 : -1)),
  )

  return sections.filter((value) => value !== undefined)
}

const getPost = async (slug: string) => {
  'use server'

  try {
    const { metadata } = await import(`/content/studies/${slug}/index.mdx`)
    const sections = await getSections(slug)

    return { slug, metadata, sections }
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
  const { metadata } = await getPost(uid)

  return metadata
}

const Page = async ({ params: { uid } }: { params: { uid: string } }) => {
  const { metadata, sections }: { [key: string]: any } = await getPost(uid)

  return <CaseStudy study={{ slug: uid, ...metadata }} sections={sections} />
}

export default Page
