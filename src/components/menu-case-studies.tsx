'use client'

import CaseStudy from '@/app/studies/[uid]/case-study'
import CaseStudyItem from '@/components/case-study-item'
import CaseStudy from '@/types/case-study'
import { useEventListener } from '@superrb/react-addons/hooks'
import { MutableRefObject, useEffect, useRef } from 'react'
import { useState } from 'reinspect'
import Logo from './logo'
import useContactFormStateStore from '@/store/contact-form-state'
import useNavStateStore from '@/store/nav-state'

const getStudies = async (clients: string[] = []) => {
  const response = await fetch(`http://localhost:3000/api/content/studies`)
  return response.json()
}

type CaseStudy = { slug: string; metadata: { [key: string]: any } }

const MenuCaseStudies = ({ visible = false }: { visible: boolean }) => {
  const [studies, setStudies] = useState<CaseStudy[]>([], 'Studies')
  const container =
    useRef<HTMLUListElement>() as MutableRefObject<HTMLUListElement>
  const [scrolling, setScrolling] = useState(false, 'Scrolling')
  const scrollTimer =
    useRef<NodeJS.Timeout>() as MutableRefObject<NodeJS.Timeout>
  const progress =
    useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>

  const { open: openContactForm } = useContactFormStateStore()
  const { close: closeNav } = useNavStateStore()

  useEffect(() => {
    ;(async () => {
      const studies = await getStudies()
      setStudies(studies)
    })()
  }, [setStudies])

  useEffect(() => {
    if (!visible) {
      container.current?.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }, [visible])

  const handleScroll = () => {
    clearTimeout(scrollTimer.current)

    if (!container.current) {
      return
    }
    setScrolling(true)

    const progressInput = progress.current
    if (progressInput) {
      progressInput.value = `${
        (container.current?.scrollLeft /
          (container.current?.scrollWidth - container.current?.clientWidth)) *
        100
      }`
    }

    const width = container.current?.clientWidth
    const items = container.current?.querySelectorAll('.menu__studies-item')
    items.forEach((item) => {
      const { left } = item.getBoundingClientRect()
      const pos = 5 - (left / width) * 20
      const image = item.querySelector('.case-study-item__background img')

      if (image) {
        image.style.transform = `translateX(${pos}%)`
      }
    })

    scrollTimer.current = setTimeout(() => {
      setScrolling(false)
    }, 100)
  }

  useEventListener(
    'scroll',
    handleScroll,
    { passive: true },
    container.current,
    !!studies.length,
  )

  useEffect(() => {
    handleScroll()
  }, [container.current])

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

  useEventListener(
    'input',
    handleInput,
    undefined,
    progress.current,
    !!studies.length,
  )

  if (!studies.length) {
    return null
  }

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
      >
        {studies.map(({ slug, metadata: study }) => (
          <CaseStudyItem
            study={study}
            key={slug}
            className="menu__studies-item"
          />
        ))}

        <li className="case-study-item menu__studies-item">
          <button
            className="case-study-cta"
            onClick={() => {
              closeNav()
              openContactForm()
            }}
          >
            <Logo client="you" />

            <h2 className="case-study-cta__title">
              Need help?
              <br />
              Let's work together.
            </h2>

            {/* <button */}
            {/*   className="case-study-cta__button text-link" */}
            {/*   onClick={() => { */}
            {/*     closeNav() */}
            {/*     openContactForm() */}
            {/*   }} */}
            {/* > */}
            {/*   Get in touch */}
            {/* </button> */}
          </button>
        </li>
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
      <input type="range" className="menu__studies-progress" ref={progress} />
    </>
  )
}

export default MenuCaseStudies
