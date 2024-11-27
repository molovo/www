import LineBreak from '@/components/line-break'
import type { MDXComponents } from 'mdx/types'
import { ComponentProps, PropsWithChildren } from 'react'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,

    hr: (props: ComponentProps<'hr'>) => <LineBreak {...props} />,
    ol: ({ children, ...props }: PropsWithChildren<ComponentProps<'ol'>>) => (
      <ol className="case-study__feature-list" {...props}>
        {children}
      </ol>
    ),
    ul: ({ children, ...props }: PropsWithChildren<ComponentProps<'ul'>>) => (
      <ul className="case-study__feature-list" {...props}>
        {children}
      </ul>
    ),
  }
}
