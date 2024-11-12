'use client'

import Image from 'next/image'
import { format } from 'date-fns'
import Link from 'next/link'
import useHeaderStyle from '@/hooks/use-header-style'
import ArticleType from '@/types/article'
import swash from '@/utils/swash'

interface Props {
  posts: ArticleType[]
}

const Listing = ({ posts }: Props) => {
  const setRef = useHeaderStyle('red')

  return (
    <section className="writing" ref={setRef}>
      <div className="writing__content">
        <ul className="writing__posts">
          {posts.map(
            ({
              slug,
              metadata: { title, image, tags, date, description, ...post },
            }) => (
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
                  <Link
                    href={`/writing/${slug}`}
                    className="writing__post-link"
                  >
                    <h2
                      className="writing__post-title"
                      dangerouslySetInnerHTML={{
                        __html: swash(title),
                      }}
                    />
                  </Link>
                </div>

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

                {description && (
                  <p className="writing__post-excerpt content">{description}</p>
                )}
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  )
}

export default Listing
