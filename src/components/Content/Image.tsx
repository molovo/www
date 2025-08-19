import Image from '@/components/image'
import { ComponentProps } from 'react'
import ContentFigure, { ContentFigureProps } from '@/components/Content/Figure'

import styles from './content-figure.module.sass'

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
  zoomable = true,
  ...props
}: Props) => {
  return (
    <ContentFigure size={size} caption={caption} withPadding={withPadding}>
      <Image
        src={src}
        alt={alt as string}
        className={styles.image}
        zoomable={zoomable}
        {...props}
      />
    </ContentFigure>
  )
}

export default ContentImage
