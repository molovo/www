import { ComponentProps } from 'react'
import Logo from './logo'

const LineBreak = (props: ComponentProps<'hr'>) => (
  <div className="line-break" role="separator" {...props}>
    <Logo aria-hidden="true" />
  </div>
)

export default LineBreak
