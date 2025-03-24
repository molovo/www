import { NextRequest, NextResponse } from 'next/server'
export async function middleware(request: NextRequest) {
  const locales = ['en']
  const defaultLocale = 'en'

  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl

  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  const init = {
    request: {
      headers: requestHeaders,
    },
  }

  // Redirect to default locale if there is no supported locale prefix
  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url),
      init,
    )
  }

  return NextResponse.next(init)
}

export const config = {
  // Don’t change the URL of Next.js assets starting with _next
  matcher: [
    '/((?!api|_next/static|_next/image|images/studies|monitoring|instrumentation|umami.js|icon.png|icon.svg|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
