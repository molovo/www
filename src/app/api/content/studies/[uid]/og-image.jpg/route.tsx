import { unstable_cache } from 'next/cache'

export const dynamic = 'error'
export const dynamicParams = false

const getScreenshot = async (uid: string) => {
  const puppeteer = await import('puppeteer')

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 630 })
  await page.goto(
    `https://molovo.co/api/content/studies/${uid}/og-image.jpg/html`,
    {
      waitUntil: 'networkidle2',
    },
  )
  const image = await page.screenshot()
  await page.close()
  await browser.close()

  return image
}

export async function GET(
  request: Request,
  { params: { uid } }: { params: { uid: string } },
) {
  const screenshot = await getScreenshot(uid)

  return new Response(screenshot, {
    headers: {
      'Cache-Control': 'public, max-age=15552000',
      'Content-Type': 'image/jpg',
    },
  })
}