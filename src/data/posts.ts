'use server'

import ArticleType from '@/types/article'
import { glob } from 'glob'

export const getPosts = async (slugs?: string[]): Promise<ArticleType[]> => {
  const files = (
    await glob(
      `${process.cwd()}/content/posts/${
        slugs ? `{${slugs.join(',')}}` : '*'
      }.mdx`,
    )
  ).map((filename: string) => filename.match(/\/([^\/]+)\.mdx$/)?.[1])

  const posts = await Promise.all(
    files.map(async (slug) => {
      const { metadata } = await import(`content/posts/${slug}.mdx`)

      return { slug, metadata } as ArticleType
    }),
  )

  if (slugs) {
    return slugs.map((slug) => posts.find(({ slug: s }) => s === slug))
      .filter((post) => post !== undefined) as ArticleType[]
  }

  posts.sort((a, b) => (a.metadata.date > b.metadata.date ? -1 : 1))

  return posts.filter((post) => post !== undefined)
}
