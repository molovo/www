'use server'

import Listing from '@/components/listing'
import { getPosts } from '@/data/posts'

const Page = async () => {
  let posts = await getPosts()

  return (
    <section className="writing">
      <div className="writing__content">
        <Listing posts={posts} />
      </div>
    </section>
  )
}

export default Page
