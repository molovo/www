'use client'

import Logo from './logo'
import MenuToggle from './menu-toggle'
import useNavStateStore from '@/store/nav-state'
import useThemeStore from '@/store/theme'
import useLoadingStore from '@/store/loading'
import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const Header = () => {
  const { headerStyle, headerColor } = useThemeStore((state) => ({
    headerStyle: state.headerStyle,
    headerColor: state.headerColor,
  }))
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

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname, handleScroll])

  return (
    <header
      className={`header header--${isOpen ? 'white' : headerStyle} ${
        !isOpen && !loading && hidden ? 'header--hidden' : ''
      }`}
      {...(headerColor && !isOpen && { style: { color: headerColor } })}
    >
      <Logo asLink={true} />

      <MenuToggle />
    </header>
  )
}

export default Header
