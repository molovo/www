import { Fragment, ReactNode } from 'react'
import SuperrbLink from './superrb-link'

const map: { [key: string]: ReactNode } = {
  superrb: <SuperrbLink />,
}

const CaseStudyHelp = ({ helpers = [] }: { helpers?: string[] }) => (
  <span className="case-study__section-superrb">
    <h3 className="case-study__section-superrb-title">I had some help</h3>
    <span className="case-study__section-superrb-text">
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
