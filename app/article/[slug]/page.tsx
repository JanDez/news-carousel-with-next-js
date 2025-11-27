import { cache } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { Article } from "@/types/article"
import { generateSlug } from "@/lib/utils"
import { ArticleContent } from "./ArticleContent"

interface PageProps {
  params: Promise<{ slug: string }>
}

const getArticle = cache(async (slug: string): Promise<Article | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/news`, { 
      next: { revalidate: 300 }
    })
    
    if (!res.ok) return null
    
    const data = await res.json()
    const article = data.articles?.find(
      (a: Article) => generateSlug(a.title) === slug
    )
    
    return article || null
  } catch {
    return null
  }
})

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return {
      title: "Article Not Found | News Carousel",
      description: "The article you're looking for doesn't exist or has been removed.",
    }
  }

  const publishedTime = new Date(article.publishedAt).toISOString()

  return {
    title: `${article.title} | ${article.source.name}`,
    description: article.description || `Read the latest news from ${article.source.name}`,
    authors: article.author ? [{ name: article.author }] : undefined,
    publisher: article.source.name,
    openGraph: {
      title: article.title,
      description: article.description || undefined,
      type: "article",
      publishedTime,
      authors: article.author ? [article.author] : undefined,
      siteName: "News Carousel",
      images: article.urlToImage
        ? [
            {
              url: article.urlToImage,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description || undefined,
      images: article.urlToImage ? [article.urlToImage] : undefined,
    },
    alternates: {
      canonical: article.url,
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords: [
      article.source.name,
      "news",
      "article",
      ...(article.title.split(" ").filter((word) => word.length > 4)),
    ],
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    image: article.urlToImage,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: article.author
      ? {
          "@type": "Person",
          name: article.author,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: article.source.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleContent article={article} />
    </>
  )
}
