export const dynamic = 'force-static'

import fs from 'fs'
import mime from 'mime'
import { ImageResponse } from 'next/og'
import LogoImage from '@/components/images/icons/logo'
import ClientLogo from '@/components/client-logo'
import { getPost } from '@/app/(site)/studies/[uid]/page'
import { glob } from 'glob'

export async function GET(
  request: Request,
  { params: { uid } }: { params: { uid: string } },
) {
  {
    /*
  const haveHeart = fs.readFileSync(
    `${process.cwd()}/src/fonts/Have Heart One.otf`,
  )
  const filename = (
    await glob(`${process.cwd()}/src/images/studies/${uid}/thumbnail.*`)
  )[0]

  const backgroundImage = fs.readFileSync(filename)
  const mimeType = mime.getType(filename.split('.').pop())
  const study = await getPost(uid)

  return new ImageResponse(
    (
      <>
        <div
          className="wrapper"
          style={{
            alignItems: 'center',
            backgroundImage: `url(data:${mimeType};base64,${backgroundImage.toString(
              'base64',
            )})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            color: study.styles?.thumbnailTitle?.color,
          }}
        >
          <div
            className="logo"
            style={{
              alignItems: 'center',
              display: 'flex',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <LogoImage style={{ fill: study.styles?.thumbnailTitle?.color }} />
            <span
              className="logo__separator"
              style={{
                color: study.styles?.thumbnailTitle?.color,
                fontFamily: 'Have Heart One',
                fontSize: '6em',
                lineHeight: '0.01em',
                margin: '0 0.25em .125em',
              }}
            >
              +
            </span>
            <div
              className="logo__client"
              style={{
                display: 'flex',
              }}
            >
              <ClientLogo
                client={uid}
                style={{ fill: study.styles?.thumbnailTitle?.color }}
              />
            </div>
          </div>
        </div>
      </>
    ),
    {
      fonts: [
        {
          data: haveHeart,
          name: 'Have Heart One',
          weight: 400,
          style: 'normal',
        },
      ],
    },
  )
  */
  }

  const puppeteer = await import('puppeteer')

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 630 })
  await page.goto(
    `http://localhost:3000/api/content/studies/${uid}/og-image.jpg/html`,
    {
      waitUntil: 'networkidle2',
    },
  )
  const image = await page.screenshot()
  await page.close()
  await browser.close()

  return new Response(image, {
    headers: { 'Content-Type': 'image/jpg' },
  })
}
