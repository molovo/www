import { useEventListener } from '@superrb/react-addons/hooks'
import {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
/**
 * Props for the CustomScrollbar component
 * 
 * @interface Props
 * @extends {InputHTMLAttributes<HTMLInputElement>}
 */
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  /** Reference to the element that this scrollbar controls */
  controls: RefObject<HTMLElement | null>
  /** Additional CSS classes to apply to the scrollbar */
  className?: string
  /** Inline styles to apply to the scrollbar */
  style?: Partial<CSSProperties>
}

export type { Props as CustomSrcollbarProps }

/**
 * CustomScrollbar - An accessible horizontal scrollbar component
 * 
 * This component creates a custom scrollbar that follows WAI-ARIA accessibility guidelines.
 * It uses the slider role instead of scrollbar role to provide proper semantics for
 * assistive technologies.
 * 
 * Key accessibility features:
 * - Uses role="slider" for proper ARIA semantics
 * - Provides aria-valuetext for meaningful value descriptions
 * - Supports keyboard navigation (arrow keys, home, end)
 * - Maintains proper aria-valuenow updates during scroll
 * - Requires controlled element to have an ID for aria-controls
 * 
 * @param props - Component props
 * @param ref - Forwarded ref to the input element
 * @returns JSX.Element
 */

const CustomScrollbar = (
  { controls, className = '', style = {}, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement | null>,
) => {
  const progress = useRef<HTMLInputElement>(null)

  if (ref) {
    if ('current' in ref) {
      ref.current = progress.current
    } else {
      ref(progress.current)
    }
  }

  const [dragging, setDragging] = useState<boolean>(false)
  const [sliderWidth, setSliderWidth] = useState<number>(50)

  if (!controls || (controls?.current && !controls.current.id)) {
    throw new Error(
      'CustomScrollbar requires a controls ref with an id for accessibility',
    )
  }

  const handleScroll = () => {
    if (!controls.current) {
      return
    }

    if (!dragging) {
      const progressInput = progress.current
      if (progressInput) {
        const scrollPercentage = 
          (controls.current?.scrollLeft /
            (controls.current?.scrollWidth - controls.current?.clientWidth)) *
          100
        const value = `${scrollPercentage}`
        const roundedValue = Math.round(scrollPercentage)
        
        progressInput.value = value
        progressInput.setAttribute('aria-valuenow', value)
        progressInput.setAttribute('aria-valuetext', `${roundedValue}% scrolled`)
      }
    }
  }

  useEventListener('scroll', handleScroll, { passive: true }, controls.current)
  useEventListener('resize', handleScroll)
  useEffect(() => {
    handleScroll()
  })

  const handleInput = () => {
    if (!controls.current || !progress.current) {
      return
    }

    const value = parseFloat(progress.current?.value)
    if (!isNaN(value)) {
      controls.current.scrollTo({
        left:
          (value / 100) *
          (controls.current?.scrollWidth - controls.current?.clientWidth),
        behavior: 'smooth'
      })
      
      // Update aria-valuetext for screen readers
      const roundedValue = Math.round(value)
      progress.current.setAttribute('aria-valuetext', `${roundedValue}% scrolled`)
    }
  }

  useEventListener('input', handleInput, undefined, progress.current)
  useEventListener('change', handleInput, undefined, progress.current)
  useEventListener('resize', handleScroll)

  const updateSliderWidth = () => {
    if (!controls.current) {
      return
    }

    setSliderWidth(
      (controls.current?.clientWidth / controls.current?.scrollWidth) * 100,
    )
  }

  useEventListener('resize', updateSliderWidth)
  useEffect(() => {
    updateSliderWidth()
  })

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

  return (
    <>
      <style>
        {`
          .scrollbar::-webkit-slider-thumb {
            width: ${sliderWidth}%;
          }
          .scrollbar::-moz-range-thumb {
            width: ${sliderWidth}%;
          }
          .scrollbar::-ms-thumb{
            width: ${sliderWidth}%;
          }
        `}
      </style>
      <input
        type="range"
        className={`scrollbar ${className}`}
        ref={progress}
        // Use slider role for proper accessibility semantics
        role="slider"
        aria-label="Horizontal scroll position"
        aria-controls={controls?.current?.id}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${Math.round(parseFloat(progress.current?.value || '0'))}% scrolled`}
        aria-orientation="horizontal"
        style={style}
        {...props}
      />
    </>
  )
}

export default forwardRef(CustomScrollbar)
