"use client"

import Image from "next/image"
import Link from "next/link"
import type { Article } from "@/types/article"
import { stripHtml, generateSlug, getFormattedTitle } from "@/lib/utils"
import styles from "./news-card.module.css"

interface NewsCardProps {
  article: Article
}

/** Individual news card with image, title, and description */
export function NewsCard({ article }: NewsCardProps) {
  const { startWords, lastWord } = getFormattedTitle(article.title)
  const truncatedDescription = stripHtml(article.description) || "No description available"
  const slug = generateSlug(article.title)

  return (
    <Link href={`/article/${slug}`} className={styles.card} aria-label={article.title}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          {article.urlToImage ? (
            <Image
              src={article.urlToImage}
              alt={article.title}
              className={styles.image}
              fill
              sizes="180px"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className={styles.placeholder}>No Image</div>
          )}
        </div>
      </div>

      <h3 className={styles.title}>
        {startWords} <span className={styles.titleBold}>{lastWord}</span>
      </h3>

      <p className={styles.description}>{truncatedDescription}</p>
    </Link>
  )
}
