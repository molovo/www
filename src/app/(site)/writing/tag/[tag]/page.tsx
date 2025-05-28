'use server'

import { getPosts } from '@/data/posts'
import Listing from '@/components/listing'

export const generateStaticParams = async () => {
  const posts = await getPosts()
  const tags = new Set(posts.flatMap(post => post.tags || []))

  return Array.from(tags).map(tag => ({ tag }))
}

const Page = async ({ params: { tag } }: { params: { tag: string } }) => {
  const posts = (await getPosts()).filter(({ tags }) => tags?.includes(tag))

  return (
    <section className="writing">
      <div className="writing__content">
        <Listing posts={posts} />
      </div>
    </section>
  )
}

export default Page
