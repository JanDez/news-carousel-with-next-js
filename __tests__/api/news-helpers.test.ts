import { getDateRange, filterValidArticles } from "@/lib/api-helpers"
import type { Article } from "@/types/article"

describe("API Route Helpers", () => {
  describe("getDateRange", () => {
    it("returns a date string in YYYY-MM-DD format", () => {
      const result = getDateRange()
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })

    it("returns a date 7 days ago", () => {
      const result = getDateRange()
      const resultDate = new Date(result)
      const today = new Date()
      const diffDays = Math.round((today.getTime() - resultDate.getTime()) / (1000 * 60 * 60 * 24))
      
      expect(diffDays).toBeGreaterThanOrEqual(6)
      expect(diffDays).toBeLessThanOrEqual(8)
    })
  })

  describe("filterValidArticles", () => {
    const validArticle: Article = {
      title: "Valid Article",
      description: "Has all required fields",
      urlToImage: "https://example.com/image.jpg",
      url: "https://example.com",
      source: { id: "test", name: "Test" },
      author: "Author",
      publishedAt: "2024-01-01T00:00:00Z",
      content: "Content",
    }

    it("keeps articles with all required fields", () => {
      const result = filterValidArticles([validArticle])
      expect(result).toHaveLength(1)
    })

    it("filters out articles without urlToImage", () => {
      const noImage = { ...validArticle, urlToImage: null }
      const result = filterValidArticles([noImage])
      expect(result).toHaveLength(0)
    })

    it("filters out articles without title", () => {
      const noTitle = { ...validArticle, title: "" }
      const result = filterValidArticles([noTitle])
      expect(result).toHaveLength(0)
    })

    it("filters out articles without description", () => {
      const noDesc = { ...validArticle, description: null }
      const result = filterValidArticles([noDesc])
      expect(result).toHaveLength(0)
    })

    it("handles empty array", () => {
      const result = filterValidArticles([])
      expect(result).toHaveLength(0)
    })

    it("filters mixed valid and invalid articles", () => {
      const articles = [
        validArticle,
        { ...validArticle, urlToImage: null },
        { ...validArticle, title: "Another Valid", description: "Also valid" },
        { ...validArticle, title: "" },
      ]
      const result = filterValidArticles(articles as Article[])
      expect(result).toHaveLength(2)
    })
  })
})
