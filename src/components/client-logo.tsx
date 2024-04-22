import { ReactNode } from 'react'
import EighteenFiftyFiveLogo from '@/components/images/icons/1855'
import AnglepoiseLogo from '@/components/images/icons/anglepoise'
import HaresfootLogo from '@/components/images/icons/haresfoot'
import RedistributeLogo from '@/components/images/icons/redistribute'
import SuperrbLogo from '@/components/images/icons/superrb'
import You from '@/components/images/icons/you'
import VixenFitnessLogo from './images/icons/vixen-fitness'
import MatteLogo from './images/icons/matte'
import Joonbyrd from './images/icons/joonbyrd'

export const logoMap: { [key: string]: ReactNode } = {
  superrb: <SuperrbLogo />,
  haresfoot: <HaresfootLogo />,
  redistribute: <RedistributeLogo />,
  1855: <EighteenFiftyFiveLogo />,
  anglepoise: <AnglepoiseLogo />,
  'vixen-fitness': <VixenFitnessLogo />,
  matte: <MatteLogo />,
  joonbyrd: <Joonbyrd />,
  you: <You />,
}
export type ClientSlug = keyof typeof logoMap

const ClientLogo = ({ client }: { client: ClientSlug }) => logoMap[client]

export default ClientLogo
