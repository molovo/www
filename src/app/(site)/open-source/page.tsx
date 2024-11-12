'use client'

import useHeaderStyle from '@/hooks/use-header-style'

export default function Page() {
  const setRef = useHeaderStyle('red')

  return (
    <main className="projects" ref={setRef}>
      <h1>Open source</h1>
    </main>
  )
}
