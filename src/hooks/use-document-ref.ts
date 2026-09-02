import { useRef } from 'react'
import type { RefObject } from 'react'

const useDocumentRef = (): RefObject<Document> =>
  useRef<Document>(
    typeof document === 'undefined'
      ? (undefined as unknown as Document)
      : document,
  )

export default useDocumentRef
