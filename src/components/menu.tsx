'use client'

import Link from 'next/link'
import { useState } from 'reinspect'
import dynamic from 'next/dynamic'
import useNavStateStore from '@/store/nav-state'
import { useEffect } from 'react'
import { useLockBodyScroll } from '@superrb/react-addons/hooks'
import { usePathname } from 'next/navigation'

const MenuCaseStudies = dynamic(
  () => import('@/components/menu-case-studies'),
  {
    ssr: true,
    loading: () => <p>Loading</p>,
  },
)

const navigationItems = {
  '/writing': 'Writing',
  '/open-source': 'Open source',
  'https://twitter.com/molovo': 'Follow me',
}

const secondaryNavigationItems = {
  '/resume': 'CV/Resume',
  '/contact': 'Contact',
}

const Menu = () => {
  const { isOpen, close } = useNavStateStore()
  const [caseStudiesVisible, setCaseStudiesVisible] = useState(
    false,
    'Case studies visible',
  )

  const location = usePathname()
  useEffect(() => {
    setTimeout(() => {
      close()
    }, 150)
  }, [location, close])

  useEffect(() => {
    setTimeout(() => {
      setCaseStudiesVisible(false)
    }, 500)
  }, [isOpen, setCaseStudiesVisible])

  useLockBodyScroll(isOpen)

  return (
    <nav className="menu" id="menu" aria-hidden={!isOpen}>
      <div className="menu__main" aria-hidden={caseStudiesVisible}>
        <ul className="menu__items">
          {Object.entries(navigationItems).map(([path, label]) => (
            <li className="menu__item menu__item" key={path}>
              <Link
                className="menu__link"
                href={path}
                target={path.startsWith('/') ? undefined : '_blank'}
                rel={path.startsWith('/') ? undefined : 'noopener'}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="menu__secondary">
          {Object.entries(secondaryNavigationItems).map(([path, label]) => (
            <li className="menu__secondary-item" key={path}>
              <Link className="menu__secondary-link" href={path}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="menu__studies" aria-hidden={!caseStudiesVisible}>
        <h2 className="menu__studies-title">
          Featured case stud{caseStudiesVisible ? 'ies' : 'y'}
        </h2>

        <MenuCaseStudies visible={caseStudiesVisible} />

        <button
          className="menu__studies-trigger"
          onClick={() => setCaseStudiesVisible((visible) => !visible)}
        >
          {caseStudiesVisible ? '⟵ Back to menu' : 'View more ⟶'}
        </button>
      </div>
    </nav>
  )
}

export default Menu
