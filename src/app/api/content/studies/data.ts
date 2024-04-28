import CaseStudyType from '@/types/case-study'
import { glob } from 'glob'

export async function getStudies(
  clients: string[] = [],
): Promise<CaseStudyType[]> {
  const files = await glob(`${process.cwd()}/content/studies/*/index.mdx`)

  return Promise.all(
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
        return { ...metadata, slug }
      })

      .filter((item) => item !== undefined),
  )
}
