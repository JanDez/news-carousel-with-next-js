/** Strips HTML tags and decodes common HTML entities */
export function stripHtml(text: string | null | undefined): string {
  if (!text) return ""
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
}

/** Generates a URL-safe slug from a title */
export function generateSlug(title: string): string {
  return encodeURIComponent(
    title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  )
}

/** Formats date to readable format (e.g., "January 15, 2024") */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/** Formats time (e.g., "10:30 AM") */
export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

/** Calculates estimated reading time in minutes */
export function getReadingTime(content: string | null, description: string | null): number {
  const text = stripHtml(content) || stripHtml(description) || ""
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return minutes < 1 ? 1 : minutes
}

/** Splits title for styling (last word gets different weight) */
export function getFormattedTitle(title: string): { startWords: string; lastWord: string } {
  const words = title.split(" ")
  if (words.length <= 1) {
    return { startWords: "", lastWord: title }
  }
  const lastWord = words.pop() || ""
  const startWords = words.join(" ")
  return { startWords, lastWord }
}
