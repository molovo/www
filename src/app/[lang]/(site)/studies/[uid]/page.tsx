import CaseStudy from './case-study'
import { Metadata } from 'next'
import { Article } from 'schema-dts'
import Schema from '@/components/schema'
import { getStudies, getStudy } from '@/data/studies'
import { notFound } from 'next/navigation'

export const generateMetadata = async ({
  params: { uid },
}: {
  params: { uid: string }
}): Promise<Metadata> => {
  const study = await getStudy(uid)

  if (!study) {
    notFound()
  }

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
  const study = await getStudy(uid)

  if (!study) {
    notFound()
  }

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
