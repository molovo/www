import CaseStudyType, { CaseStudySectionType } from '@/types/case-study'
import React from 'react'
import { getContentIndex, pick, StudyIndexEntry } from './content'
import { importContent } from './helpers'

const withoutLinks = ({
  prevSlug: _prev,
  nextSlug: _next,
  sectionFiles: _sections,
  ...study
}: StudyIndexEntry) => study as CaseStudyType

export const getStudies = async (
  clients?: string[],
): Promise<CaseStudyType[]> =>
  pick((await getContentIndex()).studies, clients).map(withoutLinks)

export const getStudy = async (
  slug: string,
): Promise<CaseStudyType | undefined> => {
  const { studies } = await getContentIndex()
  const study = studies.find((s) => s.slug === slug)

  if (!study) {
    return
  }

  const link = (linked?: string) => {
    const entry = studies.find((s) => s.slug === linked)
    return entry && { ...withoutLinks(entry), url: `/studies/${entry.slug}` }
  }

  return {
    ...withoutLinks(study),
    sections: await getSections(slug, study.sectionFiles),
    prev: link(study.prevSlug),
    next: link(study.nextSlug),
  } as CaseStudyType
}

const getSections = async (
  slug: string,
  files: string[],
): Promise<CaseStudySectionType[]> => {
  const sections = await Promise.all(
    files.map(async (file) => {
      const [order, sectionSlug] = file.split('.')
      const { metadata, default: Content } = await importContent(
        `studies/${slug}/sections/${file}`,
      )

      return {
        order,
        content: React.createElement(Content),
        slug: sectionSlug,
        ...metadata,
      } as CaseStudySectionType
    }),
  )

  return sections.sort((a, b) => ((a.order || 99) > (b.order || 99) ? 1 : -1))
}
