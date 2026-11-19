'use client'

import Image from '@/components/image'
import ContentFigure, {
  ContentFigureCaption,
  ContentFigureProps,
} from './content-figure'
import { CSSProperties } from 'react'
import { ZoomableImage } from '@/types/image'

const ImageWall = ({
  images,
  caption,
  embedCaption = false,
  layout,
  size = 'standard',
  withPadding = false,
  stagger = true,
  style = {},
  zoomable = true,
}: {
  images: (ZoomableImage & { video?: string })[]
  caption?: string
  embedCaption?: boolean
  layout?: 'contain' | 'cover'
  size: ContentFigureProps['size']
  withPadding: ContentFigureProps['withPadding']
  stagger?: boolean
  style?: Partial<CSSProperties>
  zoomable?: boolean
}) => {
  return (
    <ContentFigure
      size={size}
      withPadding={withPadding}
      caption={embedCaption ? undefined : caption}
    >
      <div
        className={`image-wall ${stagger ? 'image-wall--stagger' : ''} ${
          layout ? `image-wall--${layout}` : ''
        }`}
        style={style}
        suppressHydrationWarning
      >
        {images.map(
          ({ image, video, alt, sizes, style, allowScroll = false }, index) =>
            video ? (
              <video
                key={index}
                src={video}
                width="100%"
                autoPlay
                playsInline
                muted
                loop
                className="image-wall__image"
                style={style}
              />
            ) : image ? (
              <Image
                key={index}
                src={image}
                alt={alt}
                sizes={sizes}
                width="1200"
                height="800"
                className="image-wall__image"
                style={style}
                zoomable={zoomable}
                allowScroll={allowScroll}
              />
            ) : (
              <div className="image-wall__image" key={index} style={style} />
            ),
        )}

        {caption && embedCaption && <ContentFigureCaption caption={caption} />}
      </div>
    </ContentFigure>
  )
}

export default ImageWall
