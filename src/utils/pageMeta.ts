import type { Metadata } from "next"
import { SITE, absoluteUrl } from "./site"

type Args = {
  /** Short page title — the root layout appends the site name. */
  title: string
  description: string
  /** Route path without trailing slash, e.g. "/services". */
  path: string
  image?: string
  imageAlt?: string
  type?: "website" | "article"
  publishedTime?: string
}

/**
 * Builds canonical + Open Graph + Twitter metadata for a page so every route
 * carries the same complete set of tags instead of title/description alone.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  publishedTime,
}: Args): Metadata {
  const url = absoluteUrl(path)
  const ogImage = image || SITE.ogImage
  const fullTitle = `${title} | ${SITE.name}`

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: SITE.ogImageWidth,
          height: SITE.ogImageHeight,
          alt: imageAlt || `${title} — ${SITE.name}`,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.social.twitterHandle,
      title: fullTitle,
      description,
      images: [ogImage],
    },
  }
}
