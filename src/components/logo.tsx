'use client'

import LogoImage from '@/components/images/icons/logo'
import ClientLogo, { ClientSlug } from './client-logo'
import useClientStore from '@/store/client'
import useLoadingStore from '@/store/loading'
import { useEffect } from 'react'
import Link from 'next/link'
import { useEventListener } from '@superrb/react-addons/hooks'
import { usePathname } from 'next/navigation'
import useNavStateStore from '@/store/nav-state'

const Logo = ({
  client,
  asLink = false,
}: {
  client?: ClientSlug
  asLink?: boolean
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
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src="/glasses-animated.png" alt="" />
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
      <Link href="/" className="logo" onClick={close}>
        {inner}
      </Link>
    )
  }

  return <div className="logo">{inner}</div>
}

export default Logo
