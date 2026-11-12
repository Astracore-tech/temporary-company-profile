import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/utils/site"

// Fixed at build time; the public pages are all static.
export const dynamic = "force-static"

// next.config sets trailingSlash: true, so canonical URLs end in a slash.
// The sitemap has to match or every entry redirects.
const withSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`)

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(withSlash(path)),
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
