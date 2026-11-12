import { SITE, absoluteUrl, sameAs } from "./site"
import { services } from "@/content/services"

/** The company itself — the anchor entity every other node points back to. */
export const organizationSchema = () => ({
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: SITE.name,
  alternateName: SITE.shortName,
  url: absoluteUrl("/"),
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/images/logo/logo-icon.png"),
  },
  image: absoluteUrl(SITE.ogImage),
  description: SITE.description,
  foundingDate: SITE.founded,
  email: SITE.email,
  telephone: SITE.telephone,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  },
  sameAs,
})

/** LocalBusiness so the Nairobi office can surface in map/local results. */
export const localBusinessSchema = () => ({
  "@type": "ProfessionalService",
  "@id": absoluteUrl("/#localbusiness"),
  name: SITE.name,
  url: absoluteUrl("/"),
  image: absoluteUrl(SITE.ogImage),
  telephone: SITE.telephone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.latitude,
    longitude: SITE.geo.longitude,
  },
  areaServed: SITE.areaServed.map((name) => ({ "@type": "Place", name })),
  parentOrganization: { "@id": absoluteUrl("/#organization") },
})

export const websiteSchema = () => ({
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  url: absoluteUrl("/"),
  name: SITE.name,
  description: SITE.description,
  inLanguage: SITE.language,
  publisher: { "@id": absoluteUrl("/#organization") },
})

/** Service catalogue — lets search engines read what the company actually sells. */
export const serviceCatalogSchema = () => ({
  "@type": "OfferCatalog",
  "@id": absoluteUrl("/#services"),
  name: `${SITE.shortName} Services`,
  itemListElement: services.map((service, i) => ({
    "@type": "Offer",
    position: i + 1,
    itemOffered: {
      "@type": "Service",
      name: service.title,
      description: service.summary,
      provider: { "@id": absoluteUrl("/#organization") },
      areaServed: SITE.areaServed.map((name) => ({ "@type": "Place", name })),
    },
  })),
})

export const breadcrumbSchema = (crumbs: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
})

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@type": "FAQPage",
  "@id": absoluteUrl("/#faq"),
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
})

/** Wraps nodes in a single @graph so one script tag carries the whole model. */
export const jsonLdGraph = (...nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
})
