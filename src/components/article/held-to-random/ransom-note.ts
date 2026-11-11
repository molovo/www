// "Random", but seeded: every cut-out letter is styled by a deterministic
// PRNG, so server and client render identical markup (no hydration
// mismatch) and the note looks the same on every visit. Change SEED to
// reshuffle the whole note.
export const SEED = 1543

const FONTS = [
  'extended-black',
  'gauthier-bold',
  'gauthier-italic',
  'america-bold',
  'america-extended',
  'cinema',
] as const

// Weighted so red dominates: red appears as ink, paper or both.
const PAPERS = [
  'newsprint-red',
  'black-red',
  'red-black',
  'newsprint',
  'red-white',
  'yellowed',
  'black-red',
  'newsprint-red',
  'grey',
] as const

const CINEMA_SAFE = 'ADEFHKLRT'

export type Font = (typeof FONTS)[number]
export type Paper = (typeof PAPERS)[number]

export interface Cutting {
  char: string
  font: Font
  paper: Paper
  rotate: number
  shift: number
  scale: number
  clip: string
  delay: number
}

// mulberry32
const prng = (seed: number) => {
  let a = seed >>> 0

  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const round = (value: number, precision = 2) =>
  Math.round(value * 10 ** precision) / 10 ** precision

const between = (random: () => number, min: number, max: number) =>
  round(min + random() * (max - min))

// An irregular, scissor-cut quadrilateral (sometimes with an extra notch)
const scissorCut = (random: () => number) => {
  const j = () => between(random, 0, 7)
  const points = [
    `${j()}% ${j()}%`,
    `${100 - j()}% ${j()}%`,
    ...(random() > 0.6
      ? [`${100 - j() / 2}% ${between(random, 35, 65)}%`]
      : []),
    `${100 - j()}% ${100 - j()}%`,
    `${j()}% ${100 - j()}%`,
  ]

  return `polygon(${points.join(', ')})`
}

const pick = <T>(random: () => number, list: readonly T[], avoid?: T): T => {
  let choice = list[Math.floor(random() * list.length)]
  while (choice === avoid) {
    choice = list[Math.floor(random() * list.length)]
  }
  return choice
}

// Split the title into lines with roughly equal character counts,
// e.g. "Held to" / "Random"
const toLines = (text: string): string[] => {
  const words = text.split(' ')
  if (words.length < 2) {
    return [text]
  }

  let best = 1
  let bestDiff = Infinity
  for (let i = 1; i < words.length; i++) {
    const diff = Math.abs(
      words.slice(0, i).join(' ').length - words.slice(i).join(' ').length,
    )
    if (diff < bestDiff) {
      best = i
      bestDiff = diff
    }
  }

  return [words.slice(0, best).join(' '), words.slice(best).join(' ')]
}

const ransomNote = (text: string, seed = SEED): Cutting[][][] => {
  const random = prng(seed)
  let previousFont: Font | undefined
  let previousPaper: Paper | undefined
  let index = 0

  return toLines(text).map((line) =>
    line.split(' ').map((word) =>
      word.split('').map((letter) => {
        // Keep easily-confused glyphs legible: the pixel face only gets
        // capitals that survive it, and a heavy lowercase l reads as 1
        const unsafe: Font[] = [
          ...(CINEMA_SAFE.includes(letter.toUpperCase())
            ? []
            : ['cinema' as const]),
          ...('lI'.includes(letter) ? ['extended-black' as const] : []),
        ]
        let font = pick(random, FONTS, previousFont)
        while (unsafe.includes(font)) {
          font = pick(random, FONTS, previousFont)
        }
        const paper = pick(random, PAPERS, previousPaper)
        previousFont = font
        previousPaper = paper

        const flipped =
          letter === 'l'
            ? 'L'
            : random() > 0.65
              ? letter === letter.toUpperCase()
                ? letter.toLowerCase()
                : letter.toUpperCase()
              : letter
        const char = font === 'cinema' ? flipped.toUpperCase() : flipped

        return {
          char,
          font,
          paper,
          rotate: between(random, -7, 7),
          shift: between(random, -0.08, 0.08),
          scale: between(random, 0.85, 1.15),
          clip: scissorCut(random),
          delay: index++ * 70,
        }
      }),
    ),
  )
}

export default ransomNote
