import { CSSProperties, PropsWithChildren } from 'react'

import styles from './content-figure.module.sass'

export interface ContentFigureProps {
  size: 'standard' | 'container-width' | 'full-width' | 'text-width'
  withPadding?: boolean
  caption?: string
  style?: Partial<CSSProperties>
  captionStyle?: Partial<CSSProperties>
}

export const ContentFigureCaption = ({
  caption,
  style = {},
}: {
  caption: string
  style?: Partial<CSSProperties>
}) => (
  <figcaption className={styles.caption} style={style}>
    <span dangerouslySetInnerHTML={{ __html: caption }} />
  </figcaption>
)

const ContentFigure = ({
  children,
  size = 'standard',
  withPadding = false,
  caption = '',
  style = {},
  captionStyle = {},
}: PropsWithChildren<ContentFigureProps>) => (
  <figure
    className={`${styles.figure} ${styles[`figure--${size}`]} ${
      withPadding ? styles[`figure--with-padding`] : ''
    }`}
    style={style}
  >
    {children}

    {caption && <ContentFigureCaption caption={caption} style={captionStyle} />}
  </figure>
)

export default ContentFigure
