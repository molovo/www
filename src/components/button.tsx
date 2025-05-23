import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react'
import Link from './link'

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
    <Link className={`button ${className}`} {...props}>
      {icon && (
        <span className="button__icon button__icon--primary">{icon}</span>
      )}
      <span className="button__icon">
        <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
          <path
            className="button__icon-line"
            d="M40 132h176c2.2 0 4-1.8 4-4 0-2.21-1.8-4-4-4H40c-2.21 0-4 1.79-4 4 0 2.2 1.79 4 4 4Z"
            fill="currentColor"
          />
          <path
            className="button__icon-arrow"
            d="M141.17 58.82l72 72v-5.66l-72 72c-1.57 1.56-1.57 4.09 0 5.65 1.56 1.56 4.09 1.56 5.65 0l72-72c1.56-1.57 1.56-4.1 0-5.66l-72-72c-1.57-1.57-4.1-1.57-5.66-.001 -1.57 1.56-1.57 4.09 0 5.65Z"
            fill="currentColor"
          />
        </svg>
      </span>
      {children}
    </Link>
  )
}
