'use client'

import { ViewTransitions } from 'next-view-transitions'
import { PropsWithChildren } from 'react'

const Main = ({ children }: PropsWithChildren) => (
  <ViewTransitions>
    <main className="main" id="content">{children}</main>
  </ViewTransitions>
)

export default Main
