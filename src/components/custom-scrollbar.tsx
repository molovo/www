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
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  controls: RefObject<HTMLElement | null>
  className?: string
  style?: Partial<CSSProperties>
}

export type { Props as CustomSrcollbarProps }

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
        const value = `${
          (controls.current?.scrollLeft /
            (controls.current?.scrollWidth - controls.current?.clientWidth)) *
          100
        }`
        progressInput.value = value
        progressInput.setAttribute('aria-valuenow', value)
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
    if (value) {
      controls.current.scrollTo({
        left:
          (value / 100) *
          (controls.current?.scrollWidth - controls.current?.clientWidth),
      })
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
        // Required attributes are added on hydration
        // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
        role="scrollbar"
        aria-label="Scrollbar"
        aria-controls={controls?.current?.id}
        aria-valuemin={0}
        aria-valuemax={100}
        // @ts-ignore: 'aria-grabbed' is deprecated
        aria-grabbed={dragging}
        style={style}
        {...props}
      />
    </>
  )
}

export default forwardRef(CustomScrollbar)
