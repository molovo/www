import { getPost } from '@/app/(site)/studies/[uid]/page'
import OgImage from '@/components/og-image'

const Page = async ({ params: { uid } }: { params: { uid: string } }) => {
  const study = await getPost(uid)

  return <OgImage study={study} />
}

export default Page
