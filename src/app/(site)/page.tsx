import React from 'react'
import type { Metadata } from 'next'
import Hero from '@/components/Home/Hero'
import FlowStory from '@/components/Home/FlowStory'
import Services from '@/components/Home/Services'
import HowItWorks from '@/components/Home/HowItWorks'
import WorkSection from '@/components/Portfolio'
import FAQ from '@/components/Home/FAQ'
import CtaBand from '@/components/Home/CtaBand'
import InquirySection from '@/components/Inquiry/InquirySection'
import JsonLd from '@/components/SEO/JsonLd'
import { SITE, absoluteUrl } from '@/utils/site'
import { jsonLdGraph, faqSchema } from '@/utils/structuredData'
import { faqData } from '@/content/site-copy'

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
        alt: `${SITE.name} — business technology and growth in Nairobi`,
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
        <FlowStory />
        <Services />
        <WorkSection compact />
        <HowItWorks />
        <FAQ />
        <CtaBand />
        {/* id="contact" keeps existing /#contact links working */}
        <InquirySection id='contact' />
      </main>
    </>
  )
}
