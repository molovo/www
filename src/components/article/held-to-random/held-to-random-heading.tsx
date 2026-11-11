'use client'

import { CSSProperties } from 'react'
import Image from '@/components/image'
import useHeaderStyle from '@/hooks/use-header-style'
import { cinema, gtAmericaExtendedBlack } from '@/fonts/articles/held-to-random'
import skull from '@/images/articles/held-to-random/skull.png'
import ransomNote from './ransom-note'
import title from './title'

const note = ransomNote(title)

const HeldToRandomHeading = () => {
  const setRef = useHeaderStyle('white-red')

  return (
    <div
      className={`held-to-random-heading ${cinema.variable} ${gtAmericaExtendedBlack.variable}`}
      ref={setRef}
    >
      <div
        className="held-to-random-heading__skull"
        aria-hidden="true"
        style={{ '--skull': `url(${skull.src})` } as CSSProperties}
      >
        <Image
          src={skull}
          alt=""
          sizes="40rem"
          className="held-to-random-heading__skull-image"
          loading="eager"
          unoptimized
        />
        <span className="held-to-random-heading__skull-ghost" />
      </div>

      <h1 className="held-to-random-heading__title">
        <span className="held-to-random-heading__label">{title}</span>
        <span className="held-to-random-heading__note" aria-hidden="true">
          {note.map((line, l) => (
            <span key={l} className="held-to-random-heading__line">
              {line.map((word, w) => (
                <span key={w} className="held-to-random-heading__word">
                  {word.map(
                    (
                      { char, font, paper, rotate, shift, scale, clip, delay },
                      c,
                    ) => (
                      <span
                        key={c}
                        className="held-to-random-heading__cutting"
                        style={
                          {
                            '--rotate': `${rotate}deg`,
                            '--shift': `${shift}em`,
                            '--scale': scale,
                            '--delay': `${delay}ms`,
                          } as CSSProperties
                        }
                      >
                        <span
                          className="held-to-random-heading__paper"
                          data-paper={paper}
                          data-font={font}
                          style={{ clipPath: clip }}
                        >
                          {char}
                        </span>
                      </span>
                    ),
                  )}
                </span>
              ))}
            </span>
          ))}
        </span>
      </h1>
    </div>
  )
}

export default HeldToRandomHeading
