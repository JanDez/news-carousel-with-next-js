import { test, expect } from "@playwright/test"

test.describe("Article Page", () => {
  test("displays article content", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("list")).toBeVisible()

    const firstArticle = page.getByRole("listitem").first().getByRole("link")
    await firstArticle.click()

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    await expect(page.getByRole("article")).toBeVisible()
  })

  test("back button returns to homepage", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("list")).toBeVisible()

    const firstArticle = page.getByRole("listitem").first().getByRole("link")
    await firstArticle.click()

    await expect(page).toHaveURL(/\/article\//)

    const backButton = page.getByRole("button", { name: /back/i })
    await backButton.click()

    await expect(page).toHaveURL("/")
  })

  test("read more link opens external source", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("list")).toBeVisible()

    const firstArticle = page.getByRole("listitem").first().getByRole("link")
    await firstArticle.click()

    const readMoreLink = page.getByRole("link", { name: /read full article/i })
    await expect(readMoreLink).toBeVisible()
    await expect(readMoreLink).toHaveAttribute("target", "_blank")
  })

  test("shows 404 for invalid article", async ({ page }) => {
    await page.goto("/article/invalid-article-slug-that-does-not-exist")

    await expect(page.getByText(/not found/i)).toBeVisible()
  })
})
