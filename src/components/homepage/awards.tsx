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
      link={link}
      className="awards"
      ref={setRef}
    >
      <ol className="awards__items">
        <li className="awards__item">
          <Link href="/studies/joonbyrd" className="awards__logo">
            <ClientLogo client="joonbyrd" />
          </Link>

          <div className="awards__group">
            <h4 className="awards__group-title">
              <span className="screenreader-text">Awwwards</span>
              <Awwwards />
            </h4>

            <ul className="awards__list">
              <li>Honorable Mention</li>
            </ul>
          </div>
        </li>
        <li className="awards__item">
          <Link href="/studies/octaevo" className="awards__logo">
            <ClientLogo client="octaevo" />
          </Link>

          <div className="awards__group">
            <h4 className="awards__group-title">
              <span className="screenreader-text">Awwwards</span>
              <Awwwards />
            </h4>

            <ul className="awards__list">
              <li>Honorable Mention</li>
              <li>
                <Nominee /> 2022 E-commerce Site of the Year
              </li>
            </ul>
          </div>

          <div className="awards__group">
            <h4 className="awards__group-title">
              <span className="screenreader-text">Typewolf</span>
              <Typewolf />
            </h4>

            <ul className="awards__list">
              <li>Site of the Day</li>
            </ul>
          </div>
        </li>
        <li className="awards__item">
          <Link href="/studies/superrb" className="awards__logo">
            <ClientLogo client="superrb" />
          </Link>

          <div className="awards__group">
            <h4 className="awards__group-title">
              <span className="screenreader-text">Awwwards</span>
              <Awwwards />
            </h4>

            <ul className="awards__list">
              <li>Site of the Day</li>
              <li>Developer Award</li>
              <li>
                <Nominee /> 2019 Developer Site of the Year
              </li>
            </ul>
          </div>

          <div className="awards__group">
            <h4 className="awards__group-title">
              <span className="screenreader-text">Creative Pool</span>
              <CreativePool />
            </h4>

            <ul className="awards__list">
              <li>2019 People's Choice Award</li>
              <li>
                <Nominee /> 2019 Annual Shortlist
              </li>
            </ul>
          </div>

          <div className="awards__group">
            <h4 className="awards__group-title">
              <span className="screenreader-text">CSS Design Awards</span>
              <CSSDesignAwards />
            </h4>

            <ul className="awards__list">
              <div>
                <li>Site of the Day</li>
                <li>Best Innovation</li>
                <li>Best UI Design</li>
                <li>Best UX Design</li>
              </div>
            </ul>
          </div>
        </li>
      </ol>
    </HomepageSection>
  )
}

export default Awards
