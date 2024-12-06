import { getPosts } from '@/data/posts'
import Writing from './writing'
import BreadcrumbSchema from '@/components/breadcrumb-schema'

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
