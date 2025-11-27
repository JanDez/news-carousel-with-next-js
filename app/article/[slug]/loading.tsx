import styles from "./page.module.css"

export default function ArticleLoading() {
  return (
    <main className={styles.main}>
      <article className={styles.article}>
        <div 
          style={{ 
            width: "120px", 
            height: "20px", 
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
            marginBottom: "2rem",
          }} 
        />
        
        <div 
          className={styles.heroImage}
          style={{ 
            backgroundColor: "#e0e0e0",
          }} 
        />
        
        <div 
          style={{ 
            width: "80%", 
            height: "40px", 
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
            marginBottom: "1rem",
          }} 
        />
        
        <div 
          style={{ 
            width: "60%", 
            height: "20px", 
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
            marginBottom: "2rem",
          }} 
        />
        
        <div className={styles.content}>
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              style={{ 
                width: "100%", 
                height: "16px", 
                backgroundColor: "#e0e0e0",
                borderRadius: "4px",
                marginBottom: "0.75rem",
              }} 
            />
          ))}
        </div>
      </article>
    </main>
  )
}
