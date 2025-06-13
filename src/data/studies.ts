'use server'

import CaseStudyType, { CaseStudySectionType } from '@/types/case-study'
import { glob } from 'glob'
import React from 'react'
import { importContent } from './helpers'

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

        const study = await importContent(`studies/${slug}/index`)

        const { metadata, default: Content } = study

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
    const study = await importContent(`studies/${slug}/index`)

    const { metadata, default: Content } = study

    const sections = await getSections(slug)

    let next, prev
    try {
      if (metadata.prev) {
        const { metadata: prevMetadata } = await importContent(
          `studies/${metadata.prev}/index`,
        )
        prev = {
          ...prevMetadata,
          slug: metadata.prev,
          url: `/studies/${metadata.prev}`,
        }
      }
      if (metadata.next) {
        const { metadata: nextMetadata } = await importContent(
          `studies/${metadata.next}/index`,
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
          const { metadata, default: Content } = await importContent(
            `studies/${slug}/sections/${order}.${sectionSlug}`,
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
