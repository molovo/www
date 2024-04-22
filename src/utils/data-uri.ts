import toBase64 from './to-base-64'

const dataUri = (item: any) => {
  return `data:image/svg+xml;base64,${toBase64(item)}`
}

export default dataUri
