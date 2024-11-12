'use client'

import useHeaderStyle from '@/hooks/use-header-style'
import useContactFormStateStore from '@/store/contact-form-state'
import Link from 'next/link'
import translations from 'content/translations'
import Logo from './logo'
import Social from './social'

const Footer = () => {
  const setRef = useHeaderStyle('white')
  const { open } = useContactFormStateStore()

  return (
    <footer className="footer" ref={setRef}>
      <div className="footer__left">
        <h2 className="footer__title">
          {translations.contact.cta.title}
          <br />
          <button className="footer__contact-trigger" onClick={open}>
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
          <Link href="/projects" className="footer__nav-link">
            Projects
          </Link>
          <Link href="/legal/terms" className="footer__nav-link">
            Terms
          </Link>
          <Link href="/legal/privacy" className="footer__nav-link">
            Privacy
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
