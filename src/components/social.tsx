import GithubIcon from '@/components/images/icons/github.svg'
import TwitterIcon from '@/components/images/icons/twitter.svg'
import MastodonIcon from '@/components/images/icons/mastodon.svg'

const services = {
  github: {
    url: 'https://github.com/molovo',
    icon: <GithubIcon />,
  },
  twitter: {
    url: 'https://twitter.com/molovo',
    icon: <TwitterIcon />,
  },
  mastodon: {
    url: 'https://mastodon.social/@molovo',
    icon: <MastodonIcon />,
  },
}

const Social = () => (
  <nav className="social">
    <ul className="social__icons">
      {Object.entries(services).map(([name, { url, icon }]) => (
        <li className="social__icon" key={name}>
          <a
            href={url}
            aria-label={name}
            target="_blank"
            rel="noopener"
            className="social__link"
          >
            {icon}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)

export default Social
