import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  experimental: {
    cssChunking: true,
    optimizePackageImports: ['@atproto/api'],
  },

  outputFileTracingIncludes: {
    '/api/**': ['./content/**/*'],
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
      {
        protocol: 'https',
        hostname: 'media.giphy.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  sassOptions: {
    includePaths: ['./src/stylesheets/'],
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
