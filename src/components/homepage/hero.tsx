'use client'

import SuperrbLink from '@/components/superrb-link'
import useHeaderStyle from '@/hooks/use-header-style'
import CaseStudyItem from '@/components/case-study-item'
import { useCallback, useEffect, useRef, useState } from 'react'
import CaseStudyType from '@/types/case-study'
import hand from '@/images/icons/hand.png'
import {
  useEventListener,
  useIsInViewport,
} from '@superrb/react-addons/hooks'
import CaseStudyCta from '@/components/case-study-cta'
import swash from '@/utils/swash'
import { useLiveNodeList } from 'live-node-list/hooks'
import Image from '@/components/image'

const Hero = ({
  title,
  studies,
}: {
  title: string
  studies: CaseStudyType[]
}) => {
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isClient, setIsClient] = useState<boolean>(false)
  const setHeaderStyleRef = useHeaderStyle(
    isMobile || scrolled ? 'white' : 'white-red',
  )
  const [pos, setPos] = useState<number>(6)
  const container = useRef<HTMLDivElement>(null)
  const { isInViewport, setRef: setIsInViewportRef } = useIsInViewport(false)

  const setRef = (ref: HTMLElement) => {
    setHeaderStyleRef(ref)
    setIsInViewportRef(ref)
  }

  const studiesElements = useLiveNodeList(
    '.hero .case-study-item',
    container.current || undefined,
  )

  const handleScroll = useCallback(() => {
    if (!container.current) {
      return
    }

    if (!isMobile) {
      const y = window.scrollY - container.current.offsetTop
      const height = container.current.clientHeight
      const scrollHeight = window.innerHeight

      setPos(Math.max(0, 6 - (y / (scrollHeight / 1.5)) * 6))
      setScrolled(y > 45)

      studiesElements?.forEach((item) => {
        item.removeAttribute('aria-current')
        const top = (item as HTMLElement).offsetTop - y
        const pos = 5 - (top / height) * 20
        const image = item.querySelector('.case-study-item__background img') as
          | HTMLImageElement
          | undefined

        if (image) {
          image.style.transform = `translateY(${pos}%)`
        }
      })
    }
  }, [isMobile, studiesElements])

  useEventListener(
    'scroll',
    handleScroll,
    { passive: true },
    undefined,
    isInViewport && !isMobile,
  )

  useEffect(() => {
    setIsClient(true)
    const mediaQuery = window.matchMedia('(max-width: 64em)')
    setIsMobile(mediaQuery.matches)

    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    mediaQuery.addEventListener('change', handleResize)
    return () => mediaQuery.removeEventListener('change', handleResize)
  }, [])

  useEffect(() => {
    if (isClient) {
      handleScroll()
    }
  }, [isClient, handleScroll])

  if (!studies) {
    return null
  }

  return (
    <section className="hero" ref={setRef}>
      <div className="hero__content">
        <div className="hero__content-inner">
          <h1
            className="hero__title"
            dangerouslySetInnerHTML={{
              __html: swash(title, 'M'),
            }}
          />

          <div className="hero__text">
            <p>
              Iʼm currently leading the talented dev team at <SuperrbLink />{' '}
              where I build awesome websites and interactive experiences like
              these{' '}
              <Image
                src={hand}
                alt=""
                sizes="2.7em"
                loading="eager"
                zoomable={false}
              />
            </p>
          </div>
        </div>
      </div>

      <div className="hero__detail" ref={container}>
        <ul className="hero__studies">
          {studies.map((study, i) => (
            <CaseStudyItem
              key={study.client}
              study={study}
              style={
                !isMobile && i % 2 === 1
                  ? { transform: `translate3d(0, ${pos}em, 0)` }
                  : {}
              }
              imageStyle={{ transform: `translateY(4.51294%)` }}
              imageSizes="(min-width: 64em) 25vw, 50vw"
              imageLoading={isMobile ? 'lazy' : 'eager'}
            />
          ))}

          <CaseStudyCta
            style={
              !isMobile ? { transform: `translate3d(0, ${pos}em, 0)` } : {}
            }
          />
        </ul>
      </div>
    </section>
  )
}

export default Hero
