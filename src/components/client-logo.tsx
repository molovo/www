import { CSSProperties, FC, ReactNode, createElement } from 'react'
import EighteenFiftyFiveLogo from '@/components/images/icons/clients/1855'
import AnglepoiseLogo from '@/components/images/icons/clients/anglepoise'
import HaresfootLogo from '@/components/images/icons/clients/haresfoot'
import RedistributeLogo from '@/components/images/icons/clients/redistribute'
import SuperrbLogo from '@/components/images/icons/clients/superrb'
import You from '@/components/images/icons/you'
import VixenFitnessLogo from '@/components/images/icons/clients/vixen-fitness'
import MatteLogo from '@/components/images/icons/clients/matte'
import OctaevoLogo from '@/components/images/icons/clients/octaevo'
import Joonbyrd from '@/components/images/icons/clients/joonbyrd'
import RetainerClubLogo from '@/components/images/icons/clients/retainer-club'

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
