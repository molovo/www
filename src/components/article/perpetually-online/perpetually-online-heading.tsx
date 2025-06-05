'use client'

import { cinema } from '@/fonts/articles/perpetually-online'
import ContentImage from '@/components/content-image'
import laptop from '@/images/articles/perpetually-online/laptop.png'
import Sun from './icons/sun.svg'
import Moon from './icons/moon.svg'
import useHeaderStyle from '@/hooks/use-header-style'

const PerpetuallyOnlineHeading = () => {
  const setRef = useHeaderStyle('red')

  return (
    <div className="perpetually-online-heading" ref={setRef}>
      <div className="perpetually-online-heading__animation">
        <Sun />
        <Moon />
      </div>
      <ContentImage
        className="perpetually-online-heading__image"
        alt="Man sitting at a laptop"
        src={laptop}
        sizes="24em"
        zoomable={false}
      />
      <h1 className={cinema.className}>Perpetually Online</h1>
    </div>
  )
}

export default PerpetuallyOnlineHeading
