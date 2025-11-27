"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { NewsCard } from "./news-card"
import { ChevronLeftIcon, ChevronRightIcon } from "./icons"
import type { Article } from "@/types/article"
import { CAROUSEL, BREAKPOINTS, EDGE_ZONE_WIDTHS, ANIMATION } from "@/lib/constants"
import styles from "./news-carousel.module.css"

interface NewsCarouselProps {
  articles: Article[]
}

/** Infinite scroll carousel with blur effect on edge cards */
export function NewsCarousel({ articles }: NewsCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const [cardStates, setCardStates] = useState<Record<number, "edge" | "center">>({})
  const [activeIndex, setActiveIndex] = useState(0)

  const extendedArticles = [...articles, ...articles, ...articles]

  const getEdgeZoneWidth = useCallback(() => {
    if (typeof window === "undefined") return EDGE_ZONE_WIDTHS.DESKTOP_LARGE
    const width = window.innerWidth
    if (width < BREAKPOINTS.MOBILE) return EDGE_ZONE_WIDTHS.MOBILE
    if (width < BREAKPOINTS.TABLET) return EDGE_ZONE_WIDTHS.TABLET
    if (width < BREAKPOINTS.DESKTOP) return EDGE_ZONE_WIDTHS.DESKTOP_SMALL
    return EDGE_ZONE_WIDTHS.DESKTOP_LARGE
  }, [])

  const updateCardStates = useCallback(() => {
    if (!carouselRef.current) return

    const carousel = carouselRef.current
    const carouselRect = carousel.getBoundingClientRect()
    const cards = carousel.querySelectorAll("[data-card-index]")
    const newStates: Record<number, "edge" | "center"> = {}
    const edgeZoneWidth = getEdgeZoneWidth()

    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect()
      const cardIndex = Number.parseInt(card.getAttribute("data-card-index") || "0")
      const cardCenter = cardRect.left + cardRect.width / 2
      const carouselLeft = carouselRect.left
      const carouselRight = carouselRect.right

      const isLeftEdge = cardCenter < carouselLeft + edgeZoneWidth
      const isRightEdge = cardCenter > carouselRight - edgeZoneWidth

      if (isLeftEdge || isRightEdge) {
        newStates[cardIndex] = "edge"
      } else {
        newStates[cardIndex] = "center"
      }
    })

    setCardStates(newStates)
  }, [getEdgeZoneWidth])

  useEffect(() => {
    if (carouselRef.current && articles.length > 0) {
      const middlePosition = articles.length * CAROUSEL.SCROLL_AMOUNT
      carouselRef.current.scrollLeft = middlePosition
      setTimeout(updateCardStates, ANIMATION.CARD_STATE_UPDATE_DELAY)
    }
  }, [articles.length, updateCardStates])

  useEffect(() => {
    const handleResize = () => updateCardStates()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [updateCardStates])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        scroll("left")
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        scroll("right")
      }
    }

    const navElement = navRef.current
    if (navElement) {
      navElement.addEventListener("keydown", handleKeyDown)
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      if (navElement) {
        navElement.removeEventListener("keydown", handleKeyDown)
      }
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const handleScroll = () => {
    if (!carouselRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
    const maxScroll = scrollWidth - clientWidth

    const currentIndex = Math.round(scrollLeft / CAROUSEL.SCROLL_AMOUNT) % articles.length
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex)
    }

    if (scrollLeft <= CAROUSEL.SCROLL_AMOUNT) {
      carouselRef.current.scrollLeft = articles.length * CAROUSEL.SCROLL_AMOUNT + scrollLeft
    } else if (scrollLeft >= maxScroll - CAROUSEL.SCROLL_AMOUNT) {
      carouselRef.current.scrollLeft = scrollLeft - articles.length * CAROUSEL.SCROLL_AMOUNT
    }

    updateCardStates()
  }

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return
    carouselRef.current.scrollBy({
      left: direction === "left" ? -CAROUSEL.SCROLL_AMOUNT : CAROUSEL.SCROLL_AMOUNT,
      behavior: ANIMATION.SCROLL_BEHAVIOR,
    })
  }

  if (articles.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No articles available at the moment.</p>
      </div>
    )
  }

  return (
    <section className={styles.section} role="region" aria-label="News carousel">
      <div className={styles.carouselWrapper}>
        <button
          className={`${styles.edgeZone} ${styles.edgeZoneLeft}`}
          onClick={() => scroll("left")}
          aria-label="View previous articles"
          type="button"
        />

        <button
          className={`${styles.edgeZone} ${styles.edgeZoneRight}`}
          onClick={() => scroll("right")}
          aria-label="View next articles"
          type="button"
        />

        <div
          ref={carouselRef}
          className={styles.carousel}
          onScroll={handleScroll}
          role="list"
          aria-label="News articles"
        >
          {extendedArticles.map((article, index) => {
            const isEdge = cardStates[index] === "edge"
            return (
              <div
                key={`${article.url}-${index}`}
                data-card-index={index}
                className={`${styles.cardWrapper} ${isEdge ? styles.edgeCard : styles.centerCard}`}
                role="listitem"
              >
                <NewsCard article={article} />
              </div>
            )
          })}
        </div>
      </div>

      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className={styles.srOnly}
      >
        {articles[activeIndex] && `Viewing article ${activeIndex + 1} of ${articles.length}: ${articles[activeIndex].title}`}
      </div>

      <div ref={navRef} className={styles.navigation} role="group" aria-label="Carousel navigation" tabIndex={0}>
        <button
          onClick={() => scroll("left")}
          className={styles.navButton}
          aria-label="Previous news article"
          type="button"
        >
          <ChevronLeftIcon />
        </button>
        <button
          onClick={() => scroll("right")}
          className={styles.navButton}
          aria-label="Next news article"
          type="button"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </section>
  )
}
