'use server'

import { getPosts } from '../../data'
import Listing from '../../listing'

const Page = async ({ params: { tag } }: { params: { tag: string } }) => {
  const posts = (await getPosts()).filter(({ metadata }) =>
    metadata.tags?.includes(tag),
  )

  return <Listing posts={posts} />
}

export default Page
