import useContactFormStateStore from '@/store/contact-form-state'
import useNavStateStore from '@/store/nav-state'
import translations from 'content/translations'
import Logo from './logo'
import { CSSProperties } from 'react'

const CaseStudyCta = ({
  className = '',
  style = {},
}: {
  className?: string
  style?: Partial<CSSProperties>
}) => {
  const { open: openContactForm } = useContactFormStateStore()
  const { close: closeNav } = useNavStateStore()

  return (
    <li className={`case-study-item ${className}`} style={style}>
      <button
        className="case-study-cta"
        onClick={() => {
          closeNav()
          openContactForm()
        }}
      >
        <Logo client="you" />

        <h2 className="case-study-cta__title">
          {translations.contact.cta.title}
          <br />
          <translations.contact.cta.link />
        </h2>
      </button>
    </li>
  )
}

export default CaseStudyCta
