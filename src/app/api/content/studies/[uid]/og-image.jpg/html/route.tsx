import { getPost } from '@/app/(site)/studies/[uid]/page'
import OgImage from '@/components/og-image'
import { renderToString } from 'react-dom/server'

export async function GET(
  request: Request,
  { params: { uid } }: { params: { uid: string } },
) {
  const study = await getPost(uid)

  return renderToString(<OgImage study={study} />)
}
