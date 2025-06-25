import toBase64 from './to-base-64'

/* eslint-disable @typescript-eslint/no-explicit-any */

const dataUri = (item: any) => {
  return `data:image/svg+xml;base64,${toBase64(item)}`
}

export default dataUri
