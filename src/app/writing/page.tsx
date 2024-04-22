'use server'

import { glob } from 'glob'
import Image from 'next/image'
import { onlyText } from 'react-children-utilities'
import OnlyText from '@/components/only-text'
import useHeaderStyle from '@/hooks/use-header-style'

const getPosts = async () => {
  const files = await glob(`${process.cwd()}/content/posts/*.mdx`)
  const posts = await Promise.all(
    files
      .map((filename) => filename.match(/\/([^\/]+)\.mdx$/)?.[1])
      .map(async (slug) => {
        const { metadata, default: Content } = await import(
          `/content/posts/${slug}.mdx`
        )

        // const { renderToString } = await import('react-dom/server')
        // let excerpt = renderToString(<Content />)
        //   .split('</p>')?.[0]
        //   .replace(/<[^>]*>?/gm, '')
        //   .replace('&amp;', '&')

        // if (excerpt.length === 200) {
        //   excerpt += '...'
        // }

        return { Content, slug, metadata }
      }),
  )

  posts.sort((a, b) => (a.metadata.date > b.metadata.date ? -1 : 1))

  return posts.filter((value) => value !== undefined)
}

const Page = async () => {
  const posts: { [key: string]: any }[] = await getPosts()
  // const setRef = useHeaderStyle('red')

  return (
    <main className="writing">
      <div className="writing__content">
        {/* <h1 className="writing__title">
          Random <span className="swash">thoughts</span>...
        </h1> */}
        <ul className="writing__posts">
          {posts.map(
            ({
              Content,
              excerpt,
              slug,
              metadata: { title, image, tags, date },
            }) => (
              <li key={slug} className="writing__post">
                <div className="writing__post-header">
                  {image ? (
                    <div className="writing__post-image">
                      <Image
                        src={image}
                        width="144"
                        height="96"
                        alt={title}
                        className="writing__post-image-img"
                      />
                    </div>
                  ) : (
                    <div
                      className="writing__post-image-placeholder"
                      data-title={title}
                    />
                  )}
                  <a href={`/writing/${slug}`} className="writing__post-link">
                    <h2 className="writing__post-title">{title}</h2>
                  </a>
                </div>

                <ul className="writing__post-tags">
                  {tags?.map((tag: string) => (
                    <li key={tag} className="writing__post-tag">
                      <a href={`/writing/tag/${tag}`}>{tag}</a>
                    </li>
                  ))}
                </ul>

                <p className="writing__post-excerpt content">{excerpt}</p>
              </li>
            ),
          )}
        </ul>
      </div>
    </main>
  )
}

export default Page
