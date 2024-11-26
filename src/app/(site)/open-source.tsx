'use client'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { ocean } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import useHeaderStyle from '@/hooks/use-header-style'
import HomepageSection, { HomepageSectionLink } from './homepage-section'
import ProjectType from '@/types/project'
import JS from '@/components/images/icons/languages/js.svg'
import { ReactNode } from 'react'
import PHP from '@/components/images/icons/languages/php.svg'
import ZSH from '@/components/images/icons/languages/zsh.svg'
import TS from '@/components/images/icons/languages/ts.svg'
import Link from '@/components/link'
import Schema from '@/components/schema'
import { SoftwareSourceCode } from 'schema-dts'

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
  const setRef = useHeaderStyle('white')

  return (
    <HomepageSection
      title={title}
      titleSwashCharacter="N"
      subtitle={subtitle}
      link={link}
      className="open-source"
      ref={setRef}
    >
      <div className="open-source__projects">
        {projects.map(
          ({
            code,
            metadata: { slug, url, repo, title, description, language },
          }) => {
            const jsonLd: SoftwareSourceCode = {
              '@type': 'SoftwareSourceCode',
              name: title,
              description,
              url,
              codeRepository: repo,
              programmingLanguage: language,
            }

            return (
              <div className="open-source__project" key={slug}>
                <div className="open-source__logo">{logoMap[language]}</div>

                <pre className="open-source__project-intro">
                  {`/**
 * `}
                  <Link href={url}>{title}</Link>
                  {`
 *
 * ${description.replace('\n', '\n * ')}
 */`}
                </pre>
                <SyntaxHighlighter language={syntaxMap[language]} style={ocean}>
                  {code}
                </SyntaxHighlighter>

                <Schema content={jsonLd} />
              </div>
            )
          },
        )}
      </div>
    </HomepageSection>
  )
}

export default OpenSource
