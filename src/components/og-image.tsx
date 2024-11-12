import Image from 'next/image'
import Logo from './logo'
import '@/stylesheets/main.sass'
import CaseStudyType from '@/types/case-study'

interface Props {
  study: CaseStudyType
}

const OgImage = ({ study }: Props) => (
  <html
    style={{
      height: '630px',
      position: 'relative',
      width: '1200px',
    }}
  >
    <body className="og-image">
      <div
        className="og-image__background"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <Image
          src={study.thumbnail}
          alt=""
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      <Logo
        client={study.slug}
        style={{
          color: study.styles?.thumbnailTitle?.color,
          fontSize: '4em',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </body>
  </html>
)

export default OgImage
