import Image from '@/components/image'
import ContentFigure, {
  ContentFigureCaption,
  ContentFigureProps,
} from './content-figure'
import { CSSProperties } from 'react'
import { Image as ImageType } from '@/types/image'

const ImageWall = ({
  images,
  caption,
  embedCaption = false,
  layout,
  size = 'standard',
  withPadding = false,
  stagger = true,
  style = {},
  imageStyle = {},
  zoomable = true,
}: {
  images: (ImageType & { allowScroll: boolean })[]
  caption?: string
  embedCaption?: boolean
  layout?: 'contain' | 'cover'
  size: ContentFigureProps['size']
  withPadding: ContentFigureProps['withPadding']
  stagger?: boolean
  style?: Partial<CSSProperties>
  imageStyle?: { [key: number]: Partial<CSSProperties> }
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
        {images.map(({ image, alt, allowScroll = false }, index) =>
          image ? (
            <Image
              key={index}
              src={image}
              alt={alt}
              width="1200"
              height="800"
              className="image-wall__image"
              style={imageStyle[index] || {}}
              zoomable={zoomable}
              allowScroll={allowScroll}
            />
          ) : (
            <div
              className="image-wall__image"
              key={index}
              style={imageStyle[index] || {}}
            />
          ),
        )}

        {caption && embedCaption && <ContentFigureCaption caption={caption} />}
      </div>
    </ContentFigure>
  )
}

export default ImageWall
