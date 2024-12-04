import { content } from 'content/homepage'
import Hero from '@/components/homepage/hero'
import { Organization, Person, WebSite } from 'schema-dts'
import Schema from '@/components/schema'
import dynamic from 'next/dynamic'
import Awards from '@/components/homepage/awards'
import OpenSource from '@/components/homepage/open-source'
import Writing from '@/components/homepage/writing'

export const metadata = {
  title: {
    absolute: 'molovo. Design, Development, Branding',
  },
  description:
    "James Dinsdale is a designer and developer from Poole UK. Building immersive, interactive experiences on the web. Let's build something together.",
}

const jsonLdOrganization: Organization = {
  '@type': 'Organization',
  name: 'molovo',
  email: 'hi@molovo.co',
  url: 'https://molovo.co',
  logo: 'https://molovo.co/logo.svg',
}

const jsonLdWebsite: WebSite = {
  '@type': 'WebSite',
  url: 'https://molovo.co',
  name: 'molovo',
}

const jsonLdPerson: Person = {
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
}

export const generateStaticParams = async () => [{ lang: 'en' }]

export default async function Page({
  params: { lang },
}: {
  params: { lang: string }
}) {
  return (
    <>
      <Hero {...content.hero} />
      <Awards {...content.awards} />
      <OpenSource {...content.projects} />
      <Writing {...content.writing} />

      <Schema content={jsonLdOrganization} />
      <Schema content={jsonLdWebsite} />
      <Schema content={jsonLdPerson} />
    </>
  )
}
