import { PropsWithChildren } from 'react'
import { codeToHtml } from 'shiki'

export default async function CodeBlock({
  children,
  lang,
}: PropsWithChildren<{ lang: string }>) {
  const out = await codeToHtml(children as string, {
    lang: lang,
    theme: 'dracula-soft',
  })

  return <div dangerouslySetInnerHTML={{ __html: out }} />
}
