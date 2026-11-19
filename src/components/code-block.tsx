import { cacheLife } from 'next/cache'
import { PropsWithChildren } from 'react'
import { codeToHtml } from 'shiki'

const highlight = async (code: string, lang: string) => {
  'use cache'
  cacheLife('max')

  return codeToHtml(code, { lang, theme: 'dracula-soft' })
}

export default async function CodeBlock({
  children,
  lang,
}: PropsWithChildren<{ lang: string }>) {
  const out = await highlight(children as string, lang)

  return <div dangerouslySetInnerHTML={{ __html: out }} />
}
