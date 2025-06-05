'use client'

import useHeaderStyle from '@/hooks/use-header-style'
import useContactFormStateStore from '@/store/contact-form-state'
import Link from '@/components/link'
import translations from 'content/translations'
import Logo from './logo'
import Social from './social'
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
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <Link href="/writing" className="footer__nav-link">
                Writing
              </Link>
            </li>
            <li className="footer__nav-item">
              <Link href="/#open-source" className="footer__nav-link">
                Open Source
              </Link>
            </li>
            <li className="footer__nav-item">
              <Link
                href="https://bsky.app/profile/molovo.co"
                className="footer__nav-link"
              >
                Follow me <BSky />
              </Link>
            </li>

            <li className="footer__nav-item">
              <Link className="footer__nav-link">Archive</Link>

              <ul className="footer__nav-sublist">
                {[2017, 2015].map((year) => (
                  <li className="footer__nav-subitem" key={year}>
                    <Link
                      href={`https://${year}.archive.molovo.co`}
                      className="footer__nav-link"
                      target="_blank"
                      rel="nofollow noopener"
                    >
                      {year}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>

        <span className="footer__attribution">
          Made with ♡ in Poole, UK.
          <br />
          &copy;{new Date().getFullYear()} James Dinsdale. All rights reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
