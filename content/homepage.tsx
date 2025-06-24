import { getPosts } from '@/data/posts'
import { getStudies } from '@/data/studies'
import { getProjects } from '@/data/projects'
import Github from '@/components/images/icons/social/github.svg'

export const content = {
  hero: {
    title: 'Hi, I&apos;m James.<br />I make websites.',
    studies: await getStudies([
      'joonbyrd',
      'redistribute',
      // 'superrb',
      // 'retainer-club',
      // 'anglepoise',
      'vixen-fitness',
      // 'haresfoot',
    ]),
  },
  awards: {
    title: 'Turns out, the big names have _great taste_.',
    subtitle:
      'My work has been recognised by some of the industryʼs top players.',
  },
  clients: {
    title: 'I have friends in _high places_.',
    subtitle: 'Iʼve had the pleasure of working with all of these fine folks.',
  },
  projects: {
    title: 'Some things are _too good_ to keep to myself.',
    subtitle:
      'I build open source tools, because good ideas are better when shared.',
    projects: await getProjects([
      'live-node-list',
      'consumer',
      'zunit',
      'async',
      'phillip',
      'magic-roundabout',
    ]),
    link: {
      url: 'https://github.com/molovo',
      label: (
        <>
          View more on Github
          <Github />
        </>
      ),
    },
  },
  writing: {
    title: 'I _write_ about design, development, and the web.',
    subtitle: 'Here are a few of my favourite articles.',
    posts: await getPosts([
      'lost-at-sea',
      'perpetually-online',
      'the-view-from-above',
    ]),
    link: {
      url: '/writing',
      label: 'View all articles',
    },
  },
}
