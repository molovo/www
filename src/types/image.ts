import { CSSProperties } from 'react'

export interface Image {
  image: string
  alt: string
  sizes: string
  style?: Partial<CSSProperties>
}

export interface ZoomableImage extends Image {
  allowScroll?: boolean
}
