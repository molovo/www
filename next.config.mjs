import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  experimental: {
    optimizePackageImports: [
      '@superrb/react-addons/actions',
      '@superrb/react-addons/components',
      '@superrb/react-addons/context',
      '@superrb/react-addons/hooks',
      '@superrb/react-addons/storage',
      '@superrb/react-addons/store',
      '@superrb/react-addons/utils',
      '@superrb/next-addons/components',
      '@superrb/next-addons/context',
      '@superrb/next-addons/server',
    ],

    outputFileTracingIncludes: {
      '/api/**': ['./content/**/*']
    }
  },

  // Optionally, add any other Next.js config below
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.webmention.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.bsky.app',
        port: '',
        pathname: '/img/feed_{thumbnail,fullsize}/**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/umami.js',
        destination: 'https://cloud.umami.is/script.js',
      },
    ]
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, [remarkSmartypants, { dashes: 'oldschool' }]],
    rehypePlugins: [rehypeAutolinkHeadings],
  },
})

import bundleAnalyzer from '@next/bundle-analyzer'
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(withMDX(nextConfig))
