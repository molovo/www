import { ClientSlug } from '@/components/client-logo'
import { getStudy } from '@/data/studies'

const getClientForSSR = async (
  pathname: string,
): Promise<ClientSlug | undefined> => {
  if (pathname.startsWith('/studies')) {
    const slug = pathname.split('/')[2]
    const study = await getStudy(slug)

    if (!study) {
      return
    }

    return study.slug
  }
}

export default getClientForSSR
