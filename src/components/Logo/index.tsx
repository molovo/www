'use client'

import glassesAnimated from '@/images/icons/glasses-animated.webp'
import LogoImage from '@/components/images/icons/logo'
import ClientLogo, { ClientSlug } from './ClientLogo'
import useClientStore from '@/store/client'
import useLoadingStore from '@/store/loading'
import { CSSProperties, HTMLAttributes, useEffect } from 'react'
import Link from '@/components/link'
import { useEventListener } from '@superrb/react-addons/hooks'
import { usePathname } from 'next/navigation'
import useNavStateStore from '@/store/nav-state'
import useThemeStore from '@/store/theme'

import styles from './logo.module.sass'

interface Props extends HTMLAttributes<HTMLDivElement> {
  client?: ClientSlug
  className?: string
  noClient?: boolean
  asLink?: boolean
  style?: Partial<CSSProperties>
}

const Logo = ({
  client,
  className = '',
  noClient = false,
  asLink = false,
  style = {},
  ...props
}: Props) => {
  const { close } = useNavStateStore()
  const { client: storedClient } = useClientStore()
  const { loading, setLoading } = useLoadingStore()
  const pathname = usePathname()
  const { headerStyle } = useThemeStore()

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
      <span className="screenreader-text">Molovo</span>
      <div className={styles.logo__image}>
        {asLink && loading ? (
          <div
            className={styles.logo__loading}
            style={{ maskImage: `url(${glassesAnimated.src})` }}
            role="img"
            aria-label="molovo"
          />
        ) : (
          <LogoImage
            frameClassName={styles.frame}
            leftLensClassName={`${styles.lens} ${styles.lensLeft}`}
            rightLensClassName={`${styles.lens} ${styles.lensRight}`}
          />
        )}
      </div>

      {displayClient && !noClient && (
        <>
          <span className={styles.logo__separator} role="img" aria-label="+">
            +
          </span>
          <div className={styles.logo__client}>
            <ClientLogo client={displayClient} />
          </div>
        </>
      )}
    </>
  )

  if (asLink) {
    return (
      <Link
        href="/"
        className={`${styles.logo} ${className}`}
        onClick={close}
        style={style}
      >
        {inner}
      </Link>
    )
  }

  return (
    <div
      className={`${styles.logo} ${styles[`logo--${headerStyle?.split('-')[0]}`]} ${className}`}
      style={style}
      {...props}
    >
      {inner}
    </div>
  )
}

export default Logo
