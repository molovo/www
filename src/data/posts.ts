'use server'

import ArticleType from '@/types/article'
import { glob } from 'glob'
import React from 'react'
import { importContent } from './helpers'

export const getPosts = async (slugs?: string[]): Promise<ArticleType[]> => {
  const files = await glob(
    `${process.cwd()}/content/${
      process.env.NODE_ENV === 'development' ? '{_drafts/,}' : ''
    }posts/${slugs ? `{${slugs.join(',')}}` : '*'}.mdx`,
  )

  const posts = await Promise.all(
    files
      .map((filename: string) => filename.match(/\/([^\/]+)\.mdx$/)?.[1])
      .map(async (slug) => {
        const post = await importContent(`posts/${slug}`)

        const { metadata } = post

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
    const post = await importContent(`posts/${slug}`)

    const { metadata, default: Content } = post

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
