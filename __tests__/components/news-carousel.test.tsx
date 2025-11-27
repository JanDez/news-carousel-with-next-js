import { render, screen, fireEvent } from "@testing-library/react"
import { NewsCarousel } from "@/components/news-carousel"
import type { Article } from "@/types/article"

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, ...props }: { fill?: boolean; src: string; alt: string }) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} data-fill={fill ? "true" : undefined} />
  },
}))

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

const mockArticles: Article[] = [
  {
    source: { id: "source-1", name: "Test Source 1" },
    author: "Author 1",
    title: "First Test Article Title",
    description: "Description for first article",
    url: "https://example.com/article-1",
    urlToImage: "https://example.com/image-1.jpg",
    publishedAt: "2024-01-15T10:30:00Z",
    content: "Content for first article",
  },
  {
    source: { id: "source-2", name: "Test Source 2" },
    author: "Author 2",
    title: "Second Test Article Title",
    description: "Description for second article",
    url: "https://example.com/article-2",
    urlToImage: "https://example.com/image-2.jpg",
    publishedAt: "2024-01-16T10:30:00Z",
    content: "Content for second article",
  },
  {
    source: { id: "source-3", name: "Test Source 3" },
    author: "Author 3",
    title: "Third Test Article Title",
    description: "Description for third article",
    url: "https://example.com/article-3",
    urlToImage: "https://example.com/image-3.jpg",
    publishedAt: "2024-01-17T10:30:00Z",
    content: "Content for third article",
  },
]

describe("NewsCarousel", () => {
  beforeEach(() => {
    // Mock window.innerWidth for responsive tests
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1200,
    })

    // Mock scrollBy for carousel scrolling
    Element.prototype.scrollBy = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("renders carousel section with correct role", () => {
    render(<NewsCarousel articles={mockArticles} />)
    
    const section = screen.getByRole("region", { name: /news carousel/i })
    expect(section).toBeInTheDocument()
  })

  it("renders all articles as list items", () => {
    render(<NewsCarousel articles={mockArticles} />)
    
    // Articles are tripled for infinite scroll effect
    const listItems = screen.getAllByRole("listitem")
    expect(listItems.length).toBe(mockArticles.length * 3)
  })

  it("renders navigation buttons", () => {
    render(<NewsCarousel articles={mockArticles} />)
    
    const prevButton = screen.getByRole("button", { name: /previous news article/i })
    const nextButton = screen.getByRole("button", { name: /next news article/i })
    
    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  it("renders edge zone buttons for scrolling", () => {
    render(<NewsCarousel articles={mockArticles} />)
    
    const prevEdge = screen.getByRole("button", { name: /view previous articles/i })
    const nextEdge = screen.getByRole("button", { name: /view next articles/i })
    
    expect(prevEdge).toBeInTheDocument()
    expect(nextEdge).toBeInTheDocument()
  })

  it("shows empty state when no articles provided", () => {
    render(<NewsCarousel articles={[]} />)
    
    expect(screen.getByText(/no articles available/i)).toBeInTheDocument()
  })

  it("renders article titles", () => {
    render(<NewsCarousel articles={mockArticles} />)
    
    // Check for parts of the first article title (split for styling)
    expect(screen.getAllByText(/First Test Article/i).length).toBeGreaterThan(0)
  })

  it("has keyboard navigation group", () => {
    render(<NewsCarousel articles={mockArticles} />)
    
    const navGroup = screen.getByRole("group", { name: /carousel navigation/i })
    expect(navGroup).toBeInTheDocument()
    expect(navGroup).toHaveAttribute("tabIndex", "0")
  })

  it("renders aria-live region for screen readers", () => {
    render(<NewsCarousel articles={mockArticles} />)
    
    const liveRegion = document.querySelector("[aria-live='polite']")
    expect(liveRegion).toBeInTheDocument()
  })

  it("navigation buttons are clickable", () => {
    render(<NewsCarousel articles={mockArticles} />)
    
    const prevButton = screen.getByRole("button", { name: /previous news article/i })
    const nextButton = screen.getByRole("button", { name: /next news article/i })
    
    // Should not throw when clicked
    expect(() => fireEvent.click(prevButton)).not.toThrow()
    expect(() => fireEvent.click(nextButton)).not.toThrow()
  })

  it("renders with proper list semantics", () => {
    render(<NewsCarousel articles={mockArticles} />)
    
    const list = screen.getByRole("list", { name: /news articles/i })
    expect(list).toBeInTheDocument()
  })
})

describe("NewsCarousel responsive behavior", () => {
  it("handles mobile viewport", () => {
    Object.defineProperty(window, "innerWidth", { value: 375 })
    
    render(<NewsCarousel articles={mockArticles} />)
    
    const section = screen.getByRole("region", { name: /news carousel/i })
    expect(section).toBeInTheDocument()
  })

  it("handles tablet viewport", () => {
    Object.defineProperty(window, "innerWidth", { value: 768 })
    
    render(<NewsCarousel articles={mockArticles} />)
    
    const section = screen.getByRole("region", { name: /news carousel/i })
    expect(section).toBeInTheDocument()
  })
})
