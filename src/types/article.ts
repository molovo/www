import { Color, HeaderStyle } from '@/store/theme'
import { StaticImageData } from 'next/dist/shared/lib/get-img-props'
import { CSSProperties, FunctionComponent, ReactNode } from 'react'

export default interface ArticleType {
  slug: string
  title: string
  titleSwashCharacter?: string
  description: string
  date: string
  image?: string | StaticImageData
  imageAlt?: string
  imageSizes?: string
  tags?: string[]
  featured?: boolean

  opengraphImage?: string | StaticImageData
  opengraphImageAlt?: string

  HeaderComponent?: FunctionComponent

  headerStyle?: HeaderStyle
  headerColor?: Color
  contentHeaderStyle?: HeaderStyle
  contentHeaderColor?: Color

  styles: {
    main?: Partial<CSSProperties>
    title?: Partial<CSSProperties>
    titleSwash?: Partial<CSSProperties>
    image?: Partial<CSSProperties>
  }

  content?: ReactNode
}
