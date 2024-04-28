'use client'

import useHeaderStyle from '@/hooks/use-header-style'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import swash from '@/utils/swash'

const Webmentions = dynamic(() => import('@/components/webmentions'), {
  ssr: true,
  loading: () => <p>Loading</p>,
})

const Article = ({ content, metadata, uid }) => {
  const setRef = useHeaderStyle(
    metadata.headerStyle || 'red',
    metadata.headerColor,
  )

  return (
    <article
      className={`article article--${uid}`}
      ref={setRef}
      style={metadata.styles?.main}
    >
      <div className="article__content">
        <header className="article__header">
          {metadata.image && (
            <Image
              src={metadata.image}
              alt={metadata.title}
              className="article__image"
              style={metadata.styles?.image}
            />
          )}
          <h1
            className="article__title"
            style={metadata.styles?.title}
            dangerouslySetInnerHTML={{
              __html: swash(
                metadata.title,
                metadata.titleSwashCharacter,
                metadata.styles?.titleSwash,
              ),
            }}
          />
        </header>

        <div className="content">{content}</div>
      </div>

      <Webmentions slug={uid as string} />
    </article>
  )
}

export default Article
