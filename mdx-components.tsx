import LineBreak from '@/components/line-break'
import type { MDXComponents } from 'mdx/types'
import { ComponentProps } from 'react'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,

    hr: (props: ComponentProps<'hr'>) => <LineBreak {...props} />,
  }
}
