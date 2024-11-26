import Image from '@/components/image'
import { ComponentProps } from 'react'
import ContentFigure, { ContentFigureProps } from './content-figure'

interface Props extends ComponentProps<typeof Image> {
  caption?: ContentFigureProps['caption']
  size?: ContentFigureProps['size']
  withPadding?: ContentFigureProps['withPadding']
}

const ContentImage = ({
  src,
  alt,
  caption,
  size = 'standard',
  withPadding = false,
  ...props
}: Props) => {
  return (
    <ContentFigure size={size} caption={caption} withPadding={withPadding}>
      <Image
        src={src}
        alt={alt as string}
        className="content-figure__image"
        {...props}
      />
    </ContentFigure>
  )
}

export default ContentImage
