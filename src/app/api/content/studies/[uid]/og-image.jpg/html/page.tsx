import OgImage from '@/components/og-image'
import { getStudies, getStudy } from '@/data/studies'
import { notFound } from 'next/navigation'

// Only ever loaded directly by the OG image generator, never navigated to
export const instant = false

export const generateStaticParams = async () =>
  (await getStudies()).map(({ slug }) => ({ uid: slug }))

export default async function Page({
  params,
}: {
  params: Promise<{ uid: string }>
}) {
  const { uid } = await params
  const study = await getStudy(uid)

  if (!study) {
    notFound()
  }

  return <OgImage study={study} />
}
