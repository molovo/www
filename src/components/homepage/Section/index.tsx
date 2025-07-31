import swash from '@/utils/swash'
import { ForwardedRef, forwardRef, PropsWithChildren, ReactNode } from 'react'

import styles from './section.module.sass'

export type HomepageSectionLink = { label: ReactNode; url: string }

export type HomepageSectionProps = {
  title: string
  subtitle: string
  titleSwashCharacter?: string
  className?: string
}

const HomepageSection = (
  {
    title,
    subtitle,
    className = '',
    titleSwashCharacter = 'M',
    children,
  }: PropsWithChildren<HomepageSectionProps>,
  ref: ForwardedRef<HTMLElement>,
) => (
  <section
    id={className}
    className={`${styles.section} ${
      className ? `${styles[`section--${className}`]} ${className}` : ''
    }`}
    ref={ref}
  >
    <header className={styles.section__header}>
      <div className={styles.section__headerTitles}>
        <h2
          className={styles.section__title}
          dangerouslySetInnerHTML={{
            __html: swash(title, titleSwashCharacter),
          }}
        />
        <span className={styles.section__subtitle}>{subtitle}</span>
      </div>
    </header>

    {children}
  </section>
)

export default forwardRef(HomepageSection)
