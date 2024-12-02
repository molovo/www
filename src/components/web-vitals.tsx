'use client'

import useUmami from '@/hooks/use-umami'
import { useReportWebVitals } from 'next/web-vitals'

const WebVitals = () => {
  const umami = useUmami()
  useReportWebVitals((metric) => {
    console.log(metric)
    umami.track(`Web Vitals: ${metric.name}`, {
      value: metric.value,
    })
  })

  return null
}

export default WebVitals


