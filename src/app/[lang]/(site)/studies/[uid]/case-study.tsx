'use client'

import useClientStore from '@/store/client'
import CaseStudyType from '@/types/case-study'
import { useEffect } from 'react'
import CaseStudySection from './case-study-section'
import Link from '@/components/link'
import Logo from '@/components/logo'
import CaseStudyKnowledge from '@/components/case-study-knowledge'
import Button from '@/components/button'

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
          className="case-study__visit"
          style={{
            ...study.styles?.knowledge?.main,
          }}
        >
          <div className="case-study__visit-inner" style={study.styles?.visit}>
            <div className="case-study__visit-content">
              <h2 className="case-study__visit-title">Thanks for reading</h2>
              <p className="case-study__visit-text">
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
                className="case-study__visit-link"
                style={study.styles?.visitButton}
              >
                {study.offline ? 'View' : 'Visit'} {study.client}{' '}
                {study.offline ? 'on Wayback Machine' : 'website'}
              </Button>
            </div>

            {study.next && (
              <a href={study.next.url} className="case-study__visit-next">
                <Logo client={study.next.slug} asLink={false} />
                View next case study
              </a>
            )}
          </div>
        </div>
      )}
    </article>
  )
}

export default CaseStudy
