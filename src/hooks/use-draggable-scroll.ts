import { useEventListener } from '@superrb/react-addons/hooks'
import { MutableRefObject, useState } from 'react'

type PositionData = {
  x: number
  y: number
  scrollLeft: number
  scrollTop: number
}

export default function useDraggableScroll(ref: MutableRefObject<HTMLElement>) {
  const [startPosition, setStartPosition] = useState<PositionData | undefined>(
    undefined,
  )

  const handleMouseDown = (event: MouseEvent) => {
    setStartPosition({
      x: event.clientX,
      y: event.clientY,
      scrollLeft: ref.current.scrollLeft,
      scrollTop: ref.current.scrollTop,
    })

    ref.current.style.scrollBehavior = 'auto'
    ref.current.style.scrollSnapType = 'none'
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!startPosition) {
      return
    }

    const dx = event.clientX - startPosition.x
    const dy = event.clientY - startPosition.y

    ref.current.scrollLeft = startPosition.scrollLeft - dx
    ref.current.scrollTop = startPosition.scrollTop - dy

    // Prevent text selection while dragging
    event.preventDefault()
  }

  const handleMouseUp = (event: MouseEvent) => {
    if (!startPosition) {
      return
    }

    setStartPosition(undefined)

    // Restore scroll behavior and snap type after dragging
    ref.current.style.scrollBehavior = ''
    ref.current.style.scrollSnapType = ''
  }

  useEventListener(
    'mousedown',
    handleMouseDown,
    undefined,
    ref?.current,
    !!ref?.current,
  )
  useEventListener(
    'mousemove',
    handleMouseMove,
    undefined,
    document,
    !!ref?.current,
  )
  useEventListener(
    'mouseup',
    handleMouseUp,
    undefined,
    document,
    !!ref?.current,
  )
}
