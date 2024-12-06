import { CSSProperties, ComponentType, SVGProps, createElement } from 'react'
import dynamic from 'next/dynamic'

export const logoMap: {
  [key: string]: ComponentType<SVGProps<SVGSVGElement>>
} = {
  '1855': dynamic(() => import('@icons/clients/1855')),
  anglepoise: dynamic(
    () => import('@icons/clients/anglepoise'),
  ),
  haresfoot: dynamic(
    () => import('@icons/clients/haresfoot'),
  ),
  joonbyrd: dynamic(() => import('@icons/clients/joonbyrd')),
  matte: dynamic(() => import('@icons/clients/matte')),
  octaevo: dynamic(() => import('@icons/clients/octaevo')),
  redistribute: dynamic(
    () => import('@icons/clients/redistribute'),
  ),
  'retainer-club': dynamic(
    () => import('@icons/clients/retainer-club'),
  ),
  superrb: dynamic(() => import('@icons/clients/superrb')),
  you: dynamic(() => import('@icons/you')),
  'vixen-fitness': dynamic(
    () => import('@icons/clients/vixen-fitness'),
  ),
}

export const clientNameMap: { [key: string]: string } = {
  '1855': '1855',
  anglepoise: 'Anglepoise',
  haresfoot: 'Haresfoot Craft Beer',
  joonbyrd: 'Joonbyrd',
  matte: 'Matte!',
  octaevo: 'Octaevo',
  redistribute: 'Redistribute Magazine',
  'retainer-club': 'Retainer Club',
  superrb: 'Superrb',
  you: 'You',
  'vixen-fitness': 'Vixen Fitness',
}
export type ClientSlug = keyof typeof logoMap

const ClientLogo = ({
  client,
  style = {},
}: {
  client: ClientSlug
  style?: Partial<CSSProperties>
}) => {
  if (!client) {
    return null
  }

  return createElement<SVGProps<SVGSVGElement>>(logoMap[client], {
    style,
    role: 'img',
    'aria-label': clientNameMap[client],
  })
}

export default ClientLogo
