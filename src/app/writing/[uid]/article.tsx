'use client'

import useHeaderStyle from '@/hooks/use-header-style'
import Image from 'next/image'

const Article = ({ content, metadata, uid }) => {
  const setRef = useHeaderStyle(metadata.headerStyle || 'red')

  return (
    <main className={`article article--${uid}`} ref={setRef}>
      <article className="article__content">
        <header className="article__header">
          {metadata.image && (
            <Image
              src={metadata.image}
              alt={metadata.title}
              className="article__image"
              style={metadata.styles?.image}
            />
          )}
          <h1 className="article__title" style={metadata.styles?.title}>
            {metadata.title}
          </h1>
        </header>

        <div className="content">{content}</div>
      </article>
    </main>
  )
}

export default Article
