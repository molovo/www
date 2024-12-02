'use client'

import Logo from './logo'
import MenuToggle from './menu-toggle'
import useNavStateStore from '@/store/nav-state'
import { useHideOnScroll } from '@superrb/react-addons/hooks'
import useThemeStore from '@/store/theme'
import useLoadingStore from '@/store/loading'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const Header = () => {
  const { headerStyle, headerColor } = useThemeStore((state) => ({
    headerStyle: state.headerStyle,
    headerColor: state.headerColor,
  }))
  const isOpen = useNavStateStore((state) => state.isOpen)
  const loading = useLoadingStore((state) => state.loading)

  const [hidden, setHidden] = useState<boolean>(false)
  const hideOnScroll = useHideOnScroll()

  const pathname = usePathname()

  useEffect(() => {
    setHidden(hideOnScroll)
  }, [hideOnScroll])

  useEffect(() => {
    setHidden(false)
  }, [pathname])

  return (
    <header
      className={`header header--${isOpen ? 'white' : headerStyle || 'white'} ${
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
