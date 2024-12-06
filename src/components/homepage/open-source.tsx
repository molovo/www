'use client'
import {
  CSSProperties,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { SoftwareSourceCode } from 'schema-dts'

import HomepageSection, {
  HomepageSectionLink,
} from '@/components/homepage/section'
import ProjectType from '@/types/project'
import Link from '@/components/link'
import Schema from '@/components/schema'

import useHeaderStyle from '@/hooks/use-header-style'

import JS from '@icons/languages/js.svg'
import PHP from '@icons/languages/php.svg'
import ZSH from '@icons/languages/zsh.svg'
import TS from '@icons/languages/ts.svg'

import ocean from 'react-syntax-highlighter/dist/esm/styles/hljs/ocean'

import dynamic from 'next/dynamic'
import CustomScrollbar from '../custom-scrollbar'
import LinkIcon from '../images/icons/link'

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

const dots = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

const LoadingSpinner = () => {
  const [index, setIndex] = useState<number>(0)
  const interval = useRef<NodeJS.Timeout>()

  const tick = () => {
    setIndex((index) => {
      const newIndex = index + 1

      if (newIndex >= dots.length) {
        return 0
      }

      return newIndex
    })
  }

  useEffect(() => {
    interval.current = setInterval(tick, 80)

    return () => clearInterval(interval.current)
  })

  return (
    <div className="loading-spinner">
      <span>{dots[index]}</span>
    </div>
  )
}

const SyntaxHighlighter = dynamic(
  async () => {
    const { Light } = await import('react-syntax-highlighter')
    const { default: bash } = await import(
      'react-syntax-highlighter/dist/esm/languages/hljs/bash'
    )
    const { default: javascript } = await import(
      'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
    )
    const { default: php } = await import(
      'react-syntax-highlighter/dist/esm/languages/hljs/php'
    )
    const { default: typescript } = await import(
      'react-syntax-highlighter/dist/esm/languages/hljs/typescript'
    )

    Light.registerLanguage('bash', bash)
    Light.registerLanguage('javascript', javascript)
    Light.registerLanguage('php', php)
    Light.registerLanguage('typescript', typescript)

    return Light
  },
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
)

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
  const projectsContainer =
    useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    ;(async () => {
      const { gtAmericaMono } = await import('@/fonts/homepage')
      projectsContainer.current.classList.add(gtAmericaMono.variable)
    })()
  })

  return (
    <HomepageSection
      title={title}
      titleSwashCharacter="N"
      subtitle={subtitle}
      className="open-source"
      ref={setRef}
    >
      <div
        className="open-source__projects"
        ref={projectsContainer}
        id="projects-list"
      >
        {projects.map(
          ({
            code,
            slug,
            metadata: { url, repo, title, description, language },
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
                  <Link href={url}>
                    {title}
                    <LinkIcon />
                  </Link>
                  {`
 *
 * ${description.replace('\n', '\n * ')}
 */`}
                </pre>
                <SyntaxHighlighter
                  language={syntaxMap[language]}
                  style={ocean}
                >
                  {code}
                </SyntaxHighlighter>

                <Schema content={jsonLd} />
              </div>
            )
          },
        )}
      </div>

      <div className="open-source__footer">
        <Link className="button" href={link?.url}>
          {link?.label}
        </Link>

        <CustomScrollbar
          controls={projectsContainer}
          className="open-source__scrollbar"
        />
      </div>
    </HomepageSection>
  )
}

export default OpenSource
