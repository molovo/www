import { getPosts } from '@/data/posts'
import { getStudies } from '@/data/studies'

const ROOT = 'https://molovo.co'

export default async function sitemap() {
  const [posts, studies] = await Promise.all([getPosts(), getStudies()])
  const latest = posts[0]?.date

  return [
    { url: `${ROOT}/`, lastModified: latest },
    { url: `${ROOT}/writing`, lastModified: latest },
    ...posts.map((post) => ({
      url: `${ROOT}/writing/${post.slug}`,
      lastModified: post.date,
    })),
    ...studies.map((study) => ({
      url: `${ROOT}/studies/${study.slug}`,
      lastModified: study.date,
    })),
  ]
}
