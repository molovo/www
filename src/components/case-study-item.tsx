'use client'

import Image from 'next/image'
import Logo from './logo'
import Link from '@/components/link'
import useNavStateStore from '@/store/nav-state'
import { CSSProperties } from 'react'

type CaseStudy = { [key: string]: any }

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
  visible = true,
}: {
  study: CaseStudy
  className?: string
  style?: Partial<CSSProperties>
  visible?: boolean
}) => {
  const { close } = useNavStateStore()

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
                style={styles?.thumbnailBackgroundImage}
                sizes="56.25vh"
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
              <figure className="case-study-item__content-background">
                <Image
                  src={thumbnailContentBackground}
                  alt={client as string}
                  style={styles?.thumbnailContentBackgroundImage}
                  sizes="56.25vh"
                />
              </figure>
            )}
            <Logo client={slug} />

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
    </li>
  )
}

export default CaseStudyItem
