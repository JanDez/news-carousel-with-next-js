import { render, screen } from "@testing-library/react"
import { ArticleContent } from "@/app/article/[slug]/ArticleContent"
import type { Article } from "@/types/article"

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}))

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string; fill?: boolean }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}))

const mockArticle: Article = {
  title: "Test Article Title",
  description: "This is a test article description for testing purposes.",
  content: "Full article content goes here with more details.",
  url: "https://example.com/article",
  urlToImage: "https://example.com/image.jpg",
  publishedAt: "2024-01-15T10:30:00Z",
  author: "John Doe",
  source: {
    id: "test-source",
    name: "Test News",
  },
}

describe("ArticleContent", () => {
  it("renders article title", () => {
    render(<ArticleContent article={mockArticle} />)

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
  })

  it("renders article description", () => {
    render(<ArticleContent article={mockArticle} />)

    expect(screen.getByText(/test article description/i)).toBeInTheDocument()
  })

  it("renders source name", () => {
    render(<ArticleContent article={mockArticle} />)

    expect(screen.getAllByText("Test News").length).toBeGreaterThan(0)
  })

  it("renders author name", () => {
    render(<ArticleContent article={mockArticle} />)

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument()
  })

  it("renders back button", () => {
    render(<ArticleContent article={mockArticle} />)

    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument()
  })

  it("renders read more link", () => {
    render(<ArticleContent article={mockArticle} />)

    const link = screen.getByRole("link", { name: /read full article/i })
    expect(link).toHaveAttribute("href", mockArticle.url)
  })

  it("renders article image", () => {
    render(<ArticleContent article={mockArticle} />)

    const img = screen.getByAltText(mockArticle.title)
    expect(img).toBeInTheDocument()
  })

  it("renders reading time", () => {
    render(<ArticleContent article={mockArticle} />)

    expect(screen.getByText(/min read/i)).toBeInTheDocument()
  })

  it("handles article without author", () => {
    const articleNoAuthor = { ...mockArticle, author: null }
    render(<ArticleContent article={articleNoAuthor} />)

    expect(screen.queryByText(/By/i)).not.toBeInTheDocument()
  })

  it("handles article without image", () => {
    const articleNoImage = { ...mockArticle, urlToImage: null }
    render(<ArticleContent article={articleNoImage} />)

    expect(screen.getByText(/No image available/i)).toBeInTheDocument()
  })
})
