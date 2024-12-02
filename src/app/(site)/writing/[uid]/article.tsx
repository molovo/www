'use client'

import useHeaderStyle from '@/hooks/use-header-style'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import swash from '@/utils/swash'
import SocialSharing from '@/components/social-sharing'
import { ArticleMetadataType } from '@/types/article'
import { CSSProperties, ReactNode } from 'react'
import LineBreak from '@/components/line-break'

const Webmentions = dynamic(() => import('@/components/webmentions'), {
  ssr: true,
  loading: () => (
    <>
      <LineBreak />
      <aside className="mentions">
        <p>Loading webmentions&hellip;</p>
      </aside>
    </>
  ),
})

interface Props {
  content: ReactNode
  metadata: ArticleMetadataType
  uid: string
}

const Article = ({ content, metadata, uid }: Props) => {
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
              alt={metadata.imageAlt as string}
              sizes={metadata.imageSizes || '(min-width: 64em) 64em, 100vw'}
              className="article__image"
              style={metadata.styles?.image as Partial<CSSProperties>}
              loading="eager"
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

        <div className="content">
          <SocialSharing />
          <div className="content__inner">{content}</div>
        </div>
      </div>

      <Webmentions slug={uid as string} />
    </article>
  )
}

export default Article
