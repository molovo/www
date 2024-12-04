'use server'

import ArticleType from '@/types/article'
import { glob } from 'glob'
import React from 'react'

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
      const { metadata, default: Content } = await import(
        `/content/posts/${slug}.mdx`
      )

      return { slug, ...metadata } as ArticleType
    }),
  )

  if (slugs) {
    return slugs
      .map((slug) => posts.find(({ slug: s }) => s === slug))
      .filter((post) => post !== undefined) as ArticleType[]
  }

  posts.sort((a, b) => (a.date > b.date ? -1 : 1))

  return posts.filter((post) => post !== undefined)
}

export const getPost = async (
  slug: string,
): Promise<ArticleType | undefined> => {
  try {
    const { metadata, default: Content } = await import(
      `/content/posts/${slug}.mdx`
    )

    return {
      ...metadata,
      content: React.createElement(Content),
      slug,
    }
  } catch (error) {
    if ((error as Error).message.startsWith('Cannot find module')) {
      return
    }

    throw error
  }
}
