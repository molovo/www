import { BreadcrumbList, ListItem } from 'schema-dts'
import Schema from './schema'

interface Props {
  title: string
  url: string
  parentTitle?: string
}

const BreadcrumbSchema = ({ title, url, parentTitle }: Props) => {
  const jsonLd: BreadcrumbList = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://molovo.co',
      },
    ] as ListItem[],
  }

  if (parentTitle) {
    ;(jsonLd.itemListElement as ListItem[]).push({
      '@type': 'ListItem',
      position: (jsonLd.itemListElement as ListItem[]).length + 1,
      name: parentTitle,
      item: url.split('/').slice(0, -1).join('/'),
    })
  }

  ;(jsonLd.itemListElement as ListItem[]).push({
    '@type': 'ListItem',
    position: (jsonLd.itemListElement as ListItem[]).length + 1,
    name: title,
    item: url,
  })

  return <Schema content={jsonLd} />
}

export default BreadcrumbSchema
