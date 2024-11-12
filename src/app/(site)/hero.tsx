'use client'

import SuperrbLink from '@/components/superrb-link'
import useHeaderStyle from '@/hooks/use-header-style'
import { HomepageSectionItem } from './homepage-section'
import CaseStudyItem from '@/components/case-study-item'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import CaseStudyType from '@/types/case-study'
import { getStudies } from '@/components/menu-case-studies'
import Hand from '@/components/images/icons/hand.svg'
import { useEventListener, useIsInViewport } from '@superrb/react-addons/hooks'
import CaseStudyCta from '@/components/case-study-cta'
import swash from '@/utils/swash'

const Hero = ({ items }: { items: string[] }) => {
  const [scrolled, setScrolled] = useState<boolean>(false)
  const setHeaderStyleRef = useHeaderStyle(scrolled ? 'white' : 'white-red')
  const [studies, setStudies] = useState<CaseStudyType[]>([])
  const [pos, setPos] = useState<number>(6)
  const containerRef =
    useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>
  const { isInViewport, setRef: setIsInViewportRef } = useIsInViewport(false)

  const setRef = (ref: HTMLElement) => {
    setHeaderStyleRef(ref)
    setIsInViewportRef(ref)
  }

  useEffect(() => {
    ;(async () => {
      const studies = await getStudies()
      setStudies(
        studies
          .filter(({ slug }) => items.includes(slug))
          .sort((a, b) => items.indexOf(a.slug) - items.indexOf(b.slug)),
      )
    })()
  }, [items])

  useEventListener('scroll', () => {
    const y = window.scrollY
    const height = containerRef.current.clientHeight - window.innerHeight

    setPos(Math.max(0, 6.5 - (y / height) * 6.5))
    setScrolled(y > 45)
  })

  if (!items || !studies) {
    return null
  }

  return (
    <section className="hero" ref={setRef}>
      <div className="hero__content">
        <div className="hero__content-inner">
          <h1 className="hero__title">
            Hi, I&apos;m James.
            <br />
            <span
              dangerouslySetInnerHTML={{
                __html: swash('_I make websites_.', 'M'),
              }}
            />
          </h1>

          <div className="hero__text">
            <p>
              I&apos;m currently leading the talented dev team at{' '}
              <SuperrbLink /> where I build awesome websites and interactive
              experiences like these <Hand />
            </p>
          </div>
        </div>
      </div>

      <div className="hero__detail" ref={containerRef}>
        <div className="hero__studies">
          {studies.map((study, i) => (
            <CaseStudyItem
              key={study.client}
              study={study}
              style={
                i % 2 === 1 ? { transform: `translate3d(0, ${pos}em, 0)` } : {}
              }
            />
          ))}

          <CaseStudyCta style={{ transform: `translate3d(0, ${pos}em, 0)` }} />
        </div>
      </div>
    </section>
  )
}

export default Hero
