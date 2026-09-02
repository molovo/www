import { useEventListener } from '@superrb/react-addons/hooks'
import { RefObject } from 'react'
import useDocumentRef from './use-document-ref'

const useEscape = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
) => {
  const documentRef = useDocumentRef()

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
    documentRef,
    ref.current !== undefined && typeof document !== 'undefined',
  )
}

export default useEscape
