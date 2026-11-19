import { cacheLife } from 'next/cache'
import { CSSProperties } from 'react'

const getWords = (sourceWords: string[], count: number) => {
  return [...sourceWords]
    .sort(() => 0.5 - Math.random())
    .slice(0, count)
    .join(' ')
}

// Cached so the shuffle runs once at build time
const TypeSample = async ({
  fontName,
  fontClass,
  sourceWords = [],
  style = {},
}: {
  fontName: string
  fontClass: string
  sourceWords: string[]
  style: Partial<CSSProperties>
}) => {
  'use cache'
  cacheLife('max')

  return (
    <figure className={`type-sample ${fontClass}`}>
      <div className="type-sample__wrapper" style={style}>
        <span className="type-sample__line" aria-hidden="true">{getWords(sourceWords, 8)}</span>
        <span
          className="type-sample__font-name"
          data-content-before={getWords(sourceWords, 4)}
          data-content-after={getWords(sourceWords, 4)}
        >
          {fontName}
        </span>
        <span className="type-sample__line" aria-hidden="true">{getWords(sourceWords, 8)}</span>
      </div>
    </figure>
  )
}

export default TypeSample
