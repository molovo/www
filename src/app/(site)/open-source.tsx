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

const logoMap: { [key: string]: ReactNode } = {
  bash: <ZSH />,
  javascript: <JS />,
  php: <PHP />,
  typescript: <TS />,
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
          ({ code, metadata: { slug, url, title, description, language } }) => (
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
              <SyntaxHighlighter language={language} style={ocean}>
                {code}
              </SyntaxHighlighter>
            </div>
          ),
        )}
      </div>
    </HomepageSection>
  )
}

export default OpenSource
