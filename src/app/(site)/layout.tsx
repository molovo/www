import '@/stylesheets/main.sass'
import { PropsWithChildren } from 'react'
import Header from '@/components/header'
import { getStudies } from '@/data/studies'
import { Metadata } from 'next'
import Script from 'next/script'
import { cacheLife } from 'next/cache'
import Main from '@/components/main'
import Menu from '@/components/menu'
import Footer from '@/components/footer'
import Contact from '@/components/contact'

export const ensureStatic = 'navigation'

const getYear = async () => {
  'use cache'
  cacheLife('max')

  return new Date().getFullYear()
}

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

export default async function RootLayout({ children }: PropsWithChildren) {
  const studies = await getStudies([
    'joonbyrd',
    'redistribute',
    'vixen-fitness',
  ])

  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            strategy="afterInteractive"
            src="/umami.js"
            data-website-id="25028b38-846c-410b-8195-052b12d2e724"
            data-domains="molovo.co"
          />
          <Script
            defer
            src="https://usenightingale.dev/measure.js"
            data-ntgl-id="9ec30ca3-9a19-478f-b21f-5102c0f5f8d2"
          />
        </>
      )}

      <Header />
      <Menu studies={studies} />
      <Main>{children}</Main>
      <Footer year={await getYear()} />
      <Contact />
    </>
  )
}
