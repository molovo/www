import Image from '@/components/image'
import mediumLogo from '@/images/icons/medium.jpg'
import { format } from 'date-fns'
import LineBreak from '@/components/line-break'
import { StaticImageData } from 'next/image'

interface Webmention {
  type: string
  author: {
    name: string
    photo: string
    url: string
  }
  url: string
  published?: string
  'wm-received': string
  'wm-id': string
  'wm-source': string
  'wm-target': string
  'wm-property': string
  'wm-private': boolean
  'like-of'?: string
  'repost-of'?: string
  content?: {
    text: string
  }
}

enum WebmentionType {
  like = 'like-of',
  repost = 'repost-of',
  reply = 'in-reply-to',
  mention = 'mention-of',
  medium = 'medium',
}

const getWebmentions = async (slug: string): Promise<Webmention[]> => {
  if (!slug) {
    return []
  }

  const url = `https://molovo.co/writing/${slug}`

  const children = await Promise.all(
    [url, `${url}/`].map(async (url) => {
      const response = await fetch(
        `https://webmention.io/api/mentions.jf2?https://molovo.co&target=${url}&token=CBAYi5A6v0quKomQOHrG_g`,
      )
      const responseData = await response.json()
      const { children } = responseData

      return children
    }),
  )

  return children.flat()
}

const WebmentionItem = ({
  image,
  name,
  text,
  additionalText,
  imageAlt = name,
}: {
  image: string | StaticImageData
  text: string
  name?: string
  additionalText?: string
  imageAlt?: string
}) => (
  <li className="mentions__item">
    <Image
      className="mentions__image"
      src={image}
      width="100"
      height="100"
      alt={imageAlt as string}
      sizes="5em"
      zoomable={false}
    />
    <p
      dangerouslySetInnerHTML={{
        __html: `${name ? `<strong>${name}</strong>` : ''} ${text}`,
      }}
    />

    {additionalText && <p>{additionalText}</p>}
  </li>
)

const Webmentions = async ({ slug }: { slug: string }) => {
  let webmentions = []
  try {
    webmentions = (await getWebmentions(slug)).map((mention) => {
      mention['wm-received'] = format(
        new Date(mention['wm-received']),
        'do MMMM yyyy',
      )
      if (mention['wm-source'].includes('medium.com')) {
        return {
          ...mention,
          'wm-property': WebmentionType.medium,
        }
      }

      return mention
    })
  } catch (error) {
    console.error(error)
    return null
  }

  if (webmentions.length === 0) {
    return null
  }

  const mediumPosts = webmentions.filter(
    (mention) => mention['wm-property'] === WebmentionType.medium,
  )
  const replies = webmentions.filter(
    (mention) =>
      mention['wm-property'] === WebmentionType.reply &&
      mention.author?.name !== undefined,
  )
  const mentions = webmentions.filter(
    (mention) =>
      mention['wm-property'] === WebmentionType.mention &&
      mention.author?.name !== undefined,
  )
  const likes = webmentions.filter(
    (mention) =>
      mention['wm-property'] === WebmentionType.like &&
      mention.author?.name !== undefined,
  )
  const reposts = webmentions.filter(
    (mention) =>
      mention['wm-property'] === WebmentionType.repost &&
      mention.author?.name !== undefined,
  )

  return (
    <>
      <LineBreak />

      <aside className="mentions">
        <ul className="mentions__items">
          {mediumPosts.map((mention) => (
            <WebmentionItem
              key={mention['wm-id']}
              image={mediumLogo}
              imageAlt={'medium.com'}
              name={undefined}
              text={`<a href="${mention.url}" target="_blank" rel="noopener">Posted on medium.com</a> on ${mention['wm-received']}`}
            />
          ))}
          {replies.map((mention) => (
            <WebmentionItem
              key={mention['wm-id']}
              image={mention.author.photo}
              name={mention.author.name}
              text={`<a href="${mention.url}" target="_blank" rel="noopener">replied</a> on ${mention['wm-received']}`}
              additionalText={mention.content?.text}
            />
          ))}
          {mentions.map((mention) => (
            <WebmentionItem
              key={mention['wm-id']}
              image={mention.author.photo}
              name={mention.author.name}
              text={`<a href="${mention.url}" target="_blank" rel="noopener">mentioned</a> on ${mention['wm-received']}`}
              additionalText={mention.content?.text}
            />
          ))}
          {likes.map((mention) => (
            <WebmentionItem
              key={mention['wm-id']}
              image={mention.author.photo}
              name={mention.author.name}
              text={`<a href="${mention.url}" target="_blank" rel="noopener">liked</a> on ${mention['wm-received']}`}
            />
          ))}
          {reposts.map((mention) => (
            <WebmentionItem
              key={mention['wm-id']}
              image={mention.author.photo}
              name={mention.author.name}
              text={`<a href="${mention.url}" target="_blank" rel="noopener">reposted</a> on ${mention['wm-received']}`}
            />
          ))}
        </ul>
      </aside>
    </>
  )
}

export default Webmentions
