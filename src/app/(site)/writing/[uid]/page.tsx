import Image from 'next/image'
import Article from './article'

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

  return <Article content={<Content />} metadata={metadata} uid={uid} />
}

export default Page
