import { content } from 'content/homepage'
import Hero from './hero'
import Awards from './awards'
import OpenSource from './open-source'
import Writing from './writing'

export const metadata = {
  title: {
    absolute: 'molovo. Design, Development, Branding',
  },
}

export default async function Page() {
  return (
    <>
      <Hero {...content.hero} />
      <Awards {...content.awards} />
      <OpenSource {...content.projects} />
      <Writing {...content.writing} />
    </>
  )
}
