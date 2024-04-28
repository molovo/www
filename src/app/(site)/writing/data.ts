import ArticleType from '@/types/article'
import { glob } from 'glob'

export const getPosts = async (): Promise<ArticleType[]> => {
  const files = await glob(`${process.cwd()}/content/posts/*.mdx`)
  const posts = await Promise.all(
    files
      .map((filename) => filename.match(/\/([^\/]+)\.mdx$/)?.[1])
      .map(async (slug) => {
        const { metadata } = await import(`/content/posts/${slug}.mdx`)

        return { slug, metadata } as ArticleType
      }),
  )

  posts.sort((a, b) => (a.metadata.date > b.metadata.date ? -1 : 1))

  return posts.filter((value) => value !== undefined)
}
