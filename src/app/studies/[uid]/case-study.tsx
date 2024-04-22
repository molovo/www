'use client'

import useClientStore from '@/store/client'
import CaseStudyType from '@/types/case-study'
import { useEffect } from 'react'
import CaseStudySection from './case-study-section'

const CaseStudy = ({
  study,
  sections,
}: {
  study: CaseStudyType
  sections: any[]
}) => {
  const setClient = useClientStore((state) => state.setClient)

  useEffect(() => {
    setClient(study.slug)

    return () => {
      setClient(undefined)
    }
  }, [study, setClient])

  return (
    <main className={`case-study case-study--${study.slug}`}>
      {sections.map((section, index) => (
        <CaseStudySection
          index={index}
          key={section.slug}
          section={section.metadata}
          content={section.content}
          study={study}
        />
      ))}
    </main>
  )
}

export default CaseStudy
