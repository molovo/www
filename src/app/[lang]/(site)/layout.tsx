import '@/stylesheets/main.sass'
import { PropsWithChildren } from 'react'
import Header from '@/components/header'
import Title from '@/components/title'
import WebmentionsHead from '@/components/webmentions-head'
import Accounts from '@/components/accounts'
import { getStudies } from '@/data/studies'
import SkipTo from '@/components/skip-to'
import { Metadata } from 'next'
import Script from 'next/script'
import { headers } from 'next/headers'

const Menu = dynamic(() => import('@/components/menu'), { ssr: false })
const Footer = dynamic(() => import('@/components/footer'), { ssr: false })
const Contact = dynamic(() => import('@/components/contact'), { ssr: false })

import {
  gauthier,
  gtAmerica,
  haveHeart,
  haveHeartSwash,
  gtAmericaMono,
} from '@/fonts'
import dynamic from 'next/dynamic'
import getHeaderStyleForSSR from '@/utils/get-header-style-for-ssr'

export const metadata: Metadata = {
  metadataBase: new URL('https://molovo.co/'),
}

export default async function RootLayout({ children }: PropsWithChildren<{}>) {
  const studies = await getStudies([
    'joonbyrd',
    'redistribute',
    'vixen-fitness',
  ])

  const pathname = headers().get('x-pathname') || '/'
  const { headerStyle, headerColor } = await getHeaderStyleForSSR(pathname)

  return (
    <html
      lang="en"
      className={`${gauthier.variable} ${gtAmerica.variable} ${haveHeart.variable} ${haveHeartSwash.variable} ${gtAmericaMono.variable}`}
    >
      <head>
        <Accounts />
        <WebmentionsHead />
        <Title />

        <Script
          strategy="afterInteractive"
          src="/umami.js"
          data-website-id="25028b38-846c-410b-8195-052b12d2e724"
        />
      </head>
      <body>
        <SkipTo />
        <Header defaultStyle={headerStyle} defaultColor={headerColor} />
        <Menu studies={studies} />
        <main id="content" className="main">
          {children}
        </main>
        <Footer />
        <Contact />

        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: `
          {
            "prerender": [{
              "where": {
                "href_matches": "/*"
              },
              "eagerness": "moderate"
            }]
          }
        `,
          }}
        />
      </body>
    </html>
  )
}