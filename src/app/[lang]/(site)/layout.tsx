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
import Script from 'next/script'
import { headers } from 'next/headers'

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

  const pathname = headers().get('x-pathname') || '/'

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
          src="/umami.js"
          data-website-id="25028b38-846c-410b-8195-052b12d2e724"
        />
      </head>
      <body>
        <SkipTo />
        <Header defaultStyle={pathname === '/' ? 'white' : 'white'} />
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
