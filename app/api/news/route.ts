import { NextResponse } from "next/server"
import type { Article } from "@/types/article"
import { env } from "@/lib/env"
import { API } from "@/lib/constants"
import { getDateRange, filterValidArticles } from "@/lib/api-helpers"
import { logger } from "@/lib/logger"

function createResponse(data: { articles: Article[] }, status = 200): NextResponse {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": `public, s-maxage=${API.CACHE_DURATION}, stale-while-revalidate=${API.STALE_WHILE_REVALIDATE}`,
    },
  })
}

export async function GET(): Promise<NextResponse> {
  if (!env.NEWS_API_KEY) {
    logger.error("NEWS_API_KEY environment variable is not set")
    return createResponse({ articles: [] }, 500)
  }

  try {
    const fromDate = getDateRange()
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=technology&from=${fromDate}&sortBy=popularity&apiKey=${env.NEWS_API_KEY}`,
      { 
        next: { revalidate: API.CACHE_DURATION }
      },
    )

    if (!res.ok) {
      logger.error("NewsAPI request failed", { status: res.status })
      return createResponse({ articles: [] }, res.status)
    }

    const data = await res.json()
    const validArticles = filterValidArticles(data.articles || [])

    logger.info("Fetched articles", { count: validArticles.length })
    return createResponse({ articles: validArticles.slice(0, API.MAX_ARTICLES) })
  } catch (error) {
    logger.error("Error fetching news", { error: String(error) })
    return createResponse({ articles: [] }, 500)
  }
}
