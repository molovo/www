import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

export const inter = Inter({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

export const nitti = localFont({
  src: '../../fonts/Nitti Grotesk Light.otf',
  display: 'swap',
})
