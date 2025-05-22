'use client'

import ClientLogo from '@/components/client-logo'
import Awwwards from '@/components/images/icons/awards/awwwards.svg'
import CreativePool from '@/components/images/icons/awards/creative-pool.svg'
import CSSDesignAwards from '@/components/images/icons/awards/css-design-awards.svg'
import Typewolf from '@/components/images/icons/awards/typewolf.svg'
import useHeaderStyle from '@/hooks/use-header-style'
import HomepageSection, {
  HomepageSectionLink,
} from '@/components/homepage/section'
import Link from '@/components/link'

const Nominee = () => <span className="awards__nominee">Nominated for</span>

const Awards = ({
  title,
  subtitle,
  link,
}: {
  title: string
  subtitle: string
  link?: HomepageSectionLink
}) => {
  const setRef = useHeaderStyle('red')

  return (
    <HomepageSection
      title={title}
      subtitle={subtitle}
      className="awards"
      ref={setRef}
    >
      <ol className="awards__items">
        <li className="awards__item">
          <div className="awards__logo">
            <Link
              href="https://www.joonbyrd.com"
              target="_blank"
              rel="noopener"
            >
              <span className="screenreader-text">Joonbyrd</span>
              <ClientLogo client="joonbyrd" />
            </Link>
          </div>

          <div className="awards__group">
            <h3 className="awards__group-title">
              <span className="screenreader-text">Awwwards</span>
              <Awwwards />
            </h3>

            <ul className="awards__list">
              <li>Honorable Mention</li>
            </ul>
          </div>
        </li>
        <li className="awards__item">
          <div className="awards__logo">
            <Link href="https://www.octaevo.com" target="_blank" rel="noopener">
              <span className="screenreader-text">Octaevo</span>
              <ClientLogo client="octaevo" />
            </Link>
          </div>

          <div className="awards__group">
            <h3 className="awards__group-title">
              <span className="screenreader-text">Awwwards</span>
              <Awwwards />
            </h3>

            <ul className="awards__list">
              <li>Honorable Mention</li>
              <li>
                <Nominee /> 2022 E-commerce Site of the Year
              </li>
            </ul>
          </div>

          <div className="awards__group">
            <h3 className="awards__group-title">
              <span className="screenreader-text">Typewolf</span>
              <Typewolf />
            </h3>

            <ul className="awards__list">
              <li>Site of the Day</li>
            </ul>
          </div>
        </li>
        <li className="awards__item">
          <div className="awards__logo">
            <Link href="https://www.superrb.com" target="_blank" rel="noopener">
              <span className="screenreader-text">Superrb</span>
              <ClientLogo client="superrb" />
            </Link>
          </div>

          <div className="awards__group">
            <h3 className="awards__group-title">
              <span className="screenreader-text">Awwwards</span>
              <Awwwards />
            </h3>

            <ul className="awards__list">
              <li>Site of the Day</li>
              <li>Developer Award</li>
              <li>
                <Nominee /> 2019 Developer Site of the Year
              </li>
            </ul>
          </div>

          <div className="awards__group">
            <h3 className="awards__group-title">
              <span className="screenreader-text">Creative Pool</span>
              <CreativePool />
            </h3>

            <ul className="awards__list">
              <li>
                <Nominee /> 2019 Annual Web Shortlist
              </li>
            </ul>
          </div>

          <div className="awards__group">
            <h3 className="awards__group-title">
              <span className="screenreader-text">CSS Design Awards</span>
              <CSSDesignAwards />
            </h3>

            <ul className="awards__list">
              <li>Site of the Day</li>
              <li>Best Innovation</li>
              <li>Best UI Design</li>
              <li>Best UX Design</li>
            </ul>
          </div>
        </li>
      </ol>
    </HomepageSection>
  )
}

export default Awards
