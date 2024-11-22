'use client'

import useNavStateStore from '@/store/nav-state'

const MenuToggle = () => {
  const { isOpen, toggle, close } = useNavStateStore()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      return close()
    }
  }

  return (
    <button
      className="menu-toggle"
      onClick={toggle}
      onKeyDown={handleKeyDown}
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
