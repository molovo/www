import { metadata } from 'content/homepage'
import Hero from './hero'
import HomepageSection, { HomepageSectionItem } from './homepage-section'
import Listing from './writing/listing'
import Awards from './awards'
import OpenSource from './open-source'

export default async function Page() {
  const heroContent = metadata.sections[0]
  const writingContent = metadata.sections[1]

  return (
    <>
      <Hero {...heroContent} />
      <Awards />
      <OpenSource />
      <Listing posts={writingContent.items} />

      {metadata.sections.slice(2).map((section, index) => (
        <HomepageSection {...section} key={index} />
      ))}
    </>
  )
}
