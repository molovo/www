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
import { ClientSlug } from '@/components/client-logo'

import {
  gauthier,
  gtAmerica,
  haveHeart,
  haveHeartSwash,
  gtAmericaMono,
} from '@/fonts'
import getHeaderStyleForSSR from '@/utils/get-header-style-for-ssr'
import getClientForSSR from '@/utils/get-client-for-ssr'
import Menu from '@/components/menu'
import Footer from '@/components/footer'
import Contact from '@/components/contact'

export const metadata: Metadata = {
  metadataBase: new URL('https://molovo.co/'),
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}

export default async function RootLayout({ children }: PropsWithChildren<{}>) {
  const studies = await getStudies([
    'joonbyrd',
    'redistribute',
    'vixen-fitness',
  ])

  const pathname = headers().get('x-pathname') || '/'
  const { headerStyle, headerColor } = await getHeaderStyleForSSR(pathname)
  const client = await getClientForSSR(pathname)

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
          data-domains="molovo.co"
        />
      </head>
      <body>
        <SkipTo />
        <Header
          defaultStyle={headerStyle}
          defaultColor={headerColor}
          defaultClient={client as ClientSlug | undefined}
        />
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
