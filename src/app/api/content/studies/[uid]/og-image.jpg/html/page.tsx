import OgImage from '@/components/og-image'
import { getStudy } from '@/data/studies'
import { notFound } from 'next/navigation'

export default async function Page({
  params: { uid },
}: {
  params: { uid: string }
}) {
  const study = await getStudy(uid)

  if (!study) {
    notFound()
  }

  return <OgImage study={study} />
}
