/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Common news image CDNs
      { protocol: "https", hostname: "*.reuters.com" },
      { protocol: "https", hostname: "*.bbc.co.uk" },
      { protocol: "https", hostname: "*.cnn.com" },
      { protocol: "https", hostname: "*.nytimes.com" },
      { protocol: "https", hostname: "*.washingtonpost.com" },
      { protocol: "https", hostname: "*.theguardian.com" },
      { protocol: "https", hostname: "*.techcrunch.com" },
      { protocol: "https", hostname: "*.theverge.com" },
      { protocol: "https", hostname: "*.wired.com" },
      { protocol: "https", hostname: "*.arstechnica.com" },
      { protocol: "https", hostname: "*.engadget.com" },
      { protocol: "https", hostname: "*.zdnet.com" },
      { protocol: "https", hostname: "*.cnet.com" },
      { protocol: "https", hostname: "*.mashable.com" },
      { protocol: "https", hostname: "*.gizmodo.com" },
      // Image CDNs commonly used by news sites
      { protocol: "https", hostname: "*.cloudfront.net" },
      { protocol: "https", hostname: "*.akamaized.net" },
      { protocol: "https", hostname: "*.imgix.net" },
      { protocol: "https", hostname: "*.fastly.net" },
      { protocol: "https", hostname: "*.wp.com" },
      { protocol: "https", hostname: "*.medium.com" },
      { protocol: "https", hostname: "*.substack.com" },
      { protocol: "https", hostname: "*.githubusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.vox-cdn.com" },
      { protocol: "https", hostname: "i.kinja-img.com" },
      { protocol: "https", hostname: "s.yimg.com" },
      { protocol: "https", hostname: "media.wired.com" },
      { protocol: "https", hostname: "static01.nyt.com" },
      { protocol: "https", hostname: "ichef.bbci.co.uk" },
      { protocol: "https", hostname: "platform.theverge.com" },
      // Fallback for other sources - can be removed for stricter security
      { protocol: "https", hostname: "**" },
    ],
  },
}

export default nextConfig
