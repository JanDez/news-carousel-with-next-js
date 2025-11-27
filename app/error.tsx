"use client"

import { useEffect } from "react"
import styles from "./page.module.css"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Something went wrong!</h2>
          <p>We encountered an error while loading the page.</p>
          <button
            onClick={reset}
            style={{
              marginTop: "1rem",
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
        </div>
      </div>
    </main>
  )
}
