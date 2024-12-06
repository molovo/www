import Accounts from '@/components/accounts'
import SkipTo from '@/components/skip-to'
import Title from '@/components/title'
import WebmentionsHead from '@/components/webmentions-head'
import { Metadata } from 'next'
import { gauthier, gtAmerica, haveHeart, haveHeartSwash } from '@/fonts'

export const metadata: Metadata = {
  title: {
    default: 'molovo. Design, Development, Branding',
    template: '%s | molovo. Design, Development, Branding',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${gauthier.variable} ${gtAmerica.variable} ${haveHeart.variable} ${haveHeartSwash.variable}`}
    >
      <head>
        <Accounts />
        <WebmentionsHead />
        <Title />
      </head>
      <body>
        <SkipTo />
        {children}
      </body>
    </html>
  )
}
