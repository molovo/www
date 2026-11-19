import { cacheLife } from 'next/cache'
import Feed, { Post } from './feed'
import { feedUrl } from './feed-url'

const getFirstPage = async (): Promise<{
  feed: { post: Post }[]
  cursor: string | null
}> => {
  'use cache'
  cacheLife('minutes')

  try {
    const response = await fetch(feedUrl())
    const { feed, cursor } = await response.json()

    return { feed: feed ?? [], cursor: cursor ?? null }
  } catch (error) {
    console.error(error)
    return { feed: [], cursor: null }
  }
}

export default async function Page() {
  const { feed, cursor } = await getFirstPage()

  return <Feed initialFeed={feed} cursor={cursor} />
}
