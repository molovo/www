'use client'

import Image from 'next/image'
import ContentFigure, { ContentFigureProps } from './content-figure'
import { CSSProperties, MutableRefObject, useCallback, useRef } from 'react'
import { useEventListener } from '@superrb/react-addons/hooks'

const getRelativeTransform = (el1: HTMLElement, el2: HTMLElement): number =>
  (1 - el1.clientHeight / el2.clientHeight) *
  (el2.clientHeight / (el1.clientHeight - 1))

const syncedParallax = (
  elements: HTMLElement[],
  tallest?: HTMLElement,
): void => {
  if (
    elements.length === 0 ||
    !window.matchMedia('(min-width: 45em)').matches
  ) {
    return
  }

  if (!tallest) {
    return
  }

  // Sync the position of other elements so the top and bottom match the tallest element
  elements.forEach((element) => {
    const min = getRelativeTransform(element, tallest)
    const max = 0

    const { top } = element.getBoundingClientRect()
    const pct = Math.min(
      min,
      Math.max(
        max,
        (max - min) * (top / (tallest.clientHeight - window.innerHeight)),
      ),
    )

    requestAnimationFrame(() => {
      if (element.firstElementChild) {
        ;(
          element.firstElementChild as HTMLElement
        ).style.transform = `translateY(${pct * 100}%)`
      }
    })
  })
}

const SyncedScroll = ({
  images,
  caption,
  size = 'standard',
  imageStyle = {},
}: {
  images: string[]
  caption?: string
  size: ContentFigureProps['size']
  imageStyle?: { [key: number]: Partial<CSSProperties> }
}) => {
  const ref = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>
  const tallest = useRef<HTMLElement | undefined>() as MutableRefObject<
    HTMLElement | undefined
  >
  const sorted = useRef<HTMLElement[]>([]) as MutableRefObject<HTMLElement[]>

  const setElements = useCallback((element: HTMLDivElement) => {
    if (!element) {
      return
    }

    ref.current = element

    // Sort elements by height
    sorted.current = (Array.from(ref.current?.children) as HTMLElement[])
      .map((a) => a)
      .sort((a, b) => {
        if (a.clientHeight > b.clientHeight) {
          return -1
        }

        if (a.clientHeight <= b.clientHeight) {
          return 1
        }

        return 0
      })

    // Grab the tallest element
    tallest.current = sorted.current.shift()
  }, [])

  useEventListener(
    'scroll',
    () => {
      syncedParallax(sorted.current, tallest.current)
    },
    { passive: false },
  )

  return (
    <ContentFigure size={size} caption={caption}>
      <div className="synced-scroll" ref={setElements}>
        {images.map((image, index) =>
          image ? (
            <div
              className="synced-scroll__image"
              key={index}
              style={imageStyle[index] || {}}
            >
              <Image
                src={image}
                alt=""
                className="synced-scroll__image-inner"
              />
            </div>
          ) : (
            <div
              className="synced-scroll__image"
              key={index}
              style={imageStyle[index] || {}}
            >
              <div className="synced-scroll__image-inner"></div>
            </div>
          ),
        )}
      </div>
    </ContentFigure>
  )
}

export default SyncedScroll
