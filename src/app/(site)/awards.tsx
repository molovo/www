'use client'

import ClientLogo from '@/components/client-logo'
import Awwwards from '@/components/images/icons/awwwards.svg'
import CreativePool from '@/components/images/icons/creative-pool.svg'
import CSSDesignAwards from '@/components/images/icons/css-design-awards.svg'
import Typewolf from '@/components/images/icons/typewolf.svg'
import useHeaderStyle from '@/hooks/use-header-style'
import swash from '@/utils/swash'

const Nominee = () => <span className="awards__nominee">Nominated for</span>

const Awards = () => {
  const setRef = useHeaderStyle('red')

  return (
    <section
      className="homepage-section homepage-section--awards awards"
      ref={setRef}
    >
      <header className="homepage-section__header">
        <span
          className="homepage-section__pre-title"
          dangerouslySetInnerHTML={{
            __html: swash('Turns out, the big names have _great taste_.', 'M'),
          }}
        />
        <h2 className="homepage-section__title">
          My work has been recognised by some of the industry's top players.
        </h2>
      </header>

      <ol className="awards__items">
        <li className="awards__item">
          <a href="/studies/joonbyrd" className="awards__logo">
            <ClientLogo client="joonbyrd" />
          </a>

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
          <a href="/studies/octaevo" className="awards__logo">
            <ClientLogo client="octaevo" />
          </a>

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
          <a href="/studies/superrb" className="awards__logo">
            <ClientLogo client="superrb" />
          </a>

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
              <li><Nominee /> 2019 Annual Shortlist</li>
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
    </section>
  )
}

export default Awards
