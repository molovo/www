import { NextRequest, NextResponse } from 'next/server'
import { getStudies } from './data'

export async function GET(request: NextRequest) {
  const clients =
    request.nextUrl?.searchParams?.get('clients')?.split(',') || []
  const posts = await getStudies(clients)

  return NextResponse.json(
    posts
      .filter((item) => item !== undefined)
      .filter((post) => !post?.draft)
      .sort((a, b) => ((a?.order || 999) < (b?.order || 999) ? -1 : 1)),
  )
}
