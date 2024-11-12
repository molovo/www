import { CSSProperties, FC, ReactNode, createElement } from 'react'
import EighteenFiftyFiveLogo from '@/components/images/icons/1855'
import AnglepoiseLogo from '@/components/images/icons/anglepoise'
import HaresfootLogo from '@/components/images/icons/haresfoot'
import RedistributeLogo from '@/components/images/icons/redistribute'
import SuperrbLogo from '@/components/images/icons/superrb'
import You from '@/components/images/icons/you'
import VixenFitnessLogo from './images/icons/vixen-fitness'
import MatteLogo from './images/icons/matte'
import OctaevoLogo from './images/icons/octaevo'
import Joonbyrd from './images/icons/joonbyrd'
import RetainerClubLogo from './images/icons/retainer-club'

export const logoMap: { [key: string]: FC<{ style: Partial<CSSProperties> }> } =
  {
    1855: EighteenFiftyFiveLogo,
    anglepoise: AnglepoiseLogo,
    haresfoot: HaresfootLogo,
    joonbyrd: Joonbyrd,
    matte: MatteLogo,
    octaevo: OctaevoLogo,
    redistribute: RedistributeLogo,
    'retainer-club': RetainerClubLogo,
    superrb: SuperrbLogo,
    you: You,
    'vixen-fitness': VixenFitnessLogo,
  }
export type ClientSlug = keyof typeof logoMap

const ClientLogo = ({
  client,
  style = {},
}: {
  client: ClientSlug
  style?: Partial<CSSProperties>
}) => createElement(logoMap[client], { style })

export default ClientLogo
