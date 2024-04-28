'use client'

import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group'

const Main = ({ children }: PropsWithChildren<{}>) => {
  const location = usePathname()

  return (
    <>
      <TransitionGroup className="transition-group">
        <CSSTransition key={location} classNames="fade" timeout={500}>
          <main className="main">{children}</main>
        </CSSTransition>
      </TransitionGroup>
    </>
  )
}

export default Main
