import { getPosts as getAllPosts } from '@/data/posts'
import { getStudies as getAllStudies } from '@/data/studies'
import { getProjects as getAllProjects } from '@/data/projects'
import Github from '@/components/images/icons/social/github.svg'

const getProjects = async (slugs: string[] = []) => {
  const allProjects = await getAllProjects(slugs)
  return slugs
    .map((slug) => allProjects.find(({ slug: s }) => s === slug))
    .filter((project) => project !== undefined)
}

const getPosts = async (slugs: string[] = []) => {
  const allPosts = await getAllPosts(slugs)
  return slugs
    .map((slug) => allPosts.find(({ slug: s }) => s === slug))
    .filter((post) => post !== undefined)
}

const getStudies = async (slugs: string[] = []) => {
  const allStudies = await getAllStudies(slugs)
  return slugs
    .map((slug) => allStudies.find(({ slug: s }) => s === slug))
    .filter((study) => study !== undefined)
}

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
  projects: {
    title: 'Some things are _too good_ to keep to myself',
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
      'the-view-from-above',
      'selling-yourself',
      'getting-it-wrong',
    ]),
    link: {
      url: '/writing',
      label: 'View all articles',
    },
  },
}
