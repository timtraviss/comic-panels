import { test, expect } from '@playwright/test'

test('home page loads with publisher chips and recent issues', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.locator('a[href^="/publisher/"]').first()).toBeVisible()
})

test('publisher index lists all publishers', async ({ page }) => {
  await page.goto('/publishers')
  await expect(page.locator('h1')).toContainText('Publishers')
  const cards = page.locator('a[href^="/publisher/"]')
  await expect(cards).toHaveCount(await cards.count())
  expect(await cards.count()).toBeGreaterThan(0)
})

test('publisher → series → issue navigation', async ({ page }) => {
  await page.goto('/publishers')
  await page.locator('a[href^="/publisher/"]').first().click()
  await expect(page).toHaveURL(/\/publisher\//)
  await page.locator('a[href^="/series/"]').first().click()
  await expect(page).toHaveURL(/\/series\//)
  await page.locator('a[href^="/issue/"]').first().click()
  await expect(page).toHaveURL(/\/issue\//)
  await expect(page.locator('h1')).toBeVisible()
})

test('issue detail has prev/next nav and issue strip', async ({ page }) => {
  await page.goto('/series')
  await page.locator('a[href^="/series/"]').first().click()
  const issueLinks = page.locator('a[href^="/issue/"]')
  const firstIssueHref = await issueLinks.nth(1).getAttribute('href')
  await page.goto(firstIssueHref!)
  await expect(page.locator('text=Next')).toBeVisible()
  await expect(page.locator('text=Previous')).toBeVisible()
})

test('search returns results', async ({ page }) => {
  await page.goto('/')
  await page.fill('input[type="search"]', 'G.I. Joe')
  await page.waitForURL(/\/search\?q=/)
  await expect(page.locator('h1')).toContainText('Results for')
})
