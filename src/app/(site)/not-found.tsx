'use client'

import Link from '@/components/link'
import useHeaderStyle from '@/hooks/use-header-style'
import image from '@/images/errors/404.webp'
import Image from '@/components/image'
import { usePathname } from 'next/navigation'

export const metadata = {
  title: 'Not Found',
  description: 'Page not found',
}

export const generateStaticParams = async () => [{ lang: 'en' }]

const NotFound = () => {
  const pathname = usePathname()
  const setRef = useHeaderStyle('red')

  return (
    <section className="error" ref={setRef}>
      <div className="error__content">
        <h1 className="error__title">404</h1>
        <h2 className="error__subtitle">Oh! Are you lost?</h2>
        <p className="error__message">
          This page doesn’t seem to exist any more. If you could please take a
          second to{' '}
          <Link
            href={`https://bsky.app/intent/compose?text=@molovo.co I just found a
            missing page on your site at this url :: https://molovo.co${pathname}`}
            target="_blank"
            rel="nofollow noopenner noreferrer"
          >
            let me know
          </Link>
          , that would be a big help.
        </p>

        <p className="error__message">
          For now, please try heading <Link href="/">back to the homepage</Link>
          .
        </p>
      </div>

      <figure className="error__image">
        <Image src={image} alt="404" loading="eager" zoomable={false} />
      </figure>
    </section>
  )
}

export default NotFound
