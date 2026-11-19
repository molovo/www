import { expect, test } from '@playwright/test'
import { instant } from '@next/playwright'

// A Suspense boundary around the layout hides prerender errors by falling
// back to client rendering ($RX), and delays painting the static shell.
for (const [path, text] of [
  ['/', "Hi, I'm James."],
  ['/writing/lost-at-sea', 'Lost at Sea'],
  ['/studies/joonbyrd', 'CSS variables are immensely powerful'],
  ['/feed', 'feed__item'],
]) {
  test(`${path} is server rendered`, async ({ request }) => {
    const html = await (await request.get(path)).text()

    expect(html).not.toContain('$RX(')
    expect(html).not.toContain('loading-spinner')
    expect(html.replace(/&#x27;|&apos;/g, "'")).toContain(text)
  })
}

test('home → case study is instant', async ({ page }) => {
  await page.goto('/')

  await instant(page, async () => {
    await page.locator('main a[href="/studies/joonbyrd"]').first().click()
    await page.waitForURL('**/studies/joonbyrd')
    await expect(page.locator('.loading-spinner')).toHaveCount(0)
    await expect(
      page.getByText('CSS variables are immensely powerful').first(),
    ).toBeVisible()
  })
})

test('writing → article is instant', async ({ page }) => {
  await page.goto('/writing')

  await instant(page, async () => {
    await page.locator('a[href="/writing/lost-at-sea"]').first().click()
    await page.waitForURL('**/writing/lost-at-sea')
    await expect(page.locator('h1.article__title')).toContainText('Lost at Sea')
    await expect(page.locator('.article__content')).toBeVisible()
  })

  // Webmentions are deferred until navigation, so they arrive afterwards
  await expect(page.locator('.mentions')).toBeVisible()
})

test('menu → case study is instant', async ({ page }) => {
  await page.goto('/writing')
  await page.locator('[class*=menu-toggle]').first().click()

  await instant(page, async () => {
    await page.locator('.menu a[href="/studies/redistribute"]').first().click()
    await page.waitForURL('**/studies/redistribute')
    await expect(page.locator('.loading-spinner')).toHaveCount(0)
    await expect(page.locator('.case-study__section-title').first()).toBeVisible()
  })
})

test('hero CTA opens the contact form', async ({ page }) => {
  await page.goto('/')
  await page.locator('main .case-study-cta').first().click()

  await page.waitForTimeout(2000)
  await expect(page.locator('section.contact')).toHaveAttribute(
    'aria-hidden',
    'false',
  )
})
