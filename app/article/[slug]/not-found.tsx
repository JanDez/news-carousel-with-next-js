import Link from "next/link"
import styles from "./page.module.css"

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.error}>
        <h1>Article Not Found</h1>
        <p>The article you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/" className={styles.backButton}>
          Back to Home
        </Link>
      </div>
    </main>
  )
}
