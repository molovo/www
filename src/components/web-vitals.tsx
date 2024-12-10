'use client'

import { useEventListener } from '@superrb/react-addons/hooks'
import { Metric } from 'web-vitals'
import { useReportWebVitals } from 'next/web-vitals'
import { v4 as uuidv4 } from 'uuid'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const queue: Set<Metric> = new Set()

const flushQueue = () => {
  if (queue.size === 0) {
    return
  }

  const uuid = uuidv4()

  navigator.sendBeacon(
    'https://talon.molovo.co/api/measure/deb3c781-f593-4caa-9149-f2eb9c73cdf0',
    JSON.stringify([...queue].map((metric) => ({ ...metric, id: uuid }))),
  )

  queue.clear()
}

const WebVitals = () => {
  const pathname = usePathname()

  useReportWebVitals((metric) => {
    queue.add({ ...metric, url: window.location.href })
  })

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
