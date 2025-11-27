import { test, expect } from "@playwright/test"

test.describe("Homepage", () => {
  test("loads and displays carousel", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByRole("heading", { name: /what is the/i })).toBeVisible()
    await expect(page.getByRole("heading", { name: /speciality of us/i })).toBeVisible()

    await expect(page.getByRole("list")).toBeVisible()
  })

  test("carousel navigation buttons work", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByRole("list")).toBeVisible()

    const nextButton = page.getByRole("button", { name: /next/i })
    const prevButton = page.getByRole("button", { name: /previous/i })

    await expect(nextButton).toBeVisible()
    await expect(prevButton).toBeVisible()

    await nextButton.click()
    await prevButton.click()
  })

  test("clicking article navigates to detail page", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByRole("list")).toBeVisible()

    const firstArticle = page.getByRole("listitem").first().getByRole("link")
    await firstArticle.click()

    await expect(page).toHaveURL(/\/article\//)
  })

  test("keyboard navigation works", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByRole("list")).toBeVisible()

    const navGroup = page.getByRole("group", { name: /carousel navigation/i })
    await navGroup.focus()

    await page.keyboard.press("ArrowRight")
    await page.keyboard.press("ArrowLeft")
  })
})
