import { content } from 'content/homepage'
import Hero from './hero'
import Awards from './awards'
import OpenSource from './open-source'
import Writing from './writing'
import { Organization, Person, WebSite } from 'schema-dts'
import Schema from '@/components/schema'

export const metadata = {
  title: {
    absolute: 'molovo. Design, Development, Branding',
  },
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

export default async function Page() {
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