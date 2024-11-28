'use client'

import { useEventListener } from '@superrb/react-addons/hooks'
import { MutableRefObject, useCallback, useEffect, useRef } from 'react'
import { useState } from 'reinspect'
import { useLiveNodeList } from 'live-node-list/hooks'
import CaseStudyCta from './case-study-cta'
import CaseStudyItem from './case-study-item'
import CaseStudyType from '@/types/case-study'

const MenuCaseStudies = ({
  studies = [],
  visible = false,
}: {
  studies: CaseStudyType[]
  visible: boolean
}) => {
  const container =
    useRef<HTMLUListElement>() as MutableRefObject<HTMLUListElement>
  const [scrolling, setScrolling] = useState<boolean>(false, 'Scrolling')
  const scrollTimer =
    useRef<NodeJS.Timeout>() as MutableRefObject<NodeJS.Timeout>
  const progress =
    useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>
  const [dragging, setDragging] = useState<boolean>(false, 'Dragging')

  const studiesElements = useLiveNodeList(
    '.menu .case-study-item',
    container.current,
  )

  const handleScroll = useCallback(() => {
    clearTimeout(scrollTimer.current)

    if (!container.current) {
      return
    }

    setScrolling(true)
    scrollTimer.current = setTimeout(() => {
      setScrolling(false)
    }, 100)

    if (!dragging) {
      const progressInput = progress.current
      if (progressInput) {
        progressInput.value = `${
          (container.current?.scrollLeft /
            (container.current?.scrollWidth - container.current?.clientWidth)) *
          100
        }`
      }
    }

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
  }, [dragging, studiesElements])

  useEffect(() => {
    container.current?.scrollTo({ left: 0, behavior: 'smooth' })
    handleScroll()
  }, [visible, handleScroll])

  useEventListener('scroll', handleScroll, { passive: true }, container.current)

  useEventListener(
    'pointerdown',
    () => setDragging(true),
    undefined,
    progress.current,
  )

  useEventListener(
    'pointerup',
    () => setDragging(false),
    undefined,
    progress.current,
  )

  const handleInput = () => {
    const value = parseFloat(progress.current?.value)
    if (value) {
      container.current.scrollTo({
        left:
          (value / 100) *
          (container.current?.scrollWidth - container.current?.clientWidth),
      })
    }
  }

  useEventListener('input', handleInput, undefined, progress.current)

  const sliderWidth = `${
    (container.current?.clientWidth / container.current?.scrollWidth) * 100
  }%`

  return (
    <>
      <ul
        className={`menu__studies-list ${
          scrolling ? 'menu__studies-list--scrolling' : ''
        }`}
        ref={container}
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

      <style>
        {`
          .menu__studies-progress::-webkit-slider-thumb {
            width: ${sliderWidth};
          }
          .menu__studies-progress::-moz-range-thumb {
            width: ${sliderWidth};
          }
          .menu__studies-progress::-ms-thumb{
            width: ${sliderWidth};
          }
        `}
      </style>
      <input
        type="range"
        className="menu__studies-progress"
        ref={progress}
        role="none"
        {...(!visible ? { tabIndex: -1 } : {})}
      />
    </>
  )
}

export default MenuCaseStudies
