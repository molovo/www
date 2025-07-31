'use client'

import HomepageSection, {
  HomepageSectionLink,
} from '@/components/homepage/Section'
import ProjectType from '@/types/project'
import CustomScrollbar from '@/components/custom-scrollbar'
import { ReactNode, useRef } from 'react'
import useHeaderStyle from '@/hooks/use-header-style'
import { gtAmericaMono } from '@/fonts/homepage'
import Button from '@/components/Button'
import Github from '@icons/social/github.svg'

import styles from './open-source.module.sass'

const OpenSourceInner = ({
  title,
  subtitle,
  link,
  projects = [],
}: {
  title: string
  subtitle: string
  link?: HomepageSectionLink
  projects: (ProjectType & {
    output: ReactNode
  })[]
}) => {
  const setRef = useHeaderStyle('white')
  const projectsContainer = useRef<HTMLDivElement>(null)
  return (
    <HomepageSection
      title={title}
      titleSwashCharacter="N"
      subtitle={subtitle}
      className={styles.openSource}
      ref={setRef}
    >
      <div
        className={`${styles.openSource__projects} ${gtAmericaMono.className}`}
        ref={projectsContainer}
        id="projects-list"
      >
        {projects.map((project) => project.output)}
      </div>

      <div className={styles.openSource__footer}>
        <Button icon={<Github />} href={link?.url}>
          {link?.label}
        </Button>

        <CustomScrollbar
          controls={projectsContainer}
          className={styles.openSource__scrollbar}
        />
      </div>
    </HomepageSection>
  )
}

export default OpenSourceInner
