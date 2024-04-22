import { metadata } from '../..//content/homepage'
import Hero from './hero'
import HomepageSection from './homepage-section'

export default function Home() {
  return (
    <main className="main">
      <Hero />

      {metadata.sections.map((section, index) => (
        <HomepageSection {...section} key={index} />
      ))}
    </main>
  )
}
