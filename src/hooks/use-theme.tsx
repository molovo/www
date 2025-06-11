import useThemeStore, { Color } from '@/store/theme'
import { useEventListener } from '@superrb/react-addons/hooks'
import { useCallback, useEffect, useState } from 'react'

const useTheme = (
  color?: Color,
  background?: Color,
  accentColor?: Color,
  accentColorTwo?: Color,
) => {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const setColor = useThemeStore((state) => state.setColor)
  const setBackgroundColor = useThemeStore((state) => state.setBackgroundColor)
  const setAccentColor = useThemeStore((state) => state.setAccentColor)
  const setAccentColorTwo = useThemeStore((state) => state.setAccentColorTwo)

  const handleScroll = useCallback(() => {
    if (ref) {
      const { top, height } = ref.getBoundingClientRect()

      if (top < window.innerHeight / 2 && top + height > 0) {
        setColor(color)
        setBackgroundColor(background)
        setAccentColor(accentColor)
        setAccentColorTwo(accentColorTwo)
      }
    }
  }, [
    ref,
    color,
    background,
    accentColor,
    accentColorTwo,
    setColor,
    setBackgroundColor,
    setAccentColor,
    setAccentColorTwo,
  ])

  useEffect(() => {
    handleScroll()
  }, [handleScroll])

  useEventListener('scroll', handleScroll, { passive: false })

  return setRef
}

export default useTheme
