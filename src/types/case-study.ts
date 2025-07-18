import { Color, HeaderStyle } from '@/store/theme'
import { StaticImageData } from 'next/dist/shared/lib/get-img-props'
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
  headerColor?: Color
  backgroundImage: string | StaticImageData
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
  role?: string
  url?: string
  offline?: boolean
  date: string
  thumbnail: string | StaticImageData
  thumbnailContentBackground?: string | StaticImageData
  order?: number
  draft?: boolean
  superrb?: boolean
  help?: string[]

  prev: CaseStudyType
  next: CaseStudyType

  knowledge: Array<{
    title: string
    text: string
  }>

  knowledgeBackgroundImage?: string | StaticImageData
  knowledgeHeaderStyle?: HeaderStyle
  knowledgeHeaderColor?: Color

  styles: {
    knowledge?: {
      image?: Partial<CSSProperties>
      main?: Partial<CSSProperties>
      title?: Partial<CSSProperties>
      quote?: Partial<CSSProperties>
    }
    thumbnail?: Partial<CSSProperties>
    thumbnailBackgroundImage?: Partial<CSSProperties>
    thumbnailContent?: Partial<CSSProperties>
    thumbnailContentBackgroundImage?: Partial<CSSProperties>
    thumbnailTitle?: Partial<CSSProperties>
    visit?: Partial<CSSProperties>
    visitButton?: Partial<CSSProperties>
  }

  sections: CaseStudySectionType[]
}
