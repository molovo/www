'use client'

import Link from '@/components/link'
import { useState } from 'reinspect'
import useNavStateStore from '@/store/nav-state'
import { MutableRefObject, ReactNode, useEffect, useRef } from 'react'
import { useLockBodyScroll, useIsMobile } from '@superrb/react-addons/hooks'
import { usePathname } from 'next/navigation'
import MenuCaseStudies from './menu-case-studies'
import CaseStudyType from '@/types/case-study'
import Social from './social'
import BSky from './images/icons/social/bsky.svg'
import useContactFormStateStore from '@/store/contact-form-state'
import useEscape from '@/hooks/use-escape'
import { Mutable } from 'next/dist/client/components/router-reducer/router-reducer-types'

interface NavigationItem {
  label: string | ReactNode
  url?: string
  handler?: () => void
}

const navigationItems: NavigationItem[] = [
  {
    url: '/writing',
    label: 'Writing',
  },
  {
    url: '/#open-source',
    label: 'Open source',
  },
]

const secondaryNavigationItems: NavigationItem[] = [
  {
    url: '/resume',
    label: 'CV/Resume',
  },
  {
    label: 'Contact',
    handler: () => {
      useContactFormStateStore.getState().open()
      useNavStateStore.getState().close()
    },
  },
  {
    url: 'https://bsky.app/profile/molovo.co',
    label: (
      <>
        Follow me
        <BSky />
      </>
    ),
  },
]

const Menu = ({ studies = [] }: { studies: CaseStudyType[] }) => {
  const nav = useRef<HTMLElement>() as MutableRefObject<HTMLElement>
  const isMobile = useIsMobile(true, '48em')
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
  useEscape(nav, close)

  const blurTimer = useRef<NodeJS.Timeout | null>(
    null,
  ) as MutableRefObject<NodeJS.Timeout | null>

  return (
    <nav
      className="menu"
      id="nav"
      aria-hidden={!isOpen}
      onBlur={(event) => {
        blurTimer.current = setTimeout(() => {
          close()
        }, 50)
      }}
      onFocus={() => {
        if (blurTimer.current !== null) {
          clearTimeout(blurTimer.current)
          blurTimer.current = null
        }
      }}
      ref={nav}
    >
      <div className="menu__main" aria-hidden={caseStudiesVisible}>
        <ul className="menu__items">
          <li className="menu__item menu__item" key="work">
            <button
              className="menu__link"
              onClick={() => setCaseStudiesVisible(true)}
              {...(!isOpen || caseStudiesVisible ? { tabIndex: -1 } : {})}
            >
              Work
            </button>
          </li>

          {navigationItems.map(({ label, url, handler }: NavigationItem) => {
            if (handler) {
              return (
                <li
                  className="menu__item menu__item"
                  key={url || (label as string)}
                >
                  <button
                    className="menu__link"
                    onClick={handler}
                    {...(!isOpen || caseStudiesVisible ? { tabIndex: -1 } : {})}
                  >
                    {label}
                  </button>
                </li>
              )
            }

            return (
              <li className="menu__item menu__item" key={url}>
                <Link
                  className="menu__link"
                  href={url as string}
                  target={
                    (url as string).startsWith('/') ? undefined : '_blank'
                  }
                  rel={(url as string).startsWith('/') ? undefined : 'noopener'}
                  onClick={close}
                  {...(!isOpen || caseStudiesVisible ? { tabIndex: -1 } : {})}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        <ul className="menu__secondary">
          {secondaryNavigationItems.map(({ label, url, handler }) => {
            if (handler) {
              return (
                <li
                  className="menu__secondary-item"
                  key={url || (label as string)}
                >
                  <button
                    className="menu__secondary-link"
                    onClick={handler}
                    {...(!isOpen || caseStudiesVisible ? { tabIndex: -1 } : {})}
                  >
                    {label}
                  </button>
                </li>
              )
            }

            return (
              <li
                className="menu__secondary-item"
                key={url || (label as string)}
              >
                <Link
                  className="menu__secondary-link"
                  href={url as string}
                  target={
                    (url as string).startsWith('/') ? undefined : '_blank'
                  }
                  rel={(url as string).startsWith('/') ? undefined : 'noopener'}
                  onClick={close}
                  {...(!isOpen || caseStudiesVisible ? { tabIndex: -1 } : {})}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="menu__studies" aria-hidden={!caseStudiesVisible}>
        <h2 className="menu__studies-title">
          Featured case stud{isMobile || caseStudiesVisible ? 'ies' : 'y'}
        </h2>

        <button
          aria-label={
            caseStudiesVisible ? 'Back to menu' : 'View more case studies'
          }
          className="menu__studies-trigger"
          onClick={() => setCaseStudiesVisible((visible) => !visible)}
          {...(!isOpen ? { tabIndex: -1 } : {})}
        >
          {caseStudiesVisible ? (
            '⟵ Back to menu'
          ) : (
            <>
              View more <span className="screenreader-text">case studies</span>⟶
            </>
          )}
        </button>

        <MenuCaseStudies studies={studies} visible={caseStudiesVisible} />
      </div>
    </nav>
  )
}

export default Menu
