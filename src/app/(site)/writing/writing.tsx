'use client'

import Listing from '@/components/listing'
import useHeaderStyle from '@/hooks/use-header-style'
import ArticleType from '@/types/article'

const Writing = ({ posts }: { posts: ArticleType[] }) => {
  const setRef = useHeaderStyle('red')

  return (
    <section className="writing" ref={setRef}>
      <div className="writing__content">
        <Listing posts={posts} />
      </div>
    </section>
  )
}

export default Writing
