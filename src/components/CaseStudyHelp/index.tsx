import { Fragment, ReactNode } from 'react'
import SuperrbLink from '../superrb-link'

import styles from './case-study-help.module.sass'

const map: { [key: string]: ReactNode } = {
  superrb: <SuperrbLink />,
}

const CaseStudyHelp = ({ helpers = [] }: { helpers?: string[] }) => (
  <span className={styles.help}>
    <h3 className={styles.help__title}>I had some help</h3>
    <span className={styles.help__text}>
      Made with the team{helpers.length > 1 ? 's' : ''} at{' '}
      {helpers.map((helper, i) =>
        helper in map ? (
          <Fragment key={helper}>
            {map[helper]}
            {i < helpers.length - 1 && ' & '}
          </Fragment>
        ) : null,
      )}
    </span>
  </span>
)

export default CaseStudyHelp
