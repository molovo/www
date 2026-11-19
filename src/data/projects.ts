import ProjectType from '@/types/project'
import { getContentIndex, pick } from './content'

export const getProjects = async (slugs?: string[]): Promise<ProjectType[]> =>
  pick((await getContentIndex()).projects, slugs)
