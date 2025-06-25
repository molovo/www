'use client'

import HomepageSection, {
  HomepageSectionLink,
} from '@/components/homepage/section'
import ProjectType from '@/types/project'
import CustomScrollbar from '@/components/custom-scrollbar'
import { ReactNode, useRef } from 'react'
import useHeaderStyle from '@/hooks/use-header-style'
import { gtAmericaMono } from '@/fonts/homepage'
import Button from '../button'
import Github from '../images/icons/social/github.svg'

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
  const projectsContainer =
    useRef<HTMLDivElement>(null)
  return (
    <HomepageSection
      title={title}
      titleSwashCharacter="N"
      subtitle={subtitle}
      className="open-source"
      ref={setRef}
    >
      <div
        className={`open-source__projects ${gtAmericaMono.className}`}
        ref={projectsContainer}
        id="projects-list"
      >
        {projects.map((project) => project.output)}
      </div>

      <div className="open-source__footer">
        <Button icon={<Github />} href={link?.url}>
          {link?.label}
        </Button>

        <CustomScrollbar
          controls={projectsContainer}
          className="open-source__scrollbar"
        />
      </div>
    </HomepageSection>
  )
}

export default OpenSourceInner
