'use client'

import useHeaderStyle from '@/hooks/use-header-style'

const Hero = () => {
  const setRef = useHeaderStyle('red')

  return (
    <section className="hero" ref={setRef}>
      <h1 className="hero__title">
        Hi, I&apos;m James.
        <br />I make websites.
      </h1>
    </section>
  )
}

export default Hero
