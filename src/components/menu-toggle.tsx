'use client'

import useNavStateStore from '@/store/nav-state'

const MenuToggle = () => {
  const { isOpen, toggle } = useNavStateStore()

  return (
    <button
      className="menu-toggle"
      onClick={toggle}
      aria-expanded={isOpen}
      aria-controls="menu"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <span className="menu-toggle__line">-</span>
      <span className="screenreader-text">
        {isOpen ? 'Close menu' : 'Open menu'}
      </span>
    </button>
  )
}

export default MenuToggle
