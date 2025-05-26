'use client'

import {
  AppBskyEmbedExternal,
  AppBskyEmbedImages,
  RichText,
} from '@atproto/api'
import Image from '@/components/image'
import ContentVideo from '@/components/content-video'
import { PostView } from '@atproto/api/dist/client/types/app/bsky/feed/defs'
import Repost from '@/components/images/icons/repost.svg'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Link from '@/components/link'
import { useIsInViewport } from '@superrb/react-addons/hooks'
import { useEffect, useState } from 'react'
import { Record } from '@atproto/api/dist/client/types/app/bsky/feed/post'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-GB')

const DID = 'did:plc:z3dnlcxaxn42c3ka23rhjzp7'

enum Type {
  Images = 'app.bsky.embed.images',
  ImagesView = 'app.bsky.embed.images#view',
  Video = 'app.bsky.embed.video',
  VideoView = 'app.bsky.embed.video#view',
  External = 'app.bsky.embed.external',
  ExternalView = 'app.bsky.embed.external#view',
}

type Post = PostView & { record: Record }

const renderRichText = (rt: RichText) => {
  // rendering as markdown
  let html = ''
  for (const segment of rt.segments()) {
    if (segment.isLink()) {
      html += `<a href="${segment.link?.uri}" target="_blank" rel="noopener noreferrer">${segment.text}</a>`
    } else if (segment.isMention()) {
      html += `<a href="https://bsky.app/user/${segment.mention?.did}" target="_blank" rel="noopener noreferrer">${segment.text}</a>`
    } else if (segment.isTag()) {
      html += `<a href="https://bsky.app/tag/${segment.tag?.tag}" target="_blank" rel="noopener noreferrer">${segment.text}</a>`
    } else {
      html += segment.text
    }
  }

  return html
}

const getPostUrl = (post: Post) =>
  `https://bsky.app/profile/${post.author?.did}/post/${post.uri
    .split('/')
    .pop()}`

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

const url = new URL(
  'https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed',
)
url.searchParams.append('actor', DID)
url.searchParams.append('filter', 'posts_and_author_threads')
url.searchParams.append('limit', '30')

export default function Page() {
  const { isInViewport, setRef } = useIsInViewport()
  const [nextPost, setNextPost] = useState<string | null>(null)
  const [feed, setFeed] = useState<{ post: Post }[]>([])

  useEffect(() => {
    if (isInViewport) {
      url.searchParams.set('cursor', nextPost || '')
      fetch(url)
        .then((response) => response.json())
        .then(({ feed, cursor: nextPost }) => {
          setFeed((state) => [...state, ...feed])
          setNextPost(nextPost)
        })
    }
  }, [isInViewport, nextPost])

  return (
    <section className="feed">
      <ul className="feed__items">
        {feed.map(({ post }: { post: Post }) => {
          const rt = new RichText({
            text: post.record?.text,
            facets: post.record?.facets,
          })

          const date = new Date(post.record?.createdAt)

          return (
            <li key={post.cid} className="feed__item">
              <a href={getPostUrl(post)} className="feed__time">
                <time
                  dateTime={post.record?.createdAt}
                  title={`${date.toLocaleDateString(
                    'en-GB',
                    dateOptions,
                  )} at ${date.toLocaleTimeString('en-GB')}`}
                >
                  {timeAgo.format(date, 'round-minute')}
                </time>
              </a>

              {post.author?.handle !== 'molovo.co' && (
                <a
                  href={getPostUrl(post)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="feed__author"
                >
                  <Repost />
                  <span>@{post.author?.handle}</span>
                </a>
              )}

              <p
                className="feed__text"
                dangerouslySetInnerHTML={{ __html: renderRichText(rt) }}
              />

              {post.embed && (
                <div className="feed__embed">
                  {post.embed?.$type === Type.ImagesView && (
                    <>
                      {(post.embed?.images as AppBskyEmbedImages.Image[]).map(
                        ({
                          fullsize: image,
                          alt,
                          aspectRatio,
                        }: AppBskyEmbedImages.Image) => (
                          <Image
                            key={image as string}
                            src={image as string}
                            height={aspectRatio?.height}
                            width={aspectRatio?.width}
                            alt={alt}
                            sizes="32em"
                            className="feed__embed-image"
                          />
                        ),
                      )}
                    </>
                  )}

                  {post.embed?.$type === Type.VideoView && (
                    <>
                      <ContentVideo
                        url={post.embed?.playlist as string}
                        controls
                        width="100%"
                        height="100%"
                        className="feed__embed-video"
                      />
                    </>
                  )}

                  {post.embed?.$type === Type.ExternalView && (
                    <a
                      href={
                        (
                          post.embed
                            ?.external as AppBskyEmbedExternal.ViewExternal
                        )?.uri as string
                      }
                      className="feed__embed-link"
                    >
                      {(
                        post.embed
                          ?.external as AppBskyEmbedExternal.ViewExternal
                      )?.thumb && (
                        <Image
                          src={(
                        post.embed
                          ?.external as AppBskyEmbedExternal.ViewExternal
                      )?.thumb as string}
                          alt=""
                          width="1200"
                          height="630"
                          sizes="32em"
                          zoomable={false}
                          className="feed__embed-link-image"
                        />
                      )}
                      <div className="feed__embed-link-content">
                        <h5>{(
                        post.embed
                          ?.external as AppBskyEmbedExternal.ViewExternal
                      )?.title}</h5>
                        <p>{(
                        post.embed
                          ?.external as AppBskyEmbedExternal.ViewExternal
                      )?.description}</p>
                      </div>
                    </a>
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ul>

      {(feed.length === 0 || nextPost) && (
        <Link href={`/feed?cursor=${nextPost}`} ref={setRef}>
          Load more...
        </Link>
      )}
    </section>
  )
}
