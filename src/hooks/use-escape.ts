import { useEventListener } from '@superrb/react-addons/hooks'
import { RefObject } from 'react'

const useEscape = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
) => {
  useEventListener(
    'keydown',
    (event) => {
      if (
        ref.current?.contains(document.activeElement) &&
        event.key === 'Escape'
      ) {
        event.preventDefault()
        callback()
      }
    },
    {},
    typeof document !== 'undefined' ? document : undefined,
    ref.current !== undefined && typeof document !== 'undefined',
  )
}

export default useEscape
