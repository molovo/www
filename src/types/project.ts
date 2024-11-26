export interface ProjectMetadataType {
  order: number
  slug: string
  title: string
  description: string
  url: string
  repo: string
  language: string
  tags?: string[]
  featured?: boolean
}

export default interface ProjectType {
  slug: string
  metadata: ProjectMetadataType
  code: string
}
