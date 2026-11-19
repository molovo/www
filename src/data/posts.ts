import ArticleType from '@/types/article'
import React from 'react'
import { getContentIndex, pick } from './content'
import { importContent } from './helpers'

export const getPosts = async (slugs?: string[]): Promise<ArticleType[]> =>
  pick((await getContentIndex()).posts, slugs)

export const getPost = async (
  slug: string,
): Promise<ArticleType | undefined> => {
  const metadata = (await getContentIndex()).posts.find((p) => p.slug === slug)

  if (!metadata) {
    return
  }

  const { default: Content, metadata: raw } = await importContent(
    `posts/${slug}`,
  )

  return {
    ...metadata,
    HeaderComponent: raw.HeaderComponent,
    content: React.createElement(Content),
  }
}
