'use client'

import useHeaderStyle from '@/hooks/use-header-style'
import useContactFormStateStore from '@/store/contact-form-state'

const Footer = () => {
  const setRef = useHeaderStyle('white')
  const { open } = useContactFormStateStore()

  return (
    <footer className="footer" ref={setRef}>
      <h2 className="footer__title">
        Need help?{' '}
        <button className="footer__contact-trigger" onClick={open}>
          {"Let's work together."}
        </button>
      </h2>

      <div className="footer__bottom">
        <nav className="footer__nav">
          <a href="/writing" className="footer__nav-link">
            Writing
          </a>
          <a href="/projects" className="footer__nav-link">
            Projects
          </a>
          <a href="/legal/terms" className="footer__nav-link">
            Terms
          </a>
          <a href="/legal/privacy" className="footer__nav-link">
            Privacy
          </a>
        </nav>

        <span className="footer__attribution">
          &copy;{new Date().getFullYear()} molovo. All rights reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
