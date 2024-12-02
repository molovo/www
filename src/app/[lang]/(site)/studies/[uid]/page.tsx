import { glob } from 'glob'
import CaseStudy from './case-study'
import { notFound } from 'next/navigation'
import CaseStudyType, { CaseStudySectionType } from '@/types/case-study'
import { Metadata } from 'next'
import { Article } from 'schema-dts'
import Schema from '@/components/schema'
import { getStudies } from '@/data/studies'

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
          `content/studies/${slug}/sections/${order}.${sectionSlug}.mdx`
        )
        return {
          order,
          content: <Content />,
          slug: sectionSlug,
          ...metadata,
        } as CaseStudySectionType
      }),
  )

  return sections
    .filter((value) => value !== undefined)
    .sort((a, b) => ((a.order || 99) > (b.order || 99) ? 1 : -1))
}

export const getPost = async (slug: string): Promise<CaseStudyType> => {
  'use server'

  try {
    const { metadata } = await import(`content/studies/${slug}/index.mdx`)

    const sections = await getSections(slug)

    let next
    if (metadata.next) {
      try {
        const { metadata: nextMetadata } = await import(
          `content/studies/${metadata.next}/index.mdx`
        )
        next = {
          ...nextMetadata,
          slug: metadata.next,
          url: `/studies/${metadata.next}`,
        }
      } catch (error) {
        console.error(error)
      }
    }

    return { ...metadata, slug: slug, sections, next }
  } catch (error) {
    if ((error as Error).message.startsWith('Cannot find module')) {
      notFound()
    }

    throw error
  }
}

export const generateMetadata = async ({
  params: { uid },
}: {
  params: { uid: string }
}): Promise<Metadata> => {
  const study = await getPost(uid)

  const { title, description } = study

  return {
    title,
    description,
    openGraph: {
      images: [
        {
          url: `/api/content/studies/${uid}/og-image.jpg`,
        },
      ],
    },
    twitter: {
      images: `/api/content/studies/${uid}/og-image.jpg`,
    },
  }
}

export async function generateStaticParams() {
  const studies = await getStudies()

  return studies.map((study) => ({
    lang: 'en',
    uid: study.slug,
  }))
}

const Page = async ({ params: { uid } }: { params: { uid: string } }) => {
  const study = await getPost(uid)

  const jsonLd: Article = {
    '@type': 'Article',
    headline: study.title,
    name: `${study.client} Case Study`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://molovo.co/studies/${uid}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Molovo',
      sameAs: 'https://molovo.co',
    },
    author: {
      '@type': 'Person',
      name: 'James Dinsdale',
      sameAs: 'https://molovo.co',
    },
    url: `https://molovo.co/studies/${uid}`,
    image: `https://molovo.co/api/content/studies/${uid}/og-image.jpg`,
  }

  return (
    <>
      <CaseStudy study={study} />
      <Schema content={jsonLd} />
    </>
  )
}

export default Page
