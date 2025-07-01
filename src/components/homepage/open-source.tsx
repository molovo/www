import { SoftwareSourceCode } from 'schema-dts'

import { HomepageSectionLink } from '@/components/homepage/section'
import ProjectType from '@/types/project'
import Link from '@/components/link'
import Schema from '@/components/schema'

import JS from '@icons/languages/js.svg'
import PHP from '@icons/languages/php.svg'
import ZSH from '@icons/languages/zsh.svg'
import TS from '@icons/languages/ts.svg'
import LinkIcon from '../images/icons/link'
import CodeBlock from '../code-block'
import { ReactNode } from 'react'
import OpenSourceInner from './open-source-inner'

const logoMap: { [key: string]: ReactNode } = {
  ZSH: <ZSH />,
  Javascript: <JS />,
  PHP: <PHP />,
  Typescript: <TS />,
}

const syntaxMap: { [key: string]: string } = {
  ZSH: 'bash',
  Javascript: 'javascript',
  PHP: 'php',
  Typescript: 'typescript',
}

const OpenSource = ({
  title,
  subtitle,
  link,
  projects = [],
}: {
  title: string
  subtitle: string
  link?: HomepageSectionLink
  projects: ProjectType[]
}) => {
  const consolidatedJsonLd = {
    '@graph': projects.map(({ jsonLd }) => jsonLd),
  }

  const formattedProjects = projects.map((project, i) => ({
    ...project,
    output: (() => {
      return (
        <div className="open-source__project" key={i}>
          <div className="open-source__logo">
            {logoMap[project.metadata.language]}
          </div>

          <pre className="open-source__project-intro">
            {`/**
 * `}
            <Link href={project.metadata.url}>
              {project.metadata.title}
              <LinkIcon />
            </Link>
            {`
 *
 * ${project.metadata.description.replace('\n', '\n * ')}
 */`}
          </pre>

          <CodeBlock lang={syntaxMap[project.metadata.language]}>
            {project.code}
          </CodeBlock>
        </div>
      )
    })() as ReactNode,
  }))

  return (
    <>
      <OpenSourceInner
        title={title}
        subtitle={subtitle}
        link={link}
        projects={formattedProjects}
      />
      <Schema content={consolidatedJsonLd} />
    </>
  )
}

export default OpenSource
