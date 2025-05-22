import { getPosts } from '@/data/posts'
import { getStudies } from '@/data/studies'

const ROOT = 'https://molovo.co'

export default async function sitemap() {
  return [
    {
      url: `${ROOT}/`,
      lastModified: new Date(),
    },

    {
      url: `${ROOT}/writing`,
      lastModified: new Date(),
    },

    ...(await getPosts()).map((post) => ({
      url: `${ROOT}/writing/${post.slug}`,
      lastModified: new Date(),
    })),

    ...(await getStudies()).map((study) => ({
      url: `${ROOT}/studies/${study.slug}`,
      lastModified: new Date(),
    })),
  ]
}
