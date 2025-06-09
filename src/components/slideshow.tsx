'use client'

import ContentFigure from './content-figure'
import Image from '@/components/image'
import { CSSProperties, UIEventHandler } from 'react'
import { useState } from 'reinspect'

const Slideshow = ({
  images = [],
  caption = '',
  style = {},
  imageStyle = {},
  captionStyle = {},
}: {
  images: any[]
  caption: string
  style: Partial<CSSProperties>
  imageStyle?: Partial<CSSProperties>
  captionStyle?: Partial<CSSProperties>
}) => {
  const [current, setCurrent] = useState<number>(0, 'Current slide')

  const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
    const { scrollLeft, children } = event.target as HTMLElement
    const { clientWidth } = children[0]
    const index = Math.round(scrollLeft / clientWidth)
    setCurrent(index)
  }

  return (
    <ContentFigure
      size="full-width"
      caption={`${caption}<strong>${current + 1} of ${images.length}</strong>`}
      style={style}
      captionStyle={captionStyle}
    >
      <div className="slideshow" onScroll={handleScroll}>
        {images.map(({ image, alt, sizes }, index) => (
          <Image
            key={index}
            src={image}
            alt={alt}
            sizes={sizes}
            className="slideshow__image"
            aria-current={index === current}
            style={imageStyle}
            zoomable={true}
          />
        ))}
      </div>
    </ContentFigure>
  )
}

export default Slideshow
