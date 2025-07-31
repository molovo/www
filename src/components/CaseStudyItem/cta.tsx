import useContactFormStateStore from '@/store/contact-form-state'
import useNavStateStore from '@/store/nav-state'
import translations from 'content/translations'
import Logo from '../logo'
import { CSSProperties } from 'react'

import styles from './case-study-item.module.sass'

const CaseStudyCta = ({
  className = '',
  style = {},
  visible = true,
}: {
  className?: string
  style?: Partial<CSSProperties>
  visible?: boolean
}) => {
  const { open: openContactForm } = useContactFormStateStore()
  const { close: closeNav } = useNavStateStore()

  return (
    <li className={`${styles.caseStudyItem} ${className}`} style={style}>
      <button
        className={styles.caseStudyCta}
        onClick={() => {
          closeNav()
          openContactForm()
        }}
        {...(!visible ? { tabIndex: -1 } : {})}
      >
        <Logo client="you" />

        <h2 className={styles.caseStudyCta__title}>
          {translations.contact.cta.title}
          <br />
          <translations.contact.cta.link />
        </h2>
      </button>
    </li>
  )
}

export default CaseStudyCta
