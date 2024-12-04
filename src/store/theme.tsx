import { createWithEqualityFn as create } from 'zustand/traditional'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { CSSProperties } from 'react'

export type HeaderStyle =
  | 'black'
  | 'white'
  | 'red'
  | 'red-white'
  | 'white-black'
  | 'white-red'
  | undefined
export type Color = CSSProperties['color'] | undefined

const useThemeStore = create<{
  color?: Color
  setColor: (color?: Color) => void
  backgroundColor: Color
  setBackgroundColor: (color?: Color) => void
  accentColor?: Color
  setAccentColor: (color?: Color) => void
  accentColorTwo?: Color
  setAccentColorTwo: (color?: Color) => void
  headerStyle?: HeaderStyle
  setHeaderStyle: (style?: HeaderStyle) => void
  headerColor?: Color
  setHeaderColor: (color?: Color) => void
}>((set) => ({
  color: undefined as Color,
  setColor: (color?: Color) => set((state) => ({ color })),
  backgroundColor: undefined as Color,
  setBackgroundColor: (color?: Color) =>
    set((state) => ({ backgroundColor: color })),
  accentColor: undefined as Color,
  setAccentColor: (color?: Color) => set((state) => ({ accentColor: color })),
  accentColorTwo: undefined as Color,
  setAccentColorTwo: (color?: Color) =>
    set((state) => ({ accentColorTwo: color })),
  headerStyle: 'red' as HeaderStyle,
  setHeaderStyle: (style?: HeaderStyle) =>
    set((state) => ({ headerStyle: style })),
  headerColor: undefined as Color,
  setHeaderColor: (color?: Color) => set((state) => ({ headerColor: color })),
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Theme', useThemeStore)
}

export default useThemeStore
