import {
  stripHtml,
  generateSlug,
  formatDate,
  formatTime,
  getReadingTime,
  getFormattedTitle,
} from "@/lib/utils"

describe("stripHtml", () => {
  it("should return empty string for null input", () => {
    expect(stripHtml(null)).toBe("")
  })

  it("should return empty string for undefined input", () => {
    expect(stripHtml(undefined)).toBe("")
  })

  it("should remove HTML tags", () => {
    expect(stripHtml("<p>Hello</p>")).toBe("Hello")
    expect(stripHtml("<ul><li>Item</li></ul>")).toBe("Item")
  })

  it("should decode HTML entities", () => {
    expect(stripHtml("Hello&nbsp;World")).toBe("Hello World")
    expect(stripHtml("Tom &amp; Jerry")).toBe("Tom & Jerry")
    expect(stripHtml("&lt;script&gt;")).toBe("<script>")
    expect(stripHtml("&quot;quoted&quot;")).toBe('"quoted"')
    expect(stripHtml("It&#39;s")).toBe("It's")
  })

  it("should normalize whitespace", () => {
    expect(stripHtml("Hello   World")).toBe("Hello World")
    expect(stripHtml("  trimmed  ")).toBe("trimmed")
  })
})

describe("generateSlug", () => {
  it("should convert title to lowercase slug", () => {
    expect(generateSlug("Hello World")).toBe("hello-world")
  })

  it("should remove special characters", () => {
    expect(generateSlug("Hello! World?")).toBe("hello-world")
  })

  it("should handle multiple spaces", () => {
    expect(generateSlug("Hello   World")).toBe("hello-world")
  })

  it("should encode special URL characters", () => {
    const slug = generateSlug("Test & Demo")
    expect(slug).toBe("test--demo")
  })
})

describe("formatDate", () => {
  it("should format date correctly", () => {
    const result = formatDate("2024-01-15T10:30:00Z")
    expect(result).toContain("January")
    expect(result).toContain("15")
    expect(result).toContain("2024")
  })
})

describe("formatTime", () => {
  it("should format time correctly", () => {
    const result = formatTime("2024-01-15T10:30:00Z")
    expect(result).toMatch(/\d{1,2}:\d{2}\s?(AM|PM)?/i)
  })
})

describe("getReadingTime", () => {
  it("should return 1 for very short content", () => {
    expect(getReadingTime("Short", null)).toBe(1)
  })

  it("should calculate reading time based on word count", () => {
    const longContent = Array(400).fill("word").join(" ")
    expect(getReadingTime(longContent, null)).toBe(2)
  })

  it("should use description if content is null", () => {
    expect(getReadingTime(null, "Some description text")).toBe(1)
  })

  it("should return 1 for null content and description", () => {
    expect(getReadingTime(null, null)).toBe(1)
  })
})

describe("getFormattedTitle", () => {
  it("should split title into start words and last word", () => {
    const result = getFormattedTitle("Hello Beautiful World")
    expect(result.startWords).toBe("Hello Beautiful")
    expect(result.lastWord).toBe("World")
  })

  it("should handle single word title", () => {
    const result = getFormattedTitle("Hello")
    expect(result.startWords).toBe("")
    expect(result.lastWord).toBe("Hello")
  })

  it("should handle two word title", () => {
    const result = getFormattedTitle("Hello World")
    expect(result.startWords).toBe("Hello")
    expect(result.lastWord).toBe("World")
  })
})
