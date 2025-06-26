'use client'

import { useLockBodyScroll } from '@superrb/react-addons/hooks'
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { CSSProperties, KeyboardEventHandler, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Shrink from '@/components/images/icons/shrink.svg'

interface Props extends NextImageProps {
  zoomable?: boolean
  allowScroll?: boolean
  className?: string
}

const transitionDuration = 500

const baseStyle: Partial<CSSProperties> = {}

const basePortalStyle: Partial<CSSProperties> = {
  ...baseStyle,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'clip auto',
  padding: 0,
  position: 'fixed',
  transition: `all ${transitionDuration / 1000}s ease-in-out`,
  zIndex: 1000,
}

const zoomedPortalStyle: Partial<CSSProperties> = {
  paddingInline: 'var(--gutter)',
  paddingBlock: 'var(--spacing)',

  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
}

const baseImageStyle: Partial<CSSProperties> = {
  ...baseStyle,
  flex: '0 0 auto',
  height: 'auto',
  margin: 'auto',
  maxHeight: 'none',
  width: '100%',
}

const zoomedImageStyle: Partial<CSSProperties> = {
  ...baseStyle,
  cursor: 'zoom-out',
}

const scrollBlockedBaseImageStyle: Partial<CSSProperties> = {
  maxHeight: '100%',
  maxWidth: '100%',
  width: 'auto',
}

const Image = ({
  zoomable = false,
  allowScroll = false,
  className = '',
  style = {},
  sizes = '1vw',
  ...props
}: Props) => {
  const ref = useRef<HTMLImageElement>(null)
  const portalRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [zoomed, setZoomed] = useState<boolean>(false)
  const [transitioning, setTransitioning] = useState<boolean>(false)
  const [originalPosition, setOriginalPosition] = useState<
    Partial<CSSProperties>
  >({
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  })
  const [portalStyle, setPortalStyle] = useState<Partial<CSSProperties>>({})
  const [imageStyle, setImageStyle] = useState<Partial<CSSProperties>>({})

  useLockBodyScroll(zoomed)

  const open = () => {
    if (!ref.current) {
      return
    }

    const { bottom, left, right, top } = ref.current?.getBoundingClientRect()
    setOriginalPosition({
      bottom: window.innerHeight - bottom,
      left,
      right: window.innerWidth - right,
      top,
    })

    setZoomed(true)
    setTransitioning(true)
    setPortalStyle({
      ...basePortalStyle,
      bottom: `${window.innerHeight - bottom}px`,
      left: `${left}px`,
      right: `${window.innerWidth - right}px`,
      top: `${top}px`,
      transition: 'none',
    } as Partial<CSSProperties>)
    setImageStyle(baseImageStyle)

    setTimeout(() => {
      setPortalStyle({ ...basePortalStyle, ...zoomedPortalStyle })
      setImageStyle({
        ...baseImageStyle,
        ...zoomedImageStyle,
        ...(!allowScroll ? scrollBlockedBaseImageStyle : {}),
      })
      portalRef.current?.focus()

      setTimeout(() => {
        setTransitioning(false)
      }, transitionDuration)
    }, 50)
  }

  const close = () => {
    setTransitioning(true)
    setPortalStyle({
      ...basePortalStyle,
      bottom: `${originalPosition.bottom}px`,
      left: `${originalPosition.left}px`,
      right: `${originalPosition.right}px`,
      top: `${originalPosition.top}px`,
    } as Partial<CSSProperties>)

    setTimeout(() => {
      ref.current?.focus()

      setTimeout(() => {
        setImageStyle({})
        setTransitioning(false)
        setZoomed(false)
      }, transitionDuration)
    }, 50)
  }

  const handleClick = () => {
    return zoomed ? close() : open()
  }

  const handleKeyDown: KeyboardEventHandler<HTMLImageElement> = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      return close()
    }

    if (event.key === 'Enter') {
      return handleClick()
    }
  }

  return (
    <>
      <NextImage
        className={`image ${className}`}
        sizes={sizes}
        {...props}
        {...(zoomable
          ? {
              onClick: handleClick,
              onKeyDown: handleKeyDown,
              role: 'button',
              tabIndex: 0,
              'aria-label': 'Zoom image',
              'aria-expanded': zoomed,
            }
          : {})}
        ref={ref}
        aria-busy={props.loading === 'lazy' && loaded === false}
        style={{ ...style, ...(zoomable ? { cursor: 'zoom-in' } : {}) }}
        onLoad={() => setLoaded(true)}
        priority={props.loading === 'eager'}
      />

      {zoomed &&
        createPortal(
          <div
            className={`image-portal ${
              transitioning ? 'image-portal--transitioning' : ''
            }`}
            style={portalStyle}
            onClick={close}
            onKeyDown={handleKeyDown}
            ref={portalRef}
          >
            <button className="image-portal__close">
              <Shrink />
            </button>

            <NextImage
              className={`image ${className}`}
              sizes="100vw"
              {...props}
              {...(zoomable ? { onClick: handleClick } : {})}
              style={imageStyle}
              aria-expanded={zoomed}
              priority={false}
            />
          </div>,
          document.body,
        )}
    </>
  )
}

export default Image
