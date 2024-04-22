const swash = (text: string, character: string) =>
  text.replace(
    /_([^_]+)_/g,
    `<span class="swash" ${
      character ? `data-character="${character}"` : ''
    }>$1</span>`,
  )

export default swash
