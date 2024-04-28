import { CSSProperties, PropsWithChildren } from 'react'

export interface ContentFigureProps {
  size: 'standard' | 'container-width' | 'full-width'
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
  <figcaption className="content-figure__caption" style={style}>
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
    className={`content-figure content-figure--${size} ${
      withPadding ? 'content-figure--with-padding' : ''
    }`}
    style={style}
  >
    {children}

    {caption && <ContentFigureCaption caption={caption} style={captionStyle} />}
  </figure>
)

export default ContentFigure
