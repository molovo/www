'use client'

import { useEventListener } from '@superrb/react-addons/hooks'
import { useCallback, useEffect, useRef } from 'react'
import { useState } from 'reinspect'
import { useLiveNodeList } from 'live-node-list/hooks'
import CaseStudyCta from './case-study-cta'
import CaseStudyItem from './case-study-item'
import CaseStudyType from '@/types/case-study'
import CustomScrollbar from './custom-scrollbar'

const MenuCaseStudies = ({
  studies = [],
  visible = false,
}: {
  studies: CaseStudyType[]
  visible: boolean
}) => {
  const container = useRef<HTMLUListElement>(null)
  const scrollTimer = useRef<NodeJS.Timeout>(null)
  const [scrolling, setScrolling] = useState<boolean>(false, 'Scrolling')

  const studiesElements = useLiveNodeList(
    '.menu .case-study-item',
    container.current || undefined,
  )

  const handleScroll = useCallback(() => {
    if (scrollTimer.current) {
      clearTimeout(scrollTimer.current)
    }

    if (!container.current) {
      return
    }

    setScrolling(true)
    scrollTimer.current = setTimeout(() => {
      setScrolling(false)
    }, 100)

    const width = container.current?.clientWidth
    const x = container.current?.scrollLeft
    studiesElements?.forEach((item) => {
      item.removeAttribute('aria-current')
      const left = (item as HTMLElement).offsetLeft - x
      const pos = 5 - (left / width) * 20
      const image = item.querySelector('.case-study-item__background img') as
        | HTMLImageElement
        | undefined

      if (image) {
        image.style.transform = `translateX(${pos}%)`
      }
    })

    for (const child of studiesElements || []) {
      const { left } = child.getBoundingClientRect()
      if (left < 0) {
        continue
      }

      child.setAttribute('aria-current', 'true')
      break
    }
  }, [studiesElements])

  useEffect(() => {
    container.current?.scrollTo({ left: 0, behavior: 'smooth' })
    handleScroll()
  }, [visible, handleScroll])

  useEventListener('scroll', handleScroll, { passive: true }, container.current)

  return (
    <>
      <ul
        className={`menu__studies-list ${
          scrolling ? 'menu__studies-list--scrolling' : ''
        }`}
        ref={container}
        id="case-studies-list"
        {...(!visible ? { tabIndex: -1 } : {})}
      >
        {studies.map((study: CaseStudyType) => (
          <CaseStudyItem
            study={study}
            key={study.slug}
            className="menu__studies-item"
            visible={visible}
          />
        ))}

        <CaseStudyCta className="menu__studies-item" visible={visible} />
      </ul>

      <CustomScrollbar
        controls={container}
        className="menu__studies-scrollbar"
        {...(!visible ? { tabIndex: -1 } : {})}
      />
    </>
  )
}

export default MenuCaseStudies
