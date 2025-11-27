import type React from "react"
import type { Metadata, Viewport } from "next"
import { Montserrat, Poppins } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "News Carousel | Latest Technology News",
    template: "%s | News Carousel",
  },
  description: "Stay updated with the latest technology news. Browse through our curated collection of articles from top news sources.",
  keywords: ["news", "technology", "articles", "latest news", "tech news"],
  authors: [{ name: "News Carousel" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "News Carousel",
    title: "News Carousel | Latest Technology News",
    description: "Stay updated with the latest technology news.",
  },
  twitter: {
    card: "summary_large_image",
    title: "News Carousel | Latest Technology News",
    description: "Stay updated with the latest technology news.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  )
}
