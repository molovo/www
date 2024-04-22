'use client'

import Logo from './logo'
import MenuToggle from './menu-toggle'
import useNavStateStore from '@/store/nav-state'
import { useHideOnScroll } from '@superrb/react-addons/hooks'
import useThemeStore from '@/store/theme'

const Header = () => {
  const { headerStyle, headerColor } = useThemeStore()
  const { isOpen } = useNavStateStore()
  const hidden = useHideOnScroll()

  return (
    <header
      className={`header header--${isOpen ? 'white' : headerStyle || 'black'}`}
      {...(headerColor && !isOpen && { style: { color: headerColor } })}
      aria-hidden={!isOpen && hidden}
    >
      <Logo asLink={true} />

      <MenuToggle />
    </header>
  )
}

export default Header
