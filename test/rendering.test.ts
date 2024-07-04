import { describe, expect, test, afterAll } from 'vitest'
import { setup, $fetch, createPage, url } from '@nuxt/test-utils/e2e'
import { fileURLToPath } from 'url'

describe('test module', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  test('renders nuxtRating component', async () => {
    console.log('tests')

    const html = await $fetch('/')
    expect(html).toContain('class="nuxt-rating-wrapper"')
    console.log('html', html.res)
  })

  describe('test module with playwright', async () => {
    const page = await createPage()

    test('is rendering', async () => {
      await page.goto(url('/'), { waitUntil: 'networkidle' })

      const element = await page.$('.nuxt-rating-wrapper')
      expect(element).not.toBeNull()

      const svgElement = await page.$('.nuxt-rating-star-svg')
      expect(svgElement).not.toBeNull()
    })

    test('clicks on the third star and verifies ratingSelected event', async () => {
      const stars = await page.$$('.nuxt-rating-star-svg')
      const thirdStar = stars[2]
      expect(thirdStar).not.toBeNull()
      await thirdStar.click()

      const ratingValue = await page.$('.rating-value')
      expect(ratingValue).not.toBeNull()
      const textContent = await ratingValue.innerText()
      expect(textContent).toContain('3')

    })

    afterAll(async () => {
      await page.close()
    })
  })
})
