import '@/stylesheets/main.sass'
import type { Metadata, Viewport } from 'next'
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

export const metadata: Metadata = {
  description: 'Generated by create next app',
  keywords: 'design, development, branding',
}

export default async function RootLayout({ children }: PropsWithChildren<{}>) {
  const studies = await getStudies([
    'joonbyrd',
    'redistribute',
    // 'superrb',
    // 'retainer-club',
    // 'anglepoise',
    'vixen-fitness',
    // 'haresfoot',
  ])

  return (
    <html lang="en">
      <head>
        <Accounts />
        <WebmentionsHead />
        <Title />
      </head>
      <body>
        <SkipTo />
        <Header />
        <Menu studies={studies} />
        {/* <Main>{children}</Main> */}
        <main id="content" className="main">
          {children}
        </main>
        <Footer />
        <Contact />
        {/*<CookieBanner
          title="Yum, cookies."
          text="We use cookies to improve your experience on our site."
        />*/}
      </body>
    </html>
  )
}