import Schema from '@/components/schema'
import Article from './article'
import { Article as ArticleSchema } from 'schema-dts'
import { notFound } from 'next/navigation'
import ArticleType from '@/types/article'
import { getPost, getPosts } from '@/data/posts'

export const generateMetadata = async ({
  params: { uid },
}: {
  params: { uid: string }
}) => {
  const post = await getPost(uid)

  if (!post) {
    notFound()
  }

  const { title, description } = post as ArticleType

  return {
    title,
    description,
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((study) => ({
    lang: 'en',
    uid: study.slug,
  }))
}

const Page = async ({ params: { uid } }: { params: { uid: string } }) => {
  const post = await getPost(uid)

  if (!post) {
    notFound()
  }

  const jsonLd: ArticleSchema = {
    '@type': 'Article',
    headline: post.title,
    name: post.title,
    datePublished: new Date(post.date).toUTCString(),
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
      <Article post={post} />
      <Schema content={jsonLd} />
    </>
  )
}

export default Page
