import styles from "./page.module.css"

export default function Loading() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Loading news...</p>
        </div>
      </div>
    </main>
  )
}
