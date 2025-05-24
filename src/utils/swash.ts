import { CSSProperties } from 'react'
import convertStyles from './convert-styles'

const swash = (
  text: string,
  character?: string,
  style?: Partial<CSSProperties>,
) =>
  text.replace(
    /_([^_]+)_/g,
    `<span aria-hidden="true" class="swash" style="${convertStyles(style)}" ${
      character ? `data-character="${character}"` : ''
    }>$1</span>`,
  )

export default swash
