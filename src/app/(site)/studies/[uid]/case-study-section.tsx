'use client'

import Image from 'next/image'
import { ReactNode, useEffect } from 'react'
import CaseStudyType, { CaseStudySectionType } from '@/types/case-study'
import Logo from '@/components/logo'
import useHeaderStyle from '@/hooks/use-header-style'
import swash from '@/utils/swash'
import SuperrbLink from '@/components/superrb-link'
import useTheme from '@/hooks/use-theme'

const CaseStudySection = ({
  index,
  section,
  content,
  study,
}: {
  index: number
  section: CaseStudySectionType
  content: ReactNode
  study: CaseStudyType
}) => {
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
              background: `linear-gradient(to bottom, transparent 0%, transparent 25%, ${section.styles?.main?.backgroundColor} 100%)`,
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

        <div
          className="case-study__section-content"
          style={section.styles?.content}
        >
          <div className="case-study__section-content-inner content">
            {study.superrb && index === 0 && (
              <span className="case-study__section-superrb">
                Made with the team at <SuperrbLink />
              </span>
            )}

            {content}
          </div>
        </div>
      </section>
    </>
  )
}

export default CaseStudySection
