import '@/stylesheets/main.sass'
import { PropsWithChildren } from 'react'
import Header from '@/components/header'
import { getStudies } from '@/data/studies'
import { Metadata } from 'next'
import Script from 'next/script'
import { headers } from 'next/headers'
import { ClientSlug } from '@/components/client-logo'

import getHeaderStyleForSSR from '@/utils/get-header-style-for-ssr'
import getClientForSSR from '@/utils/get-client-for-ssr'
import Menu from '@/components/menu'
import Footer from '@/components/footer'
import Contact from '@/components/contact'

export const metadata: Metadata = {
  metadataBase: new URL('https://molovo.co/'),
  title: {
    default: 'molovo. Design, Development, Branding',
    template: '%s | molovo. Design, Development, Branding',
  },
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
    <>
      <Script
        strategy="afterInteractive"
        src="/umami.js"
        data-website-id="25028b38-846c-410b-8195-052b12d2e724"
        data-domains="molovo.co"
      />

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
    </>
  )
}
