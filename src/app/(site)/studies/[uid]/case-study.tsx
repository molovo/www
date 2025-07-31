'use client'

import useClientStore from '@/store/client'
import CaseStudyType from '@/types/case-study'
import { CSSProperties, useEffect } from 'react'
import CaseStudySection from './case-study-section'
import Link from '@/components/link'
import Logo from '@/components/logo'
import CaseStudyKnowledge from '@/components/case-study-knowledge'
import Button from '@/components/Button'
import LineBreak from '@/components/line-break'

const CaseStudy = ({ study }: { study: CaseStudyType }) => {
  const setClient = useClientStore((state) => state.setClient)

  useEffect(() => {
    setClient(study.slug)

    return () => {
      setClient(undefined)
    }
  }, [study, setClient])

  return (
    <article className={`case-study case-study--${study.slug}`}>
      {study.sections.map((section, index) => (
        <CaseStudySection
          index={index}
          key={section.slug}
          section={section}
          content={section.content}
          study={study}
        />
      ))}

      {study.knowledge && (
        <CaseStudyKnowledge
          items={study.knowledge}
          backgroundImage={study.knowledgeBackgroundImage}
          styles={study.styles?.knowledge}
          headerStyle={study.knowledgeHeaderStyle}
          headerColor={study.knowledgeHeaderColor}
        />
      )}

      {study.url && (
        <div
          className="case-study__footer"
          style={
            {
              ...study.styles?.knowledge?.main,
              '--background': study.styles?.knowledge?.main?.backgroundColor,
            } as CSSProperties
          }
        >
          <LineBreak />

          <div className="case-study__footer-inner">
            <h2 className="case-study__footer-title">Thanks for reading</h2>
            <p className="case-study__footer-text">
              {study.offline
                ? `
                Unfortunately, the ${study.client} website is now offline, but you can use the link below to view it in the Wayback Machine. Please be aware that some links may be broken.
              `
                : `
                Please visit ${study.client} to see the full website in action.
              `}
            </p>
            <Button
              href={study.url}
              className="case-study__footer-link"
              style={study.styles?.visitButton}
            >
              {study.offline ? 'View' : 'Visit'} {study.client}{' '}
              {study.offline ? 'on Wayback Machine' : 'website'}
            </Button>
          </div>

          {study.next && (
            <div className="case-study__navigation">
              <Link
                href={study.next.url}
                className="case-study__navigation-link case-study__navigation-link--next"
              >
                <Logo client={study.next.slug} asLink={false} />
                <span className="case-study__navigation-link-label">
                  Next case study →
                </span>
              </Link>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

export default CaseStudy
