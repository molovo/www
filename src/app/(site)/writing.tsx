'use client'

import Listing from './writing/listing'
import useHeaderStyle from '@/hooks/use-header-style'
import HomepageSection, { HomepageSectionLink } from './homepage-section'
import ArticleType from '@/types/article'

const Writing = ({
  title,
  subtitle,
  link,
  posts,
}: {
  title: string
  subtitle: string
  link?: HomepageSectionLink
  posts: ArticleType[]
}) => {
  const setRef = useHeaderStyle('red')

  return (
    <HomepageSection
      title={title}
      titleSwashCharacter="F"
      subtitle={subtitle}
      link={link}
      className="writing"
      ref={setRef}
    >
      <div className="writing__content">
        <Listing posts={posts} />
      </div>
    </HomepageSection>
  )
}

export default Writing
