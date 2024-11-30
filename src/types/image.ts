export interface Image {
  image: string
  alt: string
  sizes: string
}

export interface ZoomableImage extends Image {
  allowScroll?: boolean
}
