'use client'

import useNavStateStore from '@/store/nav-state'

const SkipTo = () => {
  const { open: openNav } = useNavStateStore()

  return (
    <div className="skip-to" id="skip-to">
      <a href="#content">Skip to Content</a>
      <a href="#nav" onClick={openNav}>
        Skip to Navigation
      </a>
    </div>
  )
}

export default SkipTo
