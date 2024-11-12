import { getPosts as getAllPosts } from '@/app/(site)/writing/data'

const getProjects = async () => {}

const getPosts = async () => {
  const allPosts = await getAllPosts()
  return allPosts
    .filter(({ metadata }) => metadata.featured)
    .sort(
      (a, b) =>
        new Date(b.metadata?.date).getTime() -
        new Date(a.metadata?.date).getTime(),
    )
}

export const metadata = {
  title: 'Hi, I&apos;m James.<br />I make websites.',

  sections: [
    {
      title: 'Hi, I&apos;m James. I make websites.',
      text: 'Something something',
      items: [
        'joonbyrd',
        'superrb',
        'retainer-club',
        'anglepoise',
        'redistribute',
        'vixen-fitness',
        'haresfoot',
      ],
    },
    {
      title: 'A title',
      text: 'I write about design, development, and the web. Here are a few of my favourite articles.',
      items: await getPosts(),
    },
    {
      title: 'A title',
      text: 'I build open source software, for fun and for profit. Here are a few project you might find useful.',
      items: [
        {
          url: 'https://zulu.molovo.co',
          name: 'Zulu',
          text: 'A ZSH plugin and environment manager',
        },
        {
          url: 'https://github.com/molovo/consumer',
          name: 'Consumer',
          text: 'An ORM-like Rest API consumer for JavaScript projects',
        },
        {
          url: 'zunit.xyz',
          name: 'ZUnit',
          text: 'A powerful testing framework for ZSH projects',
        },
      ],
    },
  ],
}
