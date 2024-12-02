import { getPost } from '@/app/[lang]/(site)/studies/[uid]/page'
import OgImage from '@/components/og-image'

export default async function Page({
  params: { uid },
}: {
  params: { uid: string }
}) {
  const study = await getPost(uid)

  return <OgImage study={study} />
}
