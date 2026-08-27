import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/utils/site"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Not real pages — the app router never serves these, but keeping
        // crawlers out of them avoids wasted crawl budget on redirects.
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  }
}
