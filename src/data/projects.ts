'use server'

import ProjectType from '@/types/project'
import { glob } from 'glob'
import { readFile } from 'fs/promises'

export const getProjects = async (slugs?: string[]): Promise<ProjectType[]> => {
  const files = (
    await glob(
      `${process.cwd()}/content/projects/${
        slugs ? `{${slugs.join(',')}}` : '*'
      }.mdx`,
    )
  )
    .map((filename: string) => filename.match(/\/([^\/]+)\.mdx$/)?.[1])
    .filter((slug) => !slugs || (slug && slugs.includes(slug)))

  const projects = await Promise.all(
    files.map(async (slug) => {
      const { metadata } = await import(`content/projects/${slug}.mdx`)
      const code = await readFile(
        `${process.cwd()}/content/projects/${slug}.code`,
        'utf-8',
      )

      return { slug, metadata, code } as ProjectType
    }),
  )

  projects.sort((a, b) => a.metadata.order - b.metadata.order)

  return projects.filter((project) => project !== undefined)
}
