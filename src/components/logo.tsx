'use client'

import glassesAnimated from '@/images/icons/glasses-animated.png'
import LogoImage from '@/components/images/icons/logo'
import ClientLogo, { ClientSlug } from './client-logo'
import useClientStore from '@/store/client'
import useLoadingStore from '@/store/loading'
import { CSSProperties, HTMLAttributes, useEffect } from 'react'
import Link from '@/components/link'
import { useEventListener } from '@superrb/react-addons/hooks'
import { usePathname } from 'next/navigation'
import useNavStateStore from '@/store/nav-state'

interface Props extends HTMLAttributes<HTMLDivElement> {
  client?: ClientSlug
  noClient?: boolean
  asLink?: boolean
  style?: Partial<CSSProperties>
}

const Logo = ({
  client,
  noClient = false,
  asLink = false,
  style = {},
  ...props
}: Props) => {
  const { close } = useNavStateStore()
  const { client: storedClient } = useClientStore()
  const { loading, setLoading } = useLoadingStore()
  const pathname = usePathname()

  const handleClick = (event: GlobalEventHandlersEventMap['click']) => {
    const target = event.target as HTMLElement
    const anchor = target.closest('a')

    if (!anchor) return

    const url = new URL(anchor?.href || '')

    if (
      url &&
      anchor?.target !== '_blank' &&
      url.pathname !== window.location.pathname
    ) {
      setLoading(true)
    }
  }
  useEventListener('click', handleClick, undefined, undefined, asLink)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [pathname, setLoading])

  const displayClient = client || storedClient

  const inner = (
    <>
      <div className="logo__image">
        {asLink && loading ? (
          <div
            className="logo__image--mask"
            style={{ maskImage: `url(${glassesAnimated.src})` }}
            role="img"
            aria-label="molovo"
          />
        ) : (
          <LogoImage />
        )}
      </div>

      {displayClient && !noClient && (
        <>
          <span className="logo__separator" role="img" aria-label="+">
            +
          </span>
          <div className="logo__client">
            <ClientLogo client={displayClient} />
          </div>
        </>
      )}
    </>
  )

  if (asLink) {
    return (
      <Link href="/" className="logo" onClick={close} style={style}>
        {inner}
      </Link>
    )
  }

  return (
    <div className="logo" style={style} {...props}>
      {inner}
    </div>
  )
}

export default Logo
