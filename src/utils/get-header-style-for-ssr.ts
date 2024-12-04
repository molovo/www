import { getPost } from '@/data/posts'
import { getStudy } from '@/data/studies'
import { Color, HeaderStyle } from '@/store/theme'

const getHeaderStyleForSSR = async (pathname: string) => {
  if (pathname === '/') {
    return { headerStyle: 'white' as HeaderStyle }
  }

  if (pathname.startsWith('/studies')) {
    const slug = pathname.split('/')[2]
    const study = await getStudy(slug)

    return {
      headerStyle: study?.sections[0]?.headerStyle as HeaderStyle,
      headerColor: study?.sections[0]?.headerColor as Color,
    }
  }

  if (pathname.startsWith('/writing')) {
    const slug = pathname.split('/')[2]

    if (!slug) {
      return { headerStyle: 'red' as HeaderStyle }
    }

    const post = await getPost(slug)

    return {
      headerStyle: post?.headerStyle || ('red' as HeaderStyle),
      headerColor: post?.headerColor as Color,
    }
  }

  return {
    headerStyle: 'red' as HeaderStyle,
  }
}

export default getHeaderStyleForSSR
