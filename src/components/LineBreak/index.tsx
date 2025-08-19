import { ComponentProps } from 'react'
import Logo from '@/components/Logo'

import styles from './line-break.module.sass'

const LineBreak = (props: ComponentProps<'hr'>) => (
  <div className={styles.lineBreak} role="separator" {...props}>
    <Logo className={styles.logo} aria-hidden="true" />
  </div>
)

export default LineBreak
