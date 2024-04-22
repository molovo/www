import { PropsWithChildren } from 'react'

export interface ContentFigureProps {
  size: 'standard' | 'container-width' | 'full-width'
  withPadding?: boolean
  caption?: string
}

export const ContentFigureCaption = ({ caption }: { caption: string }) => (
  <figcaption className="content-figure__caption">
    <span dangerouslySetInnerHTML={{ __html: caption }} />
  </figcaption>
)

const ContentFigure = ({
  children,
  size = 'standard',
  withPadding = false,
  caption = '',
}: PropsWithChildren<ContentFigureProps>) => (
  <figure
    className={`content-figure content-figure--${size} ${
      withPadding ? 'content-figure--with-padding' : ''
    }`}
  >
    {children}

    {caption && <ContentFigureCaption caption={caption} />}
  </figure>
)

export default ContentFigure
