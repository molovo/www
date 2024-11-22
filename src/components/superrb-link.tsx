import SuperrbLogo from '@/components/images/icons/clients/superrb'
import Link from '@/components/link'

const SuperrbLink = () => (
  <Link href="https://www.superrb.com">
    <SuperrbLogo />
    <span className="screenreader-text">Superrb</span>
  </Link>
)

export default SuperrbLink
