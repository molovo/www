import Hero from '@/components/homepage/Hero'
import { Organization, Person, WebSite } from 'schema-dts'
import Schema from '@/components/schema'

import { getStudies } from '@/data/studies'
import { getProjects } from '@/data/projects'
import { getPosts } from '@/data/posts'
import dynamicComponent from 'next/dynamic'
import { Metadata } from 'next'

export const dynamic = 'force-static'

const Awards = dynamicComponent(() => import('@/components/homepage/Awards'))
const OpenSource = dynamicComponent(
  () => import('@/components/homepage/OpenSource'),
)
const Writing = dynamicComponent(() => import('@/components/homepage/Writing'))

export const metadata: Metadata = {
  title: {
    absolute: 'molovo. Design, Development, Branding',
  },
  description:
    "James Dinsdale is a designer and developer from Poole, UK; building immersive, interactive experiences on the web. Let's build something together.",
  alternates: {
    canonical: 'https://molovo.co',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}

const consolidatedJsonLd = {
  '@graph': [
    {
      '@type': 'Organization',
      name: 'molovo',
      email: 'hi@molovo.co',
      url: 'https://molovo.co',
      logo: 'https://molovo.co/logo.svg',
    } as Organization,
    {
      '@type': 'WebSite',
      url: 'https://molovo.co',
      name: 'molovo',
    } as WebSite,
    {
      '@type': 'Person',
      name: 'James Dinsdale',
      url: 'https://molovo.co',
      sameAs: [
        'https://twitter.com/molovo',
        'https://github.com/molovo',
        'https://dribbble.com/molovo',
        'https://bsky.app/profile/molovo.co',
        'https://medium.com/@molovo',
      ],
    } as Person,
  ],
}

export default async function Page() {
  // Fetch all data in parallel for performance
  const [studies, projects, posts] = await Promise.all([
    getStudies(['joonbyrd', 'redistribute', 'vixen-fitness']),
    getProjects([
      'live-node-list',
      'consumer',
      'zunit',
      'async',
      'phillip',
      'magic-roundabout',
    ]),
    getPosts(['lost-at-sea', 'perpetually-online', 'the-view-from-above']),
  ])

  const content = {
    hero: {
      title: 'Hi, I&apos;m James.<br />I make websites.',
      studies,
    },
    awards: {
      title: 'Turns out, the big names have _great taste_.',
      subtitle:
        'My work has been recognised by some of the industryʼs top players.',
    },
    projects: {
      title: 'Some things are _too good_ to keep to myself.',
      subtitle:
        'I build open source tools, because good ideas are better when shared.',
      projects,
      link: {
        url: 'https://github.com/molovo',
        label: 'View more on Github',
      },
    },
    writing: {
      title: 'I _write_ about design, development, and the web.',
      subtitle: 'Here are a few of my favourite articles.',
      posts,
      link: {
        url: '/writing',
        label: 'View all articles',
      },
    },
  }

  return (
    <>
      <Hero {...content.hero} />
      <Awards {...content.awards} />
      <OpenSource {...content.projects} />
      <Writing {...content.writing} />
      <Schema content={consolidatedJsonLd} />
    </>
  )
}
