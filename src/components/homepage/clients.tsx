'use client'

import useHeaderStyle from '@/hooks/use-header-style'
import HomepageSection from './section'

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
