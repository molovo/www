import Link from '@/components/link'
import swash from '@/utils/swash'
import { ForwardedRef, forwardRef, PropsWithChildren, ReactNode } from 'react'

export type HomepageSectionLink = { label: ReactNode; url: string }

export type HomepageSectionProps = {
  title: string
  subtitle: string
  link?: HomepageSectionLink
  titleSwashCharacter?: string
  className?: string
}

const HomepageSection = (
  {
    title,
    subtitle,
    link,
    className = '',
    titleSwashCharacter = 'M',
    children,
  }: PropsWithChildren<HomepageSectionProps>,
  ref: ForwardedRef<HTMLElement>,
) => (
  <section
    id={className}
    className={`homepage-section ${
      className ? `homepage-section--${className} ${className}` : ''
    }`}
    ref={ref}
  >
    <header className="homepage-section__header">
      <div className="homepage-section__header-titles">
        <h2
          className="homepage-section__title"
          dangerouslySetInnerHTML={{
            __html: swash(title, titleSwashCharacter),
          }}
        />
        <span className="homepage-section__subtitle">{subtitle}</span>
      </div>

      {link && (
        <Link href={link.url} className="button homepage-section__link">
          {link.label}
        </Link>
      )}
    </header>

    {children}
  </section>
)

export default forwardRef(HomepageSection)
