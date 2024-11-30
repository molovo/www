import { Inter, Montserrat } from 'next/font/google'
import localFont from 'next/font/local'

// Website fonts
export const haveHeart = localFont({
  src: './fonts/Have Heart One.woff2',
  display: 'swap',
  variable: '--font-have-heart',
})

export const haveHeartSwash = localFont({
  src: './fonts/Have Heart Swash.woff2',
  display: 'swap',
  variable: '--font-have-heart-swash',
})

export const gauthier = localFont({
  src: [
    {
      path: './fonts/gauthier.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/gauthier-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/gauthier-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-gauthier',
})

export const gtAmerica = localFont({
  src: [
    {
      path: './fonts/GT-America-Standard-Light.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/GT-America-Standard-Light-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/GT-America-Extended-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/GT-America-Standard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-gt-america',
})

export const gtAmericaMono = localFont({
  src: './fonts/GT-America-Mono-Regular.woff2',
  display: 'swap',
  variable: '--font-gt-america-mono',
})

// Fonts for case studies
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
