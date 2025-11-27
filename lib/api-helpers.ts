import type { Article } from "@/types/article"

/** Returns date 7 days ago in YYYY-MM-DD format */
export function getDateRange(): string {
  const today = new Date()
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  return weekAgo.toISOString().split("T")[0]
}

/** Filters articles that have all required display fields */
export function filterValidArticles(articles: Article[]): Article[] {
  return articles.filter((a) => a.urlToImage && a.title && a.description)
}
