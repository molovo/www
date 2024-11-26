'use client'

import useHeaderStyle from '@/hooks/use-header-style'
import useContactFormStateStore from '@/store/contact-form-state'
import Link from '@/components/link'
import translations from 'content/translations'
import Logo from './logo'
import Social from './social'
import useNavStateStore from '@/store/nav-state'
import BSky from './images/icons/social/bsky.svg'

const Footer = () => {
  const setRef = useHeaderStyle('white')
  const { open: openContactForm } = useContactFormStateStore()

  return (
    <footer className="footer" ref={setRef}>
      <div className="footer__left">
        <h2 className="footer__title">
          {translations.contact.cta.title}
          <br />
          <button className="footer__contact-trigger" onClick={openContactForm}>
            <translations.contact.cta.link />
          </button>
        </h2>
      </div>

      <div className="footer__right">
        <Logo asLink={true} noClient={true} />
        <Social />
      </div>

      <div className="footer__bottom">
        <nav className="footer__nav">
          <Link href="/writing" className="footer__nav-link">
            Writing
          </Link>
          <Link href="/#open-source" className="footer__nav-link">
            Open Source
          </Link>
          <Link
            href="https://bsky.app/profile/molovo.co"
            className="footer__nav-link"
          >
            Follow me <BSky />
          </Link>
        </nav>

        <span className="footer__attribution">
          &copy;{new Date().getFullYear()} molovo. All rights reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
