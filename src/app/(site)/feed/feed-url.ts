export const feedUrl = (cursor?: string) => {
  const url = new URL(
    'https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed',
  )
  url.searchParams.append('actor', 'did:plc:z3dnlcxaxn42c3ka23rhjzp7')
  url.searchParams.append('filter', 'posts_and_author_threads')
  url.searchParams.append('limit', '30')

  if (cursor) {
    url.searchParams.append('cursor', cursor)
  }

  return url
}
