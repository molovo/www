import ContentImage from '@/components/content-image'
import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import { ComponentProps } from 'react'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,

    img: (props: ComponentProps<typeof Image>) => <ContentImage {...props} />,
  }
}

