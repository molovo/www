import { glob } from 'glob'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const clients =
    request.nextUrl?.searchParams?.get('clients')?.split(',') || []
  const files = await glob(`${process.cwd()}/content/studies/*/index.mdx`)

  let posts = await Promise.all(
    files
      .map((filename) => filename.match(/\/([^\/]+)\/index\.mdx$/)?.[1])
      .map(async (slug) => {
        if (clients.length > 0 && !clients.includes(slug as string)) {
          return undefined
        }

        const { metadata } = await import(`/content/studies/${slug}/index.mdx`)
        return { slug, metadata: { slug, ...metadata } }
      }),
  )

  return NextResponse.json(
    posts
      .filter((value) => value !== undefined)
      .filter((post) => !post?.metadata.draft)
      .sort((a, b) => (a?.metadata?.order < b?.metadata?.order ? -1 : 1)),
  )
}
