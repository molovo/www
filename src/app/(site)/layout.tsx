import '@/stylesheets/main.sass'
import { PropsWithChildren } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Menu from '@/components/menu'
import Contact from '@/components/contact'
import Title from '@/components/title'
import WebmentionsHead from '@/components/webmentions-head'
import Accounts from '@/components/accounts'
import { getStudies } from '@/data/studies'
import SkipTo from '@/components/skip-to'
import { Metadata } from 'next'

import {
  gauthier,
  gtAmerica,
  haveHeart,
  haveHeartSwash,
  gtAmericaMono,
} from '@/fonts'

export const metadata: Metadata = {
  metadataBase: new URL('https://molovo.co/'),
}

export default async function RootLayout({ children }: PropsWithChildren<{}>) {
  const studies = await getStudies([
    'joonbyrd',
    'redistribute',
    'vixen-fitness',
  ])

  return (
    <html
      lang="en"
      className={`${gauthier.variable} ${gtAmerica.variable} ${haveHeart.variable} ${haveHeartSwash.variable} ${gtAmericaMono.variable}`}
    >
      <head>
        <Accounts />
        <WebmentionsHead />
        <Title />
      </head>
      <body>
        <SkipTo />
        <Header />
        <Menu studies={studies} />
        <main id="content" className="main">
          {children}
        </main>
        <Footer />
        <Contact />
      </body>
    </html>
  )
}
