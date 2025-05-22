'use client'

import useNavStateStore from '@/store/nav-state'

const SkipTo = () => {
  const { open: openNav } = useNavStateStore()

  return (
    <nav className="skip-to" id="skip-to">
      <a href="#content">Skip to Content</a>
      <a href="#nav" onClick={openNav}>
        Skip to Navigation
      </a>
    </nav>
  )
}

export default SkipTo
