'use client'

import LogoImage from '@/components/images/icons/logo'
import ClientLogo, { ClientSlug } from './client-logo'
import useClientStore from '@/store/client'
import useLoadingStore from '@/store/loading'
import { CSSProperties, useEffect } from 'react'
import Link from 'next/link'
import { useEventListener } from '@superrb/react-addons/hooks'
import { usePathname } from 'next/navigation'
import useNavStateStore from '@/store/nav-state'

const Logo = ({
  client,
  asLink = false,
  style = {},
}: {
  client?: ClientSlug
  asLink?: boolean
  style?: Partial<CSSProperties>
}) => {
  const { close } = useNavStateStore()
  const { client: storedClient } = useClientStore()
  const { loading, setLoading } = useLoadingStore()
  const pathname = usePathname()

  const handleClick = (event: GlobalEventHandlersEventMap['click']) => {
    const target = event.target as HTMLElement
    const anchor = target.closest('a')

    if (
      anchor &&
      anchor.target !== '_blank' &&
      anchor.href !== window.location.href
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
            style={{ maskImage: 'url(/glasses-animated.png)' }}
          />
        ) : (
          <LogoImage />
        )}
      </div>

      {displayClient && (
        <>
          <span className="logo__separator">+</span>
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
    <div className="logo" style={style}>
      {inner}
    </div>
  )
}

export default Logo
