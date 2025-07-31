'use client'

import useHeaderStyle from '@/hooks/use-header-style'
import HomepageSection from '@/components/homepage/Section'

const Clients = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const setRef = useHeaderStyle('red')

  return (
    <HomepageSection
      title={title}
      subtitle={subtitle}
      className="clients"
      ref={setRef}
    >
      <h1>Tada!</h1>
    </HomepageSection>
  )
}

export default Clients
