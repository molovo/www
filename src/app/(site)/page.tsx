import { metadata } from '/content/homepage'
import Hero from './hero'
import HomepageSection from './homepage-section'
import Main from '@/components/main'

export default function Home() {
  return (
    <>
      <Hero />

      {metadata.sections.map((section, index) => (
        <HomepageSection {...section} key={index} />
      ))}
    </>
  )
}
