import { HeaderColor, HeaderStyle } from '@/store/header-style'
import { Color } from '@/store/theme'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { CSSProperties, ReactNode } from 'react'

export interface CaseStudySectionType {
  order: number
  slug: string
  name: string
  title: string
  intro?: string
  content: ReactNode
  color: Color
  backgroundColor: Color
  headerStyle?: HeaderStyle
  headerColor?: HeaderColor
  backgroundImage: string | StaticImport
  accentColor?: CSSProperties['color']
  accentColorTwo?: CSSProperties['color']
  titleSwashCharacter?: string
  hideGradient?: boolean

  styles?: {
    content?: Partial<CSSProperties>
    image?: Partial<CSSProperties>
    main?: Partial<CSSProperties>
    title?: Partial<CSSProperties>
    titleSwash?: Partial<CSSProperties>
    social?: Partial<CSSProperties>
  }
}

export default interface CaseStudyType {
  slug: string
  title: string
  description: string
  client: string
  url?: string
  date: string
  thumbnail: string | StaticImport
  order?: number
  draft?: boolean
  superrb?: boolean
  help?: string[]

  styles?: {
    thumbnail?: Partial<CSSProperties>
    thumbnailContent?: Partial<CSSProperties>
    thumbnailTitle?: Partial<CSSProperties>
  }

  sections: CaseStudySectionType[]

  Content: React.FC<CaseStudyType>
}
