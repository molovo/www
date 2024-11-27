'use client'

import image from '@/images/errors/404.gif'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export const metadata = {
  title: 'Not Found',
  description: 'Page not found',
}

const Page = () => {
  const pathname = usePathname()

  return (
    <section className="error">
      <div className="error__content">
        <h1 className="error__title">404</h1>
        <h2 className="error__subtitle">Oh! Are you lost?</h2>
        <p className="error__message">
          This page doesn’t seem to exist any more. If you could please take a
          second to{' '}
          <a
            href={`https://bsky.app/intent/compose?text=@molovo.co I just found a
            missing page on your site at this url :: https://molovo.co${pathname}`}
            target="_blank"
            rel="nofollow noopenner noreferrer"
          >
            let me know
          </a>
          , that would be a big help.
        </p>

        <p className="error__message">
          For now, please try heading <a href="/">back to the homepage</a>.
        </p>
      </div>

      <figure className="error__image">
        <Image src={image} alt="404" />
      </figure>
    </section>
  )
}

export default Page
