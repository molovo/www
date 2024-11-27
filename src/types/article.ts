import { Color, HeaderStyle } from '@/store/theme'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { CSSProperties, FC } from 'react'

export interface ArticleMetadataType {
  slug: string
  title: string
  titleSwashCharacter?: string
  description: string
  date: string
  image?: string | StaticImport
  tags?: string[]
  featured?: boolean

  headerStyle?: HeaderStyle
  headerColor?: Color

  styles: {
    main?: Partial<CSSProperties>
    title?: Partial<CSSProperties>
    titleSwash?: Partial<CSSProperties>
    image?: Partial<CSSProperties>
  }
}

export default interface ArticleType {
  slug: string
  metadata: ArticleMetadataType
  Content: FC<ArticleMetadataType>
}
