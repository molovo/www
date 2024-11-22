import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
} from 'react'
import { isExternalLink } from '@superrb/react-addons/utils'

type Props = PropsWithChildren<
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>
  | NextLinkProps
> & {
  href?: string
}

const Link = (
  { href, children, ...props }: Props,
  ref: ForwardedRef<HTMLAnchorElement | HTMLButtonElement>,
) => {
  if (!href) {
    return (
      <button
        ref={ref as ForwardedRef<HTMLButtonElement>}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    )
  }

  const isExternal = isExternalLink(href)

  if (isExternal) {
    return (
      <a
        ref={ref as ForwardedRef<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener"
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    )
  }

  return (
    <NextLink
      ref={ref as ForwardedRef<HTMLAnchorElement>}
      href={href}
      {...(props as Omit<NextLinkProps, 'href'>)}
    >
      {children}
    </NextLink>
  )
}

export default forwardRef(Link)
export type { Props as LinkProps }
