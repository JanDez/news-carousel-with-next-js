import { render, screen } from "@testing-library/react"
import { NewsCard } from "@/components/news-card"
import type { Article } from "@/types/article"

// Mock next/image - filter out fill prop
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, ...props }: { fill?: boolean; src: string; alt: string; className?: string }) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} data-fill={fill ? "true" : undefined} />
  },
}))

// Mock next/link - preserve aria-label
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; "aria-label"?: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

const mockArticle: Article = {
  source: { id: "test-source", name: "Test Source" },
  author: "John Doe",
  title: "Test Article Title Here",
  description: "This is a test description for the article.",
  url: "https://example.com/article",
  urlToImage: "https://example.com/image.jpg",
  publishedAt: "2024-01-15T10:30:00Z",
  content: "Full article content here.",
}

describe("NewsCard", () => {
  it("renders article title correctly", () => {
    render(<NewsCard article={mockArticle} />)
    
    expect(screen.getByText("Test Article Title")).toBeInTheDocument()
    expect(screen.getByText("Here")).toBeInTheDocument()
  })

  it("renders article description", () => {
    render(<NewsCard article={mockArticle} />)
    
    expect(screen.getByText("This is a test description for the article.")).toBeInTheDocument()
  })

  it("renders article image with correct alt text", () => {
    render(<NewsCard article={mockArticle} />)
    
    const image = screen.getByAltText("Test Article Title Here")
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg")
  })

  it("renders link to article page", () => {
    render(<NewsCard article={mockArticle} />)
    
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/article/test-article-title-here")
  })

  it("shows placeholder when no image is provided", () => {
    const articleWithoutImage = { ...mockArticle, urlToImage: null }
    render(<NewsCard article={articleWithoutImage} />)
    
    expect(screen.getByText("No Image")).toBeInTheDocument()
  })

  it("shows default description when description is null", () => {
    const articleWithoutDescription = { ...mockArticle, description: null }
    render(<NewsCard article={articleWithoutDescription} />)
    
    expect(screen.getByText("No description available")).toBeInTheDocument()
  })

  it("strips HTML from description", () => {
    const articleWithHtml = { 
      ...mockArticle, 
      description: "<p>Description with <strong>HTML</strong> tags</p>" 
    }
    render(<NewsCard article={articleWithHtml} />)
    
    expect(screen.getByText("Description with HTML tags")).toBeInTheDocument()
  })

  it("has correct aria-label for accessibility", () => {
    render(<NewsCard article={mockArticle} />)
    
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("aria-label", "Test Article Title Here")
  })
})
