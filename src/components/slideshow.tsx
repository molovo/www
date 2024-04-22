'use client'

import ContentFigure from './content-figure'
import Image from 'next/image'
import { useState } from 'reinspect'

const Slideshow = ({ images = [], caption = '' }) => {
  const [current, setCurrent] = useState<number>(0, 'Current slide')

  const handleScroll = (event: Event) => {
    const { scrollLeft } = event.target
    const { clientWidth } = event.target.children[0]
    const index = Math.round(scrollLeft / clientWidth)
    setCurrent(index)
  }

  return (
    <ContentFigure
      size="full-width"
      caption={`${caption}<strong>${current + 1} of ${images.length}</strong>`}
    >
      <div className="slideshow" onScroll={handleScroll}>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt=""
            className="slideshow__image"
            aria-current={index === current}
          />
        ))}
      </div>
    </ContentFigure>
  )
}

export default Slideshow
