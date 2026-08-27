import React from 'react'
import type { Metadata } from 'next'
import Hero from '@/components/Home/Hero'
import Progresswork from '@/components/Home/WorkProgress'
import Services from '@/components/Home/Services'
import KenyaVision from '@/components/Home/KenyaVision'
import FAQ from '@/components/Home/FAQ'
import Portfolio from '@/components/SharedComponent/portfollio'
import IntegrationPlayground from '@/components/Home/IntegrationPlayground'
import Testimonial from '@/components/SharedComponent/Testimonial'
import TechEstimator from '@/components/Home/TechEstimator'
import Blog from '@/components/SharedComponent/Blog'
import Contactform from '@/components/Home/Contact'
import JsonLd from '@/components/SEO/JsonLd'
import { SITE, absoluteUrl } from '@/utils/site'
import { jsonLdGraph, faqSchema } from '@/utils/structuredData'
import { faqData } from '@/utils/faq'

export const metadata: Metadata = {
  // Absolute so the home page keeps its full brand title rather than the template.
  title: { absolute: `${SITE.name} | ${SITE.tagline}` },
  description: SITE.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/'),
    siteName: SITE.name,
    locale: SITE.locale,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: SITE.ogImageWidth,
        height: SITE.ogImageHeight,
        alt: `${SITE.name} — enterprise software built in Nairobi`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE.social.twitterHandle,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
}

export default function Home() {
  return (
    <>
      <JsonLd data={jsonLdGraph(faqSchema(faqData))} />
      <main>
        <Hero />
        <Progresswork isColorMode={false} />
        <Services />
        <KenyaVision />
        <Portfolio />
        <IntegrationPlayground />
        <TechEstimator />
        <Testimonial />
        <FAQ />
        <Blog />
        <Contactform />
      </main>
    </>
  )
}
