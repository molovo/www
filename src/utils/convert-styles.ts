import { CSSProperties } from 'react'

const convertStyles = (style?: Partial<CSSProperties>): string | undefined => {
  if (!style) {
    return
  }

  return Object.entries(style)
    .map(
      ([key, value]) =>
        `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value}`,
    )
    .join('; ')
}

export default convertStyles
