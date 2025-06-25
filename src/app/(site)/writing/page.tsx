import { getPosts } from '@/data/posts'
import Writing from './writing'
import BreadcrumbSchema from '@/components/breadcrumb-schema'

export const dynamic = 'force-static'

export const metadata = {
  title: 'Writing',
  description:
    'I write about design, development and the web. Here are a few of my favourite articles.',
  alternates: {
    canonical: 'https://molovo.co/writing',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}

const Page = async () => {
  const posts = await getPosts()

  return (
    <>
      <Writing posts={posts} />
      <BreadcrumbSchema title={'Writing'} url={'https://molovo.co/writing'} />
    </>
  )
}

export default Page
