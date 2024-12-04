import { getPosts } from '@/data/posts'
import Writing from './writing'
import BreadcrumbSchema from '@/components/breadcrumb-schema'

export const generateStaticParams = async () => [{ lang: 'en' }]

const Page = async () => {
  let posts = await getPosts()

  return (
    <>
      <Writing posts={posts} />
      <BreadcrumbSchema title={'Writing'} url={'/writing'} />
    </>
  )
}

export default Page
