'use server'

import CaseStudyType, { CaseStudySectionType } from '@/types/case-study'
import { glob } from 'glob'
import React from 'react'

export const getStudies = async (
  clients?: string[],
): Promise<CaseStudyType[]> => {
  'use server'

  const files = await glob(
    `${process.cwd()}/content/${
      process.env.NODE_ENV === 'development' ? '{_drafts/,}' : ''
    }studies/${clients ? `{${clients.join(',')}}` : '*'}/index.mdx`,
  )

  const items = await Promise.all(
    files
      .map((filename) => filename.match(/\/([^\/]+)\/index\.mdx$/)?.[1])
      .map(async (slug) => {
        if (!slug) {
          return undefined
        }

        const { metadata, default: Content } = await import(
          `/content/studies/${slug}/index.mdx`
        )
        return { ...metadata, slug } as CaseStudyType
      }) as Promise<CaseStudyType>[],
  )

  if (clients) {
    return clients
      .map((slug) => items.find(({ slug: s }) => s === slug))
      .filter((item) => item !== undefined) as CaseStudyType[]
  }

  return items.filter((item) => item !== undefined)
}

export const getStudy = async (
  slug: string,
): Promise<CaseStudyType | undefined> => {
  'use server'

  try {
    let study

    try {
      study = await import(`/content/studies/${slug}/index.mdx`)
    } catch (error) {
      if ((error as Error).message.startsWith('Cannot find module')) {
        if (!study && process.env.NODE_ENV === 'development') {
          study = await import(`/content/_drafts/studies/${slug}/index.mdx`)
        }
      }
    }

    const { metadata, default: Content } = study

    const sections = await getSections(slug)

    let next, prev
    try {
      if (metadata.prev) {
        const { metadata: prevMetadata } = await import(
          `content/studies/${metadata.prev}/index.mdx`
        )
        prev = {
          ...prevMetadata,
          slug: metadata.prev,
          url: `/studies/${metadata.prev}`,
        }
      }
      if (metadata.next) {
        const { metadata: nextMetadata } = await import(
          `content/studies/${metadata.next}/index.mdx`
        )
        next = {
          ...nextMetadata,
          slug: metadata.next,
          url: `/studies/${metadata.next}`,
        }
      }
    } catch (error) {
      console.error(error)
    }

    return { ...metadata, slug, sections, next, prev }
  } catch (error) {
    if ((error as Error).message.startsWith('Cannot find module')) {
      return
    }

    throw error
  }
}

export const getSections = async (
  slug: string,
): Promise<CaseStudySectionType[]> => {
  const files = await glob(
    `${process.cwd()}/content/${
      process.env.NODE_ENV === 'development' ? '{_drafts/,}' : ''
    }studies/${slug}/sections/*.mdx`,
  )
  const sections = await Promise.all(
    files
      .map((filename) => filename.match(/([0-9]+)\.([^\/]+)\.mdx$/))
      .map(async (matches) => {
        try {
          const [, order, sectionSlug] = matches || []
          const { metadata, default: Content } = await import(
            `content/studies/${slug}/sections/${order}.${sectionSlug}.mdx`
          )

          return {
            order,
            content: React.createElement(Content),
            slug: sectionSlug,
            ...metadata,
          } as CaseStudySectionType
        } catch (error) {
          if ((error as Error).message.startsWith('Cannot find module')) {
            return
          }

          throw error
        }
      }),
  )

  return (
    sections.filter((value) => value !== undefined) as CaseStudySectionType[]
  ).sort((a, b) => ((a.order || 99) > (b.order || 99) ? 1 : -1))
}
