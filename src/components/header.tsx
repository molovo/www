'use client'

import Logo from './logo'
import MenuToggle from './menu-toggle'
import useNavStateStore from '@/store/nav-state'
import useThemeStore, { Color, HeaderStyle } from '@/store/theme'
import useLoadingStore from '@/store/loading'
import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ClientSlug } from './client-logo'

const Header = ({
  defaultStyle,
  defaultColor,
  defaultClient,
}: {
  defaultStyle?: HeaderStyle
  defaultColor?: Color
  defaultClient?: ClientSlug
}) => {
  const { headerStyle, headerColor } = useThemeStore((state) => ({
    headerStyle: state.headerStyle,
    headerColor: state.headerColor,
  }))
  const [storedDefaultStyle, setStoredDefaultStyle] = useState<
    HeaderStyle | undefined
  >(defaultStyle)
  const [storedDefaultColor, setStoredDefaultColor] = useState<
    Color | undefined
  >(defaultColor)
  const [storedDefaultClient, setStoredDefaultClient] = useState<
    ClientSlug | undefined
  >(defaultClient)
  const isOpen = useNavStateStore((state) => state.isOpen)
  const loading = useLoadingStore((state) => state.loading)

  const [hidden, setHidden] = useState<boolean>(false)

  const pathname = usePathname()

  const handleScroll = useCallback(() => {
    const previousY = window.scrollY

    setTimeout(() => {
      const y = window.scrollY

      if (y <= 50) {
        setHidden(false)
        return
      }

      if (y > previousY + 10) {
        setHidden(true)
      }

      if (y < previousY - 10) {
        setHidden(false)
      }
    }, 100)
  }, [setHidden])

  useEffect(() => {
    handleScroll()
    setStoredDefaultStyle(() => undefined)
    setStoredDefaultColor(() => undefined)
    setStoredDefaultClient(() => undefined)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname, handleScroll])

  return (
    <header
      className={`header ${
        storedDefaultStyle ? `header--${storedDefaultStyle}` : ``
      } header--${isOpen ? 'white' : headerStyle} ${
        !isOpen && !loading && hidden ? 'header--hidden' : ''
      }`}
      {...((headerColor || storedDefaultColor) &&
        !isOpen && { style: { color: headerColor || storedDefaultColor } })}
    >
      <Logo asLink={true} client={storedDefaultClient} />

      <MenuToggle />
    </header>
  )
}

export default Header
