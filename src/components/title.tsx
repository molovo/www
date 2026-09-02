'use client'

import { useEventListener } from '@superrb/react-addons/hooks'
import { useEffect } from 'react'
import useDocumentRef from '@/hooks/use-document-ref'
import { useState } from 'reinspect'

const Title = () => {
  const documentRef = useDocumentRef()
  const [originalTitle, setOriginalTitle] = useState<string>(
    '',
    'Document title',
  )
  useEffect(() => {
    if (typeof document !== 'undefined') {
      setOriginalTitle(document.title)
    }
  }, [])

  useEventListener(
    'visibilitychange',
    () => {
      document.title = document.hidden ? `I miss you ❤️` : `${originalTitle}`
    },
    undefined,
    documentRef,
  )

  return null
}

export default Title
