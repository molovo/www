import '@/components/mdx-client-components'
import Schema from '@/components/schema'
import Article from './article'
import { Article as ArticleSchema } from 'schema-dts'
import { notFound } from 'next/navigation'
import ArticleType from '@/types/article'
import { getPost, getPosts } from '@/data/posts'
import BreadcrumbSchema from '@/components/breadcrumb-schema'
import { StaticImageData } from 'next/dist/shared/lib/get-img-props'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import LineBreak from '@/components/line-break'
import Webmentions from '@/components/webmentions'
import { Suspense } from 'react'

const WebmentionsLoading = () => (
  <>
    <LineBreak />
    <aside className="mentions">
      <p>Loading webmentions&hellip;</p>
    </aside>
  </>
)

const SocialSharing = dynamic(() => import('@/components/social-sharing'), {
  loading: () => null,
  ssr: true,
})

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ uid: string }>
}) => {
  const { uid } = await params
  const post = await getPost(uid)

  if (!post) {
    notFound()
  }

  const { title, description, opengraphImage, opengraphImageAlt } =
    post as ArticleType

  const metadata: Metadata = {
    title,
    description,

    alternates: {
      canonical: `https://molovo.co/writing/${uid}`,
    },
  }

  if (opengraphImage) {
    metadata.openGraph = {
      images: [
        {
          url:
            typeof opengraphImage === 'string'
              ? opengraphImage
              : opengraphImage.src,
          alt: opengraphImageAlt,
        },
      ],
    }
  }

  return metadata
}

// Every param is prerendered via generateStaticParams, so awaiting params
// outside Suspense is fine. This only opts out of the dev-time instant check.
export const instant = false

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((study) => ({
    uid: study.slug,
  }))
}

const Page = async ({ params }: { params: Promise<{ uid: string }> }) => {
  const { uid } = await params
  const post = await getPost(uid)

  if (!post) {
    notFound()
  }

  const { slug, title, description, image, date } = post

  const socialSharing = <SocialSharing title={title.replace('_', '')} />
  const webmentions = (
    <Suspense fallback={<WebmentionsLoading />}>
      <Webmentions slug={slug as string} />
    </Suspense>
  )

  const jsonLd: ArticleSchema = {
    '@type': 'Article',
    headline: title,
    name: title,
    description,
    datePublished: new Date(date).toUTCString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://molovo.co/writing/${uid}`,
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
    url: `https://molovo.co/writing/${uid}`,
  }

  if (image) {
    jsonLd.image = {
      '@type': 'ImageObject',
      url: (image as StaticImageData)?.src,
      height: `${(image as StaticImageData)?.height}px`,
      width: `${(image as StaticImageData)?.width}px`,
      representativeOfPage: true,
    }
  }

  return (
    <>
      <Article
        post={post}
        socialSharing={socialSharing}
        webmentions={webmentions}
      />
      <Schema content={jsonLd} />
      <BreadcrumbSchema
        title={title}
        url={`https://molovo.co/writing/${post.slug}`}
        parentTitle={'Writing'}
      />
    </>
  )
}

export default Page
