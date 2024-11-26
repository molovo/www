import { getPosts } from '@/data/posts'
import { getStudies } from '@/data/studies'
import RSS from 'rss'

export async function GET() {
  const feed = new RSS({
    title: 'molovo.co',
    description: 'I make websites.',
    feed_url: 'https://molovo.co/feed.xml',
    site_url: 'https://molovo.co',
    managingEditor: 'hi@molovo.co (James Dinsdale)',
    webMaster: 'hi@molovo.co (James Dinsdale)',
    copyright: 'Copyright 2024, molovo',
    language: 'en-GB',
    pubDate: new Date().toUTCString(),
    ttl: 60,
  })

  const posts = await getPosts()

  posts.forEach((post) => {
    feed.item({
      title: post.metadata.title,
      description: post.metadata.description,
      url: `https://molovo.co/writing/${post.slug}`,
      date: new Date(post.metadata.date).toUTCString(),
    })
  })

  const studies = await getStudies()

  studies.forEach((study) => {
    feed.item({
      title: study.title,
      description: study.description,
      url: `https://molovo.co/studies/${study.slug}`,
      date: new Date(study.date).toUTCString(),
    })
  })

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
