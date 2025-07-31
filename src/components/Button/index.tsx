import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react'
import Link from '@/components/link'

import styles from './button.module.sass'

export type ButtonProps = PropsWithChildren<
  {
    icon?: ReactNode
  } & AnchorHTMLAttributes<HTMLAnchorElement> &
    ButtonHTMLAttributes<HTMLButtonElement>
>

export default function Button({
  children,
  icon,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <Link className={`${styles.button} ${className}`} {...props}>
      {icon && (
        <span
          className={`${styles.button__icon} ${styles.button__iconPrimary}`}
        >
          {icon}
        </span>
      )}
      <span className={styles.button__icon}>
        <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
          <path
            className={styles.button__iconLine}
            d="M40 132h176c2.2 0 4-1.8 4-4 0-2.21-1.8-4-4-4H40c-2.21 0-4 1.79-4 4 0 2.2 1.79 4 4 4Z"
            fill="currentColor"
          />
          <path
            className={styles.button__iconArrow}
            d="M141.17 58.82l72 72v-5.66l-72 72c-1.57 1.56-1.57 4.09 0 5.65 1.56 1.56 4.09 1.56 5.65 0l72-72c1.56-1.57 1.56-4.1 0-5.66l-72-72c-1.57-1.57-4.1-1.57-5.66-.001 -1.57 1.56-1.57 4.09 0 5.65Z"
            fill="currentColor"
          />
        </svg>
      </span>
      {children}
    </Link>
  )
}
