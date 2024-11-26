'use client'

import useClientStore from '@/store/client'
import CaseStudyType from '@/types/case-study'
import { useEffect } from 'react'
import CaseStudySection from './case-study-section'
import Link from '@/components/link'

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

      {study.url && (
        <div className="case-study__visit">
        <Link href={study.url} className="case-study__visit-link">
          Visit {study.client}
        </Link>
        </div>
      )}
    </article>
  )
}

export default CaseStudy
