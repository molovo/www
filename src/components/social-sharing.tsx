'use client'

import LinkIcon from '@/components/images/icons/social/link.svg'
import Share from '@/components/images/icons/share.svg'
import Link from '@/components/link'
// import Facebook from '@/components/images/icons/social/facebook.svg'
import Twitter from '@/components/images/icons/social/twitter.svg'
import BSky from '@/components/images/icons/social/bsky.svg'
import Reddit from '@/components/images/icons/social/reddit.svg'
import Mail from '@/components/images/icons/social/mail.svg'
import Flipboard from './images/icons/social/flipboard.svg'
import { CSSProperties, MouseEventHandler} from 'react'
import { useIsInViewport, useIsMobile } from '@superrb/react-addons/hooks'
import { usePathname } from 'next/navigation'

const openShareWindow = (href: string): void => {
  window.open(
    href,
    '',
    'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600',
  )
}

const share: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (
  event,
) => {
  event.preventDefault()

  const link = (event.currentTarget || event.target) as HTMLAnchorElement

  openShareWindow(link.href)
  link.blur()
}

const copyToClipboard: MouseEventHandler<HTMLButtonElement> = (event) => {
  event.preventDefault()

  const link = (event.currentTarget || event.target) as HTMLButtonElement

  navigator.clipboard.writeText(window.location.href as string)

  const message = link.querySelector(
    '.social-sharing__tooltip',
  ) as HTMLSpanElement
  message.setAttribute('aria-hidden', 'false')

  setTimeout(() => {
    message.setAttribute('aria-hidden', 'true')
    setTimeout(() => {
      link.blur()
    }, 500)
  }, 5000)
}

const SocialSharing = ({
  title,
  text,
  style = {},
}: {
  title?: string
  text?: string
  style?: Partial<CSSProperties>
}) => {
  const { isInViewport, setRef } = useIsInViewport(false)
  const isMobile = useIsMobile(true, 'calc(9em + 52rem)')
  const pathname = usePathname()

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`
  const postText =
    text ||
    `${
      title
    } :: ${url}`

  return (
    <aside
      className="social-sharing"
      aria-hidden={!isInViewport && !isMobile}
      style={style}
      ref={setRef}
      suppressHydrationWarning
    >
      <div className="social-sharing__inner">
        <button className="social-sharing__trigger">
          <span className="screenreader-text">Share this page</span>
          <Share />
        </button>

        <ul className="social-sharing__items">
          <li className="social-sharing__item">
            <Link className="social-sharing__button" onClick={copyToClipboard}>
              <span className="screenreader-text">Copy link</span>
              <LinkIcon />

              <span className="social-sharing__tooltip" aria-hidden="true">
                Copied to clipboard
              </span>
            </Link>
          </li>

          <li className="social-sharing__item">
            <Link
              className="social-sharing__button"
              href={`mailto:?subject=${postText}&body=${postText}`}
            >
              <span className="screenreader-text">Share via email</span>
              <Mail />
            </Link>
          </li>

          <li className="social-sharing__item">
            <Link
              className="social-sharing__button"
              href={`https://bsky.app/intent/compose?text=${postText}`}
              onClick={share}
            >
              <span className="screenreader-text">Share on Bluesky</span>
              <BSky />
            </Link>
          </li>

          <li className="social-sharing__item">
            <Link
              className="social-sharing__button"
              href={`http://twitter.com/share?text=${postText}&url=${url}`}
              onClick={share}
            >
              <span className="screenreader-text">Share on Twitter</span>
              <Twitter />
            </Link>
          </li>

          <li className="social-sharing__item">
            <Link
              className="social-sharing__button"
              href={`https://share.flipboard.com/bookmarklet/popout?v=${title}&url=${url}`}
              onClick={share}
            >
              <span className="screenreader-text">Share on Flipboard</span>
              <Flipboard />
            </Link>
          </li>

          <li className="social-sharing__item">
            <Link
              className="social-sharing__button"
              href={`https://www.reddit.com/web/submit?url=${url}&text=${postText}`}
              onClick={share}
            >
              <span className="screenreader-text">Share on Reddit</span>
              <Reddit />
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default SocialSharing
