import image from '@/images/errors/404.gif'
import Image from 'next/image'

export const metadata = {
  title: 'Not Found',
  description: 'Page not found',
}

const Page = async () => (
  <section className="error">
    <div className="error__content">
      <h1 className="error__title">404</h1>
      <p className="error__message">Page not found</p>
    </div>

    <figure className="error__image">
      <Image src={image} alt="404" />
    </figure>
  </section>
)

export default Page
