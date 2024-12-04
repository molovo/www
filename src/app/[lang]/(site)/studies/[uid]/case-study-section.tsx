'use client'

import Image from 'next/image'
import { PropsWithChildren, ReactNode } from 'react'
import CaseStudyType, { CaseStudySectionType } from '@/types/case-study'
import Logo from '@/components/logo'
import useHeaderStyle from '@/hooks/use-header-style'
import swash from '@/utils/swash'
import useTheme from '@/hooks/use-theme'
import CaseStudyHelp from '@/components/case-study-help'
import dynamic from 'next/dynamic'

const SocialSharing = dynamic(() => import('@/components/social-sharing'), {
  ssr: false,
})

const CaseStudySection = ({
  index,
  section,
  content,
  study,
  children,
}: PropsWithChildren<{
  index: number
  section: CaseStudySectionType
  content: ReactNode
  study: CaseStudyType
}>) => {
  const setHeaderStyleRef = useHeaderStyle(
    section.headerStyle,
    section.headerColor,
  )
  const setThemeRef = useTheme(
    section.color,
    section.backgroundColor,
    section.accentColor,
    section.accentColorTwo,
  )

  return (
    <>
      {(section.accentColor || section.accentColorTwo) && (
        <style>{`
          .case-study__section--${section.slug} {
            --color: ${section.styles?.main?.color};
            --background: ${section.styles?.main?.backgroundColor};
            --accent-color: ${section.accentColor};
            --accent-color-two: ${section.accentColorTwo};
          }
        `}</style>
      )}

      <section
        id={section.slug}
        className={`case-study__section case-study__section--${section.slug}`}
        style={section.styles?.main}
        ref={(ref) => {
          setHeaderStyleRef(ref)
          setThemeRef(ref)
        }}
      >
        <div className="case-study__section-header">
          {section.backgroundImage && (
            <Image
              src={section.backgroundImage}
              alt=""
              className="case-study__section-background"
              style={section.styles?.image}
              sizes="100vw"
            />
          )}

          <div
            className="case-study__section-header-content"
            style={{
              ...section.styles?.main,
              background: section.hideGradient
                ? 'none'
                : `linear-gradient(to bottom, transparent 0%, transparent 25%, ${section.styles?.main?.backgroundColor} 100%)`,
            }}
          >
            <Logo client={study.slug} />
            {section.intro && (
              <h1 className="case-study__section-intro">{section.intro}</h1>
            )}
            {/* <span className="case-study__section-name">{section.name}</span> */}
            <h2
              className="case-study__section-title"
              style={section.styles?.title}
              dangerouslySetInnerHTML={{
                __html: swash(
                  section.title,
                  section.titleSwashCharacter,
                  section.styles?.titleSwash,
                ),
              }}
            />
          </div>
        </div>

        {content && (
          <div
            className="case-study__section-content"
            style={section.styles?.content}
          >
            <SocialSharing
              style={section.styles?.social}
              title={`${study.title.replace('_', '')}: Making ${study.client}`}
            />

            <div className="case-study__section-content-inner content">
              {study.help && index === 0 && (
                <CaseStudyHelp helpers={study.help} />
              )}

              {content}
            </div>
          </div>
        )}

        {children}
      </section>
    </>
  )
}

export default CaseStudySection
