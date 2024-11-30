'use client'

import Image from '@/components/image'
import ContentFigure, {
  ContentFigureCaption,
  ContentFigureProps,
} from './content-figure'
import { CSSProperties } from 'react'
import { Image as ImageType, ZoomableImage } from '@/types/image'
import ReactPlayer from 'react-player'

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
      >
        {images.map(
          ({ image, video, alt, sizes, style, allowScroll = false }, index) =>
            video ? (
              <ReactPlayer
                key={index}
                url={video}
                width="100%"
                height="auto"
                controls={false}
                playing={true}
                autoplay={true}
                playsinline={true}
                muted={true}
                loop={true}
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
