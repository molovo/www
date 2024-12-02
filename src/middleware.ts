import { NextRequest, NextResponse } from 'next/server'
export async function middleware(request: NextRequest) {
  const locales = ['en']
  const defaultLocale = 'en'

  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/api/') || pathname === '/umami.js') {
    return NextResponse.next()
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  // Redirect to default locale if there is no supported locale prefix
  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url),
    )
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  // Don’t change the URL of Next.js assets starting with _next
  matcher: ['/((?!_next).*)'],
}
