import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { CSSProperties, FC } from 'react'

export interface ArticleMetadataType {
  slug: string
  title: string
  description: string
  date: string
  image?: string | StaticImport
  tags?: string[]
  featured?: boolean

  styles: {
    main?: Partial<CSSProperties>
    title?: Partial<CSSProperties>
    titleSwash?: Partial<CSSProperties>
  }
}

export default interface ArticleType {
  slug: string
  metadata: ArticleMetadataType
  Content: FC<ArticleMetadataType>
}
