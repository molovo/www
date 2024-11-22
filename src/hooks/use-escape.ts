import { useEventListener } from '@superrb/react-addons/hooks'

const useEscape = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
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
    ref.current !== undefined && document !== undefined,
  )
}

export default useEscape
