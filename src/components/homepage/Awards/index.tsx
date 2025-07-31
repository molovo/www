'use client'

import ClientLogo from '@/components/client-logo'
import Awwwards from '@/components/images/icons/awards/awwwards.svg'
import CreativePool from '@/components/images/icons/awards/creative-pool.svg'
import CSSDesignAwards from '@/components/images/icons/awards/css-design-awards.svg'
import Typewolf from '@/components/images/icons/awards/typewolf.svg'
import useHeaderStyle from '@/hooks/use-header-style'
import HomepageSection from '@/components/homepage/Section'

import styles from './awards.module.sass'

const Nominee = () => (
  <span className={styles.awards__nominee}>Nominated for</span>
)

const Awards = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const setRef = useHeaderStyle('red')

  return (
    <HomepageSection
      title={title}
      subtitle={subtitle}
      className={styles.awards}
      ref={setRef}
    >
      <ol className={styles.awards__items}>
        <li className={styles.awards__item}>
          <div className={styles.awards__logo}>
            <a href="https://www.joonbyrd.com" target="_blank" rel="noopener">
              <span className="screenreader-text">Joonbyrd</span>
              <ClientLogo client="joonbyrd" />
            </a>
          </div>

          <div className={styles.awards__group}>
            <h3 className={styles.awards__groupTitle}>
              <span className="screenreader-text">Awwwards</span>
              <Awwwards />
            </h3>

            <ul className={styles.awards__list}>
              <li>Honorable Mention</li>
            </ul>
          </div>
        </li>
        <li className={styles.awards__item}>
          <div className={styles.awards__logo}>
            <a href="https://www.octaevo.com" target="_blank" rel="noopener">
              <span className="screenreader-text">Octaevo</span>
              <ClientLogo client="octaevo" />
            </a>
          </div>

          <div className={styles.awards__group}>
            <h3 className={styles.awards__groupTitle}>
              <span className="screenreader-text">Awwwards</span>
              <Awwwards />
            </h3>

            <ul className={styles.awards__list}>
              <li>Honorable Mention</li>
              <li>
                <Nominee /> 2022 E-commerce Site of the Year
              </li>
            </ul>
          </div>

          <div className={styles.awards__group}>
            <h3 className={styles.awards__groupTitle}>
              <span className="screenreader-text">Typewolf</span>
              <Typewolf />
            </h3>

            <ul className={styles.awards__list}>
              <li>Site of the Day</li>
            </ul>
          </div>
        </li>
        <li className={styles.awards__item}>
          <div className={styles.awards__logo}>
            <a href="https://www.superrb.com" target="_blank" rel="noopener">
              <span className="screenreader-text">Superrb</span>
              <ClientLogo client="superrb" />
            </a>
          </div>

          <div className={styles.awards__group}>
            <h3 className={styles.awards__groupTitle}>
              <span className="screenreader-text">Awwwards</span>
              <Awwwards />
            </h3>

            <ul className={styles.awards__list}>
              <li>Site of the Day</li>
              <li>Developer Award</li>
              <li>
                <Nominee /> 2019 Developer Site of the Year
              </li>
            </ul>
          </div>

          <div className={styles.awards__group}>
            <h3 className={styles.awards__groupTitle}>
              <span className="screenreader-text">Creative Pool</span>
              <CreativePool />
            </h3>

            <ul className={styles.awards__list}>
              <li>
                <Nominee /> 2019 Annual Web Shortlist
              </li>
            </ul>
          </div>

          <div className={styles.awards__group}>
            <h3 className={styles.awards__groupTitle}>
              <span className="screenreader-text">CSS Design Awards</span>
              <CSSDesignAwards />
            </h3>

            <ul className={styles.awards__list}>
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
