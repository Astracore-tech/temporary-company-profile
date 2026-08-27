import type { MetadataRoute } from "next"
import { getAllPosts } from "@/utils/markdown"
import { portfolioinfo } from "@/app/api/data"
import { SITE, absoluteUrl } from "@/utils/site"

// Static export needs a fixed sitemap, generated at build time.
export const dynamic = "force-static"

// next.config sets trailingSlash: true, so canonical URLs end in a slash.
// The sitemap has to match or every entry redirects.
const withSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`)

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(withSlash(path)),
    lastModified: now,
    changeFrequency,
    priority,
  }))

  const projects: MetadataRoute.Sitemap = portfolioinfo
    .filter((p) => p.type === "image" && Boolean((p as any).slug))
    .map((p) => ({
      url: absoluteUrl(withSlash(`/portfolio/${(p as any).slug}`)),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }))

  const posts: MetadataRoute.Sitemap = getAllPosts(["slug", "date"]).map((post: any) => ({
    url: absoluteUrl(withSlash(`/blog/${post.slug}`)),
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...projects, ...posts]
}
