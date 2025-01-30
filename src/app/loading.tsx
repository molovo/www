'use client'

import { useEffect, useRef, useState } from 'react'

const dots = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

export default function Loading() {
  const [index, setIndex] = useState<number>(0)
  const interval = useRef<NodeJS.Timeout>()

  const tick = () => {
    setIndex((index) => {
      const newIndex = index + 1

      if (newIndex >= dots.length) {
        return 0
      }

      return newIndex
    })
  }

  useEffect(() => {
    interval.current = setInterval(tick, 80)

    return () => clearInterval(interval.current)
  })

  return (
    <div className="loading-spinner">
      <span>{dots[index]}</span>
    </div>
  )
}
