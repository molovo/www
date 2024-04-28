'use client'

import Logo from '@/components/logo'
import MenuCaseStudies from '@/components/menu-case-studies'
import useHeaderStyle from '@/hooks/use-header-style'
import Link from 'next/link'

interface Item {
  url: string
  name: string
  text: string
  client?: string
  superrb?: boolean
}
const HomepageSection = ({ text, items }: { text: string; items: Item[] }) => {
  const setRef = useHeaderStyle('red')

  return (
    <section className="homepage-section" ref={setRef}>
      <div className="homepage-section__inner">
        <div className="homepage-section__text">
          <p dangerouslySetInnerHTML={{ __html: text }} />
        </div>

        {items[0].client ? (
          <MenuCaseStudies
            visible={true}
            filter={(study) => {
              return items.map((item) => item.client).includes(study.slug)
            }}
          />
        ) : (
          <ul className="homepage-section__list">
            {items.map(({ url, client, name, text }) => (
              <li className="homepage-section__item" key={url}>
                <Link href={url} className="homepage-section__item-link">
                  {client && <Logo client={client} />}
                  <h3 className="homepage-section__item-title">{name}</h3>
                </Link>

                <p className="homepage-section__item-text">{text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default HomepageSection
