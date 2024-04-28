'use server'

import Listing from './listing'
import { getPosts } from './data'

const Page = async () => {
  let posts = await getPosts()

  return <Listing posts={posts} />
}

export default Page
