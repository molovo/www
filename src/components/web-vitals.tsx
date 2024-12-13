'use client'

import { Metric } from 'web-vitals'
import { useReportWebVitals } from 'next/web-vitals'
import { v4 as uuidv4 } from 'uuid'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useEventListener } from '@superrb/react-addons/hooks'

const queue = new Map<string, Metric>()

const flushQueue = () => {
  if (queue.size === 0) {
    return
  }

  return new Promise<void>((resolve) => {
    navigator.sendBeacon(
      'https://talon.molovo.co/api/measure/deb3c781-f593-4caa-9149-f2eb9c73cdf0',
      JSON.stringify([...queue.values()]),
    )

    queue.clear()

    resolve()
  })
}

const WebVitals = () => {
  const [id, setId] = useState<string>(uuidv4())
  const pathname = usePathname()

  useReportWebVitals((metric) => {
    queue.set(metric.name, {
      ...metric,
      id,
      url: pathname,
      domain: window.location.hostname,
    })
  })

  useEffect(() => {
    setId(uuidv4())
  }, [pathname])

  useEventListener(
    'visibilitychange',
    () => {
      if (document.visibilityState === 'hidden') {
        flushQueue()
      }
    },
    undefined,
    typeof document !== 'undefined' ? document : undefined,
  )

  return null
}

export default WebVitals
