import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/utils/site"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The founder inbox and the API are private; the inbox also sends
        // noindex, this just saves crawl budget.
        disallow: ["/api/", "/inbox/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  }
}
