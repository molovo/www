export const dynamic = 'force-static'

export async function GET(
  request: Request,
  { params: { uid } }: { params: { uid: string } },
) {
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
