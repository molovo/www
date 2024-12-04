import { getPost } from '@/data/posts'
import { getStudy } from '@/data/studies'
import useThemeStore, { HeaderStyle as Style, Color } from '@/store/theme'
import { useEventListener } from '@superrb/react-addons/hooks'
import { MutableRefObject, useEffect, useRef } from 'react'

const useHeaderStyle = (style?: Style, color?: Color) => {
  const ref =
    useRef<HTMLElement | null>() as MutableRefObject<HTMLElement | null>
  const setHeaderStyle = useThemeStore((state) => state.setHeaderStyle)
  const setHeaderColor = useThemeStore((state) => state.setHeaderColor)

  const setRef = (node: HTMLElement | null) => {
    ref.current = node
  }

  const handler = () => {
    if (ref.current) {
      const { top, height } = ref.current?.getBoundingClientRect()

      if (top < 75 && top + height > 0) {
        setHeaderStyle(style)
        setHeaderColor(color)
      }
    }
  }

  useEffect(() => {
    handler()
  })

  useEventListener('scroll', handler, { passive: true })

  return setRef
}

export default useHeaderStyle
