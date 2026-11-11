import localFont from 'next/font/local'

// Extra cut-out faces for the ransom-note title. Both files already ship
// with the site (GT America is licensed site-wide; Cinema is used by
// Perpetually Online). Everything else comes from the global font variables.
export const gtAmericaExtendedBlack = localFont({
  src: '../GT-America-Extended-Black.woff2',
  weight: '900',
  display: 'swap',
  variable: '--font-htr-extended-black',
})

export const cinema = localFont({
  src: '../Cinema.woff2',
  display: 'swap',
  variable: '--font-htr-cinema',
})
