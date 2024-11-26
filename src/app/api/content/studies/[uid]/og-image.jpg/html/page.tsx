import { getPost } from '@/app/(site)/studies/[uid]/page'
import OgImage from '@/components/og-image'

export default async function Page({
  params: { uid },
}: {
  params: { uid: string }
}) {
  const study = await getPost(uid)

  return <OgImage study={study} />
}
