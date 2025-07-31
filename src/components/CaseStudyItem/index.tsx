'use client'

import Image from '@/components/image'
import Logo from '@/components/logo'
import Link from '@/components/link'
import useNavStateStore from '@/store/nav-state'
import { CSSProperties } from 'react'
import { Article } from 'schema-dts'
import Schema from '@/components/schema'
import CaseStudyType from '@/types/case-study'

import styles from './case-study-item.module.sass'

const CaseStudyItem = ({
  study: {
    draft: isDraft,
    slug,
    client,
    role,
    title,
    thumbnail,
    thumbnailContentBackground,
    styles: styleOverrides,
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
      className={`${styles.caseStudyItem} ${
        isDraft ? styles['caseStudyItem--draft'] : ''
      } ${className}`}
      style={style}
    >
      <Link
        href={`/studies/${slug}`}
        style={styleOverrides?.thumbnail}
        onClick={close}
        className={styles.caseStudyItem__link}
        {...(!visible ? { tabIndex: -1 } : {})}
      >
        <div className={styles.caseStudyItem__backgroundWrapper}>
          {thumbnail && (
            <figure className={styles.caseStudyItem__background}>
              <Image
                src={thumbnail}
                alt={client as string}
                style={{
                  ...styleOverrides?.thumbnailBackgroundImage,
                  ...imageStyle,
                }}
                sizes={imageSizes}
                loading={imageLoading}
                zoomable={false}
              />
            </figure>
          )}
        </div>

        <div className={styles.caseStudyItem__inner}>
          <Logo client={slug} />

          <div
            className={styles.caseStudyItem__content}
            style={styleOverrides?.thumbnailContent}
          >
            {thumbnailContentBackground && (
              <>
                <figure className={styles.caseStudyItem__contentBackground}>
                  <Image
                    src={thumbnailContentBackground}
                    alt={client as string}
                    style={styleOverrides?.thumbnailContentBackgroundImage}
                    sizes={imageSizes}
                    loading={imageLoading}
                    zoomable={false}
                  />
                </figure>
                <Logo client={slug} />
              </>
            )}

            <h2
              className={styles.caseStudyItem__title}
              style={styleOverrides?.thumbnailTitle}
            >
              <span className={styles.caseStudyItem__titleInner}>{title}</span>
            </h2>

            <div className={styles.caseStudyItem__meta}>
              <span className={styles.caseStudyItem__client}>{client}</span>
              <span className={styles.caseStudyItem__role}>{role}</span>
            </div>
          </div>
        </div>
      </Link>
      <Schema content={jsonLd} />
    </li>
  )
}

export default CaseStudyItem
