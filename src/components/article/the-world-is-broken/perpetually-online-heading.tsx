'use client'

import { cinema } from '@/fonts/articles/the-world-is-broken'
import ContentImage from '@/components/content-image'
import laptop from '@/images/articles/the-world-is-broken/laptop.png'
import Sun from './icons/sun.svg'
import Moon from './icons/moon.svg'
import Lamp from './icons/lamp.svg'
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
      />
      <h2 className={cinema.className}>Perpetually Online</h2>
    </div>
  )
}

export default PerpetuallyOnlineHeading
