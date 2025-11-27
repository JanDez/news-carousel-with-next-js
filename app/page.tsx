import { Suspense } from "react"
import { NewsCarousel } from "@/components/news-carousel"
import type { Article } from "@/types/article"
import styles from "./page.module.css"

async function getNews(): Promise<Article[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/news`, {
      next: { revalidate: 300 },
    })

    if (!res.ok) return []

    const data = await res.json()
    return data.articles || []
  } catch {
    return []
  }
}

async function NewsSection() {
  const articles = await getNews()

  if (articles.length === 0) {
    return (
      <div className={styles.error}>
        <p>No news available. Please try again later.</p>
      </div>
    )
  }

  return <NewsCarousel articles={articles} />
}

function CarouselSkeleton() {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner} />
      <p>Loading news...</p>
    </div>
  )
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.titleLight}>What is the</h1>
          <h2 className={styles.titleBold}>Speciality of us?</h2>
        </header>

        <Suspense fallback={<CarouselSkeleton />}>
          <NewsSection />
        </Suspense>
      </div>
    </main>
  )
}
