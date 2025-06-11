'use client'

import useHeaderStyle from '@/hooks/use-header-style'
import Image from '@/components/image'
import swash from '@/utils/swash'
import ArticleType from '@/types/article'
import { CSSProperties, ReactNode } from 'react'
import { StaticImageData } from 'next/dist/shared/lib/get-img-props'

interface Props {
  post: ArticleType
  webmentions?: ReactNode
  socialSharing?: ReactNode
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
    HeaderComponent,
    headerStyle = 'red',
    headerColor,
    contentHeaderStyle = headerStyle,
    contentHeaderColor = headerColor,
    styles,
  },
  webmentions,
  socialSharing,
}: Props) => {
  const setRef = useHeaderStyle(headerStyle, headerColor)
  const setContentRef = useHeaderStyle(contentHeaderStyle, contentHeaderColor)

  return (
    <article
      className={`article article--${slug}`}
      ref={setRef}
      style={styles?.main}
    >
      <div className="article__content">
        <header className="article__header">
          {HeaderComponent ? (
            <HeaderComponent />
          ) : (
            <>
              {image && (
                <Image
                  src={image as string | StaticImageData}
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
            </>
          )}
        </header>

        <div className="content" ref={setContentRef}>
          {socialSharing}
          <div className="content__inner">{content}</div>
        </div>
      </div>

      {webmentions}
    </article>
  )
}

export default Article
