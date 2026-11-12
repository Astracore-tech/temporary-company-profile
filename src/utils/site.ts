/**
 * Single source of truth for site identity — used by metadata, the sitemap,
 * robots.txt and the JSON-LD structured data.
 *
 * Set NEXT_PUBLIC_SITE_URL at build time to point canonical URLs, Open Graph
 * tags and the sitemap at the real deployment domain.
 */
export const SITE = {
  name: "AstraCore Technologies",
  shortName: "AstraCore",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://astracoretech.org").replace(/\/$/, ""),
  tagline: "Premium IT Solutions",
  description:
    "Nairobi software company building business websites and portals, custom operational systems, M-Pesa integrations and workflow automation — for businesses in Kenya and abroad.",
  locale: "en_KE",
  language: "en",
  founded: "2017",

  email: "info@astracoretech.org",
  telephone: "+254739045698",
  telephoneDisplay: "0739 045 698",

  address: {
    street: "AstraCore Suite, Kilimani",
    city: "Nairobi",
    region: "Nairobi County",
    country: "KE",
    countryName: "Kenya",
  },

  geo: { latitude: -1.2908227, longitude: 36.7865203 },

  social: {
    twitter: "https://x.com/AstraCoreTec",
    twitterHandle: "@AstraCoreTec",
    linkedin: "https://www.linkedin.com/in/astra-coretech-87105b415",
    instagram: "https://www.instagram.com/astracoretech3",
  },

  ogImage: "/images/og/astracore-og.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,

  areaServed: ["Kenya", "East Africa"],
} as const

export const absoluteUrl = (path = "/") =>
  `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`

/** All social profiles, for schema.org `sameAs`. */
export const sameAs = [SITE.social.twitter, SITE.social.linkedin, SITE.social.instagram]
