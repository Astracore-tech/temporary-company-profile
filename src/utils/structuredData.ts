import { SITE, absoluteUrl, sameAs } from "./site"

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
  priceRange: "KES 50,000 – KES 1,200,000",
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
  itemListElement: SITE.services.map((service, i) => ({
    "@type": "Offer",
    position: i + 1,
    itemOffered: {
      "@type": "Service",
      name: service,
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

export const articleSchema = (post: {
  title: string
  description?: string
  slug: string
  date?: string | Date
  image?: string
  author?: string
}) => ({
  "@type": "BlogPosting",
  "@id": absoluteUrl(`/blog/${post.slug}/#article`),
  headline: post.title,
  description: post.description,
  url: absoluteUrl(`/blog/${post.slug}`),
  datePublished: post.date ? new Date(post.date).toISOString() : undefined,
  dateModified: post.date ? new Date(post.date).toISOString() : undefined,
  image: post.image ? absoluteUrl(post.image) : absoluteUrl(SITE.ogImage),
  inLanguage: SITE.language,
  author: { "@type": "Person", name: post.author || SITE.name },
  publisher: { "@id": absoluteUrl("/#organization") },
  mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${post.slug}`) },
})

export const caseStudySchema = (project: {
  title: string
  description?: string
  slug: string
  image?: string
  client?: string
  year?: string
}) => ({
  "@type": "CreativeWork",
  "@id": absoluteUrl(`/portfolio/${project.slug}/#project`),
  name: project.title,
  description: project.description,
  url: absoluteUrl(`/portfolio/${project.slug}`),
  image: project.image,
  creator: { "@id": absoluteUrl("/#organization") },
  ...(project.year ? { dateCreated: project.year } : {}),
  ...(project.client ? { sourceOrganization: { "@type": "Organization", name: project.client } } : {}),
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
