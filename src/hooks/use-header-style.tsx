import useThemeStore, { HeaderStyle as Style, Color } from '@/store/theme'
import { useEventListener } from '@superrb/react-addons/hooks'
import { useCallback, useEffect, useState } from 'react'

const useHeaderStyle = (style: Style, color: Color) => {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const setHeaderStyle = useThemeStore((state) => state.setHeaderStyle)
  const setHeaderColor = useThemeStore((state) => state.setHeaderColor)

  const handleScroll = useCallback(() => {
    if (ref) {
      const { top, height } = ref.getBoundingClientRect()

      if (top < 50 && top + height > 0) {
        setHeaderStyle(style)
        setHeaderColor(color)
      }
    }
  }, [ref, style, color, setHeaderStyle, setHeaderColor])

  useEffect(() => {
    handleScroll()
  }, [handleScroll])

  useEventListener('scroll', handleScroll, { passive: true })

  return setRef
}

export default useHeaderStyle
