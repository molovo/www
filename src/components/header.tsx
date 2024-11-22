'use client'

import Logo from './logo'
import MenuToggle from './menu-toggle'
import useNavStateStore from '@/store/nav-state'
import { useHideOnScroll } from '@superrb/react-addons/hooks'
import useThemeStore from '@/store/theme'
import useLoadingStore from '@/store/loading'

const Header = () => {
  const { headerStyle, headerColor } = useThemeStore((state) => ({
    headerStyle: state.headerStyle,
    headerColor: state.headerColor,
  }))
  const isOpen = useNavStateStore((state) => state.isOpen)
  const hidden = useHideOnScroll()
  const loading = useLoadingStore((state) => state.loading)

  return (
    <header
      className={`header header--${isOpen ? 'white' : headerStyle || 'black'} ${
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
