'use client'

import Image from 'next/image'
import { format } from 'date-fns'
import Link from '@/components/link'
import useHeaderStyle from '@/hooks/use-header-style'
import ArticleType from '@/types/article'
import swash from '@/utils/swash'
import { Article as ArticleSchema } from 'schema-dts'
import Schema from '@/components/schema'

interface Props {
  posts: ArticleType[]
}

const Listing = ({ posts }: Props) => {
  const setRef = useHeaderStyle('red')

  return (
    <ul className="writing__posts" ref={setRef}>
      {posts.map(
        ({
          slug,
          metadata: { title, image, tags, date, description, ...post },
        }) => {
          const jsonLd: ArticleSchema = {
            '@type': 'Article',
            headline: title,
            name: title,
            datePublished: new Date(date).toUTCString(),
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://molovo.co/writing/${slug}`,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Molovo',
              sameAs: 'https://molovo.co',
            },
            author: {
              '@type': 'Person',
              name: 'James Dinsdale',
              sameAs: 'https://molovo.co',
            },
            url: `https://molovo.co/studies/${slug}`,
            image: `https://molovo.co/api/content/studies/${slug}/og-image.jpg`,
          }

          return (
            <li key={slug} className="writing__post">
              <div className="writing__post-header">
                {image ? (
                  <div className="writing__post-image">
                    <Image
                      src={image}
                      width="144"
                      height="96"
                      alt={title}
                      className="writing__post-image-img"
                    />
                  </div>
                ) : (
                  <div
                    className="writing__post-image-placeholder"
                    data-title={title.replace('_', '')}
                  />
                )}
                <Link href={`/writing/${slug}`} className="writing__post-link">
                  <h2
                    className="writing__post-title"
                    dangerouslySetInnerHTML={{
                      __html: swash(title),
                    }}
                  />
                </Link>

                <div className="writing__post-meta">
                  <time className="writing__post-date" dateTime={date}>
                    {format(new Date(date), 'do MMMM yyyy')}
                  </time>

                  <ul className="writing__post-tags">
                    {tags?.map((tag: string) => (
                      <li key={tag} className="writing__post-tag">
                        <Link href={`/writing/tag/${tag}`}>{tag}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {description && (
                <p className="writing__post-excerpt content">{description}</p>
              )}

              <Schema content={jsonLd} />
            </li>
          )
        },
      )}
    </ul>
  )
}

export default Listing
