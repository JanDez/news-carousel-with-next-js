"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import type { Article } from "@/types/article"
import {
  stripHtml,
  formatDate,
  formatTime,
  getFormattedTitle,
  getReadingTime,
} from "@/lib/utils"
import { ChevronLeftIcon, ExternalLinkIcon } from "@/components/icons"
import styles from "./page.module.css"

interface ArticleContentProps {
  article: Article
}

export function ArticleContent({ article }: ArticleContentProps) {
  const router = useRouter()
  const { startWords, lastWord } = getFormattedTitle(article.title)
  const readingTime = getReadingTime(article.content, article.description)

  return (
    <main className={styles.main}>
      <article className={styles.article} itemScope itemType="https://schema.org/NewsArticle">
        <button onClick={() => router.push("/")} className={styles.backLink}>
          <ChevronLeftIcon />
          Back to News
        </button>

        <div className={styles.heroImage}>
          {article.urlToImage ? (
            <Image
              src={article.urlToImage}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              style={{ objectFit: "cover" }}
              itemProp="image"
              priority
            />
          ) : (
            <div className={styles.placeholder}>No Image Available</div>
          )}
        </div>

        <h1 className={styles.title} itemProp="headline">
          {startWords} <span className={styles.titleBold}>{lastWord}</span>
        </h1>

        <div className={styles.meta}>
          <span className={styles.source} itemProp="publisher" itemScope itemType="https://schema.org/Organization">
            <span itemProp="name">{article.source.name}</span>
          </span>
          <span className={styles.separator}>•</span>
          <time 
            className={styles.date} 
            dateTime={article.publishedAt}
            itemProp="datePublished"
          >
            {formatDate(article.publishedAt)}
          </time>
          <span className={styles.separator}>•</span>
          <span className={styles.time}>{formatTime(article.publishedAt)}</span>
          {article.author && (
            <>
              <span className={styles.separator}>•</span>
              <span className={styles.author} itemProp="author" itemScope itemType="https://schema.org/Person">
                By <span itemProp="name">{article.author}</span>
              </span>
            </>
          )}
          <span className={styles.separator}>•</span>
          <span className={styles.readTime}>{readingTime} min read</span>
        </div>

        <div className={styles.content}>
          <p className={styles.description} itemProp="description">
            {stripHtml(article.description)}
          </p>
          
          <div className={styles.bodyText} itemProp="articleBody">
            {stripHtml(article.content?.replace(/\[\+\d+ chars\]/, "")) || stripHtml(article.description)}
          </div>

          <h2 className={styles.subheading}>About {article.source.name}</h2>
          
          <p className={styles.bodyText}>
            {stripHtml(article.content?.replace(/\[\+\d+ chars\]/, "")) || "Read the full article for more details."}
          </p>

          {article.urlToImage && (
            <div className={styles.secondaryImage}>
              <Image
                src={article.urlToImage}
                alt={`${article.title} - additional image`}
                width={700}
                height={400}
                style={{ objectFit: "cover", width: "100%", height: "auto" }}
              />
            </div>
          )}
        </div>

        <div className={styles.articleFooter}>
          <div className={styles.sourceInfo}>
            <span className={styles.sourceLabel}>Source:</span>
            <span className={styles.sourceName}>{article.source.name}</span>
            {article.source.id && (
              <span className={styles.sourceId}>({article.source.id})</span>
            )}
          </div>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.readMore}
            itemProp="url"
          >
            Read Full Article on {article.source.name}
            <ExternalLinkIcon />
          </a>
        </div>
      </article>
    </main>
  )
}
