import Image from 'next/image'
import ContentFigure, {
  ContentFigureCaption,
  ContentFigureProps,
} from './content-figure'
import { CSSProperties } from 'react'

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
}: {
  images: string[]
  caption?: string
  embedCaption?: boolean
  layout?: 'contain' | 'cover'
  size: ContentFigureProps['size']
  withPadding: ContentFigureProps['withPadding']
  stagger?: boolean
  style?: Partial<CSSProperties>
  imageStyle?: { [key: number]: Partial<CSSProperties> }
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
        {images.map((image, index) =>
          image ? (
            <Image
              key={index}
              src={image}
              alt=""
              width="1200"
              height="800"
              className="image-wall__image"
              style={imageStyle[index] || {}}
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
