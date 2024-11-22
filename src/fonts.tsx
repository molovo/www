import { Inter, Montserrat } from 'next/font/google'
import localFont from 'next/font/local'

export const inter = Inter({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
})

export const nitti = localFont({
  src: './fonts/Nitti Grotesk Light.otf',
  display: 'swap',
})

export const haveHeart = localFont({
  src: './fonts/Have Heart One.woff2',
  display: 'swap',
})
