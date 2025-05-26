import CaseStudy from './case-study'
import { Metadata } from 'next'
import { Article } from 'schema-dts'
import Schema from '@/components/schema'
import { getStudies, getStudy } from '@/data/studies'
import { notFound } from 'next/navigation'
import BreadcrumbSchema from '@/components/breadcrumb-schema'

export const generateMetadata = async ({
  params: { uid },
}: {
  params: { uid: string }
}): Promise<Metadata> => {
  const study = await getStudy(uid)

  if (!study) {
    notFound()
  }

  const { title, description, client } = study

  return {
    title: `${title}: Making ${client}`,
    description,
    openGraph: {
      images: [
        {
          url: `/images/studies/${uid}/og-image.jpg`,
        },
      ],
    },
    twitter: {
      images: `/images/studies/${uid}/og-image.jpg`,
    },
    alternates: {
      canonical: `https://molovo.co/studies/${uid}`,
      types: {
        'application/rss+xml': '/feed.xml',
      },
    },
  }
}

export async function generateStaticParams() {
  const studies = await getStudies()

  return studies.map((study) => ({
    uid: study.slug,
  }))
}

const Page = async ({ params: { uid } }: { params: { uid: string } }) => {
  const study = await getStudy(uid)

  if (!study) {
    notFound()
  }

  const { title, client } = study

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
    image: {
      '@type': 'ImageObject',
      url: `https://molovo.co/images/studies/${uid}/og-image.jpg`,
      height: '630px',
      width: '1200px',
      representativeOfPage: true,
    },
  }

  return (
    <>
      <CaseStudy study={study} />
      <Schema content={jsonLd} />
      <BreadcrumbSchema
        title={`${title}: Making ${client}`}
        url={`https://molovo.co/studies/${uid}`}
      />
    </>
  )
}

export default Page
