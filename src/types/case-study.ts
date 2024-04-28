import { HeaderColor, HeaderStyle } from '@/store/header-style'
import { Color } from '@/store/theme'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { CSSProperties } from 'react'

export interface CaseStudySectionType {
  slug: string
  name: string
  title: string
  intro?: string
  color: Color
  backgroundColor: Color
  headerStyle?: HeaderStyle
  headerColor?: HeaderColor
  backgroundImage: string | StaticImport
  accentColor?: CSSProperties['color']
  accentColorTwo?: CSSProperties['color']
  titleSwashCharacter?: string

  styles?: {
    content?: Partial<CSSProperties>
    image?: Partial<CSSProperties>
    main?: Partial<CSSProperties>
    title?: Partial<CSSProperties>
    titleSwash?: Partial<CSSProperties>
  }
}

export default interface CaseStudyType {
  slug: string
  title: string
  description: string
  client: string
  thumbnail: string | StaticImport
  order?: number
  draft?: boolean
  superrb?: boolean

  styles?: {
    thumbnail?: Partial<CSSProperties>
    thumbnailContent?: Partial<CSSProperties>
    thumbnailTitle?: Partial<CSSProperties>
  }

  sections: CaseStudySectionType[]

  Content: React.FC<CaseStudyType>
}
