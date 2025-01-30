'use client'

import useHeaderStyle from '@/hooks/use-header-style'
import { Color, HeaderStyle } from '@/store/theme'

export default function SetHeaderStyle({
  style,
  color,
}: {
  style?: HeaderStyle
  color?: Color
}) {
  const setRef = useHeaderStyle(style, color)
  return <div ref={setRef} />
}
