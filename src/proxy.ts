import { NextRequest, NextResponse } from 'next/server'
export async function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  const init = {
    request: {
      headers: requestHeaders,
    },
  }

  return NextResponse.next(init)
}

export const config = {
  // Don’t change the URL of Next.js assets starting with _next
  matcher: [
    // '/((?!api|_next/static|_next/image|images/studies|monitoring|instrumentation|umami.js|icon.png|icon.svg|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
