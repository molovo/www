'use client'

import useHeaderStyle from '@/hooks/use-header-style'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import swash from '@/utils/swash'
import ArticleType from '@/types/article'
import { CSSProperties } from 'react'
import LineBreak from '@/components/line-break'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

const Webmentions = dynamic(() => import('@/components/webmentions'), {
  ssr: false,
  loading: () => (
    <>
      <LineBreak />
      <aside className="mentions">
        <p>Loading webmentions&hellip;</p>
      </aside>
    </>
  ),
})

const SocialSharing = dynamic(() => import('@/components/social-sharing'), {
  loading: () => null,
  ssr: false,
})

interface Props {
  post: ArticleType
}

const Article = ({
  post: {
    slug,
    content,
    title,
    titleSwashCharacter,
    image,
    imageAlt,
    imageSizes,
    headerStyle,
    headerColor,
    styles,
  },
}: Props) => {
  const setRef = useHeaderStyle(headerStyle || 'red', headerColor)

  return (
    <article
      className={`article article--${slug}`}
      ref={setRef}
      style={styles?.main}
    >
      <div className="article__content">
        <header className="article__header">
          {image && (
            <Image
              src={image as string | StaticImport}
              alt={imageAlt as string}
              sizes={imageSizes || '(min-width: 64em) 64em, 100vw'}
              className="article__image"
              style={styles?.image as Partial<CSSProperties>}
              loading="eager"
            />
          )}
          <h1
            className="article__title"
            style={styles?.title}
            dangerouslySetInnerHTML={{
              __html: swash(title, titleSwashCharacter, styles?.titleSwash),
            }}
          />
        </header>

        <div className="content">
          <SocialSharing />
          <div className="content__inner">{content}</div>
        </div>
      </div>

      <Webmentions slug={slug as string} />
    </article>
  )
}

export default Article
