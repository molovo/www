import Schema from '@/components/schema'
import Article from './article'
import { Article as ArticleSchema } from 'schema-dts'

const getPost = async (slug: string) => {
  'use server'

  const { metadata, default: Content } = await import(
    `content/posts/${slug}.mdx`
  )

  return { Content, slug, metadata }
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
  const { Content, metadata }: { [key: string]: any } = await getPost(uid)

  const jsonLd: ArticleSchema = {
    '@type': 'Article',
    headline: metadata.title,
    name: metadata.title,
    datePublished: new Date(metadata.date).toUTCString(),
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
    url: `https://molovo.co/studies/${uid}`,
    image: `https://molovo.co/api/content/studies/${uid}/og-image.jpg`,
  }

  return (
    <>
      <Article content={<Content />} metadata={metadata} uid={uid} />
      <Schema content={jsonLd} />
    </>
  )
}

export default Page
