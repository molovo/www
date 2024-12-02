'use client'

import { useEffect, useRef } from 'react'

interface Umami {
  track: (event: string, value: any) => void
}

interface WindowWithUmami extends Window {
  umami?: Umami
}

const useUmami = () => {
  const queue = useRef<Array<{ event: string; value: { [key: string]: any } }>>(
    [],
  )
  const umami = useRef<Umami>({
    track: (event: string, value: { [key: string]: any }) => {
      queue.current.push({ event, value })
    },
  })

  const globalUmami =
    typeof window !== 'undefined'
      ? (window as WindowWithUmami).umami
      : undefined

  useEffect(() => {
    if ('umami' in window) {
      umami.current = (window as WindowWithUmami).umami as Umami

      queue.current.forEach(({ event, value }) => {
        umami.current?.track(event, value)
      })
    }
  }, [globalUmami])

  return umami.current
}

export default useUmami
