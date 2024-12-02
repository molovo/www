'use server'

import CaseStudyType from '@/types/case-study'
import { glob } from 'glob'

export const getStudies = async (
  clients: string[] = [],
): Promise<CaseStudyType[]> => {
  'use server'

  const files = await glob(
    `${process.cwd()}/content/studies/${
      clients ? `{${clients.join(',')}}` : '*'
    }/index.mdx`,
  )

  const items = await Promise.all(
    files
      .map((filename) => filename.match(/\/([^\/]+)\/index\.mdx$/)?.[1])
      .map(async (slug) => {
        if (
          !slug ||
          (clients.length > 0 && !clients.includes(slug as string))
        ) {
          return undefined
        }

        const { metadata }: { metadata: CaseStudyType } = await import(
          `/content/studies/${slug}/index.mdx`
        )
        return { ...metadata, slug } as CaseStudyType
      }) as Promise<CaseStudyType>[],
  )

  if (clients.length > 0) {
    return clients
      .map((client) => items.find((item) => item?.slug === client))
      .filter((i) => i !== undefined) as CaseStudyType[]
  }

  return items.filter((item) => item !== undefined)
}
