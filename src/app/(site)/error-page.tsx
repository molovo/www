'use client'

import Link from '@/components/link'
import image from '@/images/errors/500.gif'
import Image from 'next/image'

export const metadata = {
  title: 'Server Error',
  description: 'Something went wrong',
}

const ErrorPage = () => {
  return (
    <section className="error">
      <div className="error__content">
        <h1 className="error__title">500</h1>
        <h2 className="error__subtitle">Crumbs! Something went wrong.</h2>
        <p className="error__message">
          This page has caused an error. How embarassing. Please try again
          later.
        </p>

        <p className="error__message">
          For now, please try heading <Link href="/">back to the homepage</Link>.
        </p>
      </div>

      <figure className="error__image">
        <Image src={image} alt="500" />
      </figure>
    </section>
  )
}

export default ErrorPage
