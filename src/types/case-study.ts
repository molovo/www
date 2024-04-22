import { HeaderColor, HeaderStyle } from '@/store/header-style'
import { Color } from '@/store/theme'
import { CSSProperties } from 'react'

export interface CaseStudySectionType {
  slug: string
  name: string
  title: string
  intro?: string
  superrb?: boolean
  color: Color
  backgroundColor: Color
  headerStyle?: HeaderStyle
  headerColor?: HeaderColor
  backgroundImage: string
  accentColor?: CSSProperties['color']
  accentColorTwo?: CSSProperties['color']

  styles?: {
    content?: Partial<CSSProperties>
    image?: Partial<CSSProperties>
    main?: Partial<CSSProperties>
    title?: Partial<CSSProperties>
  }
}

export default interface CaseStudyType {
  slug: string
  client: string
  title: string

  styles?: {
    thumbnail?: Partial<CSSProperties>
    thumbnailContent?: Partial<CSSProperties>
    thumbnailTitle?: Partial<CSSProperties>
  }

  sections: CaseStudySectionType[]
}
