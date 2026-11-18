import { SITE, absoluteUrl, sameAs } from "./site"
import { services, type Service } from "@/content/services"
import { projects, isRunning, type Project } from "@/content/portfolio"

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
  knowsAbout: services.map((service) => service.title),
  areaServed: SITE.areaServed.map((name) => ({ "@type": "Place", name })),
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
      url: absoluteUrl(`/services/${service.slug}/`),
      provider: { "@id": absoluteUrl("/#organization") },
      areaServed: SITE.areaServed.map((name) => ({ "@type": "Place", name })),
    },
  })),
})

/** One department page, with its visible service list. */
export const departmentSchema = (department: Service) => ({
  "@type": "Service",
  "@id": absoluteUrl(`/services/${department.slug}/#service`),
  name: department.title,
  description: department.summary,
  url: absoluteUrl(`/services/${department.slug}/`),
  serviceType: department.title,
  provider: { "@id": absoluteUrl("/#organization") },
  areaServed: SITE.areaServed.map((name) => ({ "@type": "Place", name })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: department.title,
    itemListElement: department.includes.map((name, i) => ({
      "@type": "Offer",
      position: i + 1,
      itemOffered: {
        "@type": "Service",
        name,
        provider: { "@id": absoluteUrl("/#organization") },
      },
    })),
  },
})

/** One portfolio entry. Deliberately no ratings, clients or dates we can't vouch for. */
export const projectSchema = (p: Project) => ({
  "@type": "CreativeWork",
  "@id": absoluteUrl(`/portfolio/${p.slug}/#work`),
  name: p.name,
  description: p.summary,
  abstract: p.proof,
  url: absoluteUrl(`/portfolio/${p.slug}/`),
  genre: p.kind,
  keywords: p.stack.join(", "),
  creator: { "@id": absoluteUrl("/#organization") },
  creativeWorkStatus: isRunning(p.status) ? "Published" : "Incomplete",
})

export const portfolioListSchema = () => ({
  "@type": "ItemList",
  "@id": absoluteUrl("/portfolio/#list"),
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: absoluteUrl(`/portfolio/${p.slug}/`),
    name: p.name,
  })),
})

export const breadcrumbSchema =(crumbs: { name: string; path: string }[]) => ({
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
