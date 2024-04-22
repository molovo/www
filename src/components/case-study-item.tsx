'use client'

import Image from 'next/image'
import Logo from './logo'
import Link from 'next/link'
import useNavStateStore from '@/store/nav-state'

type CaseStudy = { [key: string]: any }

const CaseStudyItem = ({
  study: { slug, client, role, title, thumbnail, styles },
  className,
}: {
  study: CaseStudy
  className?: string
}) => {
  const { close } = useNavStateStore()

  return (
    <Link
      href={`/studies/${slug}`}
      className={`case-study-item ${className}`}
      style={styles?.thumbnail}
      onClick={close}
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
          <Logo client={slug} />

          <h2 className="case-study-item__title" style={styles?.thumbnailTitle}>
            {title}
          </h2>
          <span className="case-study-item__client">{client}</span>
          <span className="case-study-item__role">{role}</span>
        </div>
      </div>
    </Link>
  )
}

export default CaseStudyItem
