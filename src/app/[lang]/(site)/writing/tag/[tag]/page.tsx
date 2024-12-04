'use server'

import { getPosts } from '@/data/posts'
import Listing from '@/components/listing'

const Page = async ({ params: { tag } }: { params: { tag: string } }) => {
  const posts = (await getPosts()).filter(({ tags }) =>
    tags?.includes(tag),
  )

  return (
    <section className="writing">
      <div className="writing__content">
        <Listing posts={posts} />
      </div>
    </section>
  )
}

export default Page
