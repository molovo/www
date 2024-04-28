import Image from 'next/image'
import { ComponentProps, DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import ContentFigure, { ContentFigureProps } from './content-figure'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

interface Props extends ComponentProps<typeof Image> {
  size?: ContentFigureProps['size']
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
