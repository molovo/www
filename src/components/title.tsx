'use client'

import { useEventListener } from '@superrb/react-addons/hooks'
import { useEffect } from 'react'
import { useState } from 'reinspect'

const siteTitle = ' | molovo. Design, Development, Branding'

const Title = () => {
  const [originalTitle, setOriginalTitle] = useState<string>(
    '',
    'Document title',
  )
  useEffect(() => {
    if (typeof document !== undefined) {
      setOriginalTitle(document.title)
    }
  }, [])

  useEventListener(
    'visibilitychange',
    () => {
      document.title = document.hidden
        ? `I miss you ❤️${siteTitle}`
        : `${originalTitle}${siteTitle}`
    },
    undefined,
    typeof document !== 'undefined' ? document : undefined,
  )

  return null
}

export default Title
