import Image from '@/components/image'
import { ComponentProps } from 'react'
import ContentFigure, { ContentFigureProps } from './content-figure'

interface Props extends ComponentProps<typeof Image> {
  size?: ContentFigureProps['size']
  withPadding?: ContentFigureProps['withPadding']
}

const ContentImage = ({
  src,
  alt,
  size = 'standard',
  withPadding = false,
  ...props
}: Props) => {
  return (
    <ContentFigure size={size} caption={alt} withPadding={withPadding}>
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
