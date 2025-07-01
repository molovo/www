'use client'

import Image from '@/components/image'
import Logo from './logo'
import Link from '@/components/link'
import useNavStateStore from '@/store/nav-state'
import { CSSProperties } from 'react'
import { Article } from 'schema-dts'
import Schema from './schema'
import CaseStudyType from '@/types/case-study'

const CaseStudyItem = ({
  study: {
    draft: isDraft,
    slug,
    client,
    role,
    title,
    thumbnail,
    thumbnailContentBackground,
    styles,
  },
  className,
  style = {},
  imageLoading = 'lazy',
  imageStyle = {},
  imageSizes = '56.25vh',
  visible = true,
}: {
  study: CaseStudyType
  className?: string
  style?: Partial<CSSProperties>
  imageStyle?: Partial<CSSProperties>
  imageSizes?: string
  imagePriority?: boolean
  visible?: boolean
  imageLoading?: 'eager' | 'lazy'
}) => {
  const { close } = useNavStateStore()

  const jsonLd: Article = {
    '@type': 'Article',
    headline: title,
    name: `${client} Case Study`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://molovo.co/studies/${slug}`,
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
    <li
      className={`case-study-item ${
        isDraft ? 'case-study-item--draft' : ''
      } ${className}`}
      style={style}
    >
      <Link
        href={`/studies/${slug}`}
        style={styles?.thumbnail}
        onClick={close}
        className="case-study-item__link"
        {...(!visible ? { tabIndex: -1 } : {})}
      >
        <div className="case-study-item__background-wrapper">
          {thumbnail && (
            <figure className="case-study-item__background">
              <Image
                src={thumbnail}
                alt={client as string}
                style={{
                  ...styles?.thumbnailBackgroundImage,
                  ...imageStyle,
                }}
                sizes={imageSizes}
                loading={imageLoading}
                zoomable={false}
              />
            </figure>
          )}
        </div>

        <div className="case-study-item__inner">
          <Logo client={slug} />

          <div
            className="case-study-item__content"
            style={styles?.thumbnailContent}
          >
            {thumbnailContentBackground && (
              <>
              <figure className="case-study-item__content-background">
                <Image
                  src={thumbnailContentBackground}
                  alt={client as string}
                  style={styles?.thumbnailContentBackgroundImage}
                  sizes={imageSizes}
                  loading={imageLoading}
                  zoomable={false}
                />
              </figure>
            <Logo client={slug} />
              </>
            )}

            <h2
              className="case-study-item__title"
              style={styles?.thumbnailTitle}
            >
              <span className="case-study-item__title-inner">{title}</span>
            </h2>

            <div className="case-study-item__meta">
              <span className="case-study-item__client">{client}</span>
              <span className="case-study-item__role">{role}</span>
            </div>
          </div>
        </div>
      </Link>
      <Schema content={jsonLd} />
    </li>
  )
}

export default CaseStudyItem
