import GithubIcon from '@/components/images/icons/social/github.svg'
import TwitterIcon from '@/components/images/icons/social/twitter.svg'
import DribbbleIcon from '@/components/images/icons/social/dribbble.svg'
import BSkyIcon from '@/components/images/icons/social/bsky.svg'
import Link from '@/components/link'

const services = {
  github: {
    url: 'https://github.com/molovo',
    icon: <GithubIcon />,
  },
  bluesky: {
    url: 'https://bsky.app/profile/molovo.co',
    icon: <BSkyIcon />,
  },
  dribbble: {
    url: 'https://dribbble.com/molovo',
    icon: <DribbbleIcon />,
  },
  twitter: {
    url: 'https://twitter.com/molovo',
    icon: <TwitterIcon />,
  },
}

const Social = ({ label }: { label?: string }) => (
  <nav className="social">
    {label && <span className="social__label">{label}</span>}

    <ul className="social__icons">
      {Object.entries(services).map(([name, { url, icon }]) => (
        <li className="social__icon" key={name}>
          <Link href={url} aria-label={name} className="social__link">
            {icon}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)

export default Social
