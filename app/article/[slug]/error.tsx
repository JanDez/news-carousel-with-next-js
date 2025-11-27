"use client"

import { useEffect } from "react"
import Link from "next/link"
import styles from "./page.module.css"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ArticleError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Article error:", error)
  }, [error])

  return (
    <main className={styles.main}>
      <article className={styles.article}>
        <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
          <h1 style={{ 
            fontSize: "2rem", 
            marginBottom: "1rem",
            fontFamily: "var(--font-montserrat), sans-serif",
          }}>
            Failed to load article
          </h1>
          <p style={{ 
            color: "#666", 
            marginBottom: "2rem",
            fontFamily: "var(--font-poppins), sans-serif",
          }}>
            We encountered an error while loading this article.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button
              onClick={reset}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#1a1a1a",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            >
              Try again
            </button>
            <Link
              href="/"
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#fff",
                color: "#1a1a1a",
                border: "1px solid #1a1a1a",
                borderRadius: "4px",
                textDecoration: "none",
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
