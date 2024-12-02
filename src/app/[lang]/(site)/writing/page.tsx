import { getPosts } from '@/data/posts'
import Writing from './writing'

export const generateStaticParams = async () => [{ lang: 'en' }]

const Page = async () => {
  let posts = await getPosts()

  return <Writing posts={posts} />
}

export default Page
