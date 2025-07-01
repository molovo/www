import { Thing } from 'schema-dts'

const Schema = <T extends Thing>({
  content,
}: {
  content: T | { '@graph': T[] }
}) => {
  const schema = {
    '@context': 'https://schema.org',
    ...(content as T as object),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default Schema
