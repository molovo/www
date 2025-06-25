'use client'

import Listing from '@/components/listing'
import useHeaderStyle from '@/hooks/use-header-style'
import HomepageSection, {
  HomepageSectionLink,
} from '@/components/homepage/section'
import ArticleType from '@/types/article'
import Button from '../button'

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
      className="writing"
      ref={setRef}
    >
      <div className="writing__content">
        <Listing posts={posts} />
      </div>

      {link && (
        <div className="writing__footer">
          <Button href={link.url} className="writing__link">
            {link.label}
          </Button>
        </div>
      )}
    </HomepageSection>
  )
}

export default Writing
