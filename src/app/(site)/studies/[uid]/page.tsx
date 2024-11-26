import { glob } from 'glob'
import CaseStudy from './case-study'
import { notFound } from 'next/navigation'
import CaseStudyType, { CaseStudySectionType } from '@/types/case-study'
import { ReactNode } from 'react'
import { Metadata } from 'next'
import { Article } from 'schema-dts'
import Schema from '@/components/schema'

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
