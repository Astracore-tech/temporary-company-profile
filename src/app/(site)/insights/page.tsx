import React from 'react'
import Link from 'next/link'
import HeroSub from '@/components/SharedComponent/HeroSub'
import InquirySection from '@/components/Inquiry/InquirySection'
import JsonLd from '@/components/SEO/JsonLd'
import { insights } from '@/content/insights'
import { pageMetadata } from '@/utils/pageMeta'
import { absoluteUrl } from '@/utils/site'
import { jsonLdGraph, breadcrumbSchema } from '@/utils/structuredData'

export const metadata = pageMetadata({
  title: 'Insights',
  description:
    'Practical notes on managed services, evidence, internal systems and M-Pesa reconciliation from AstraCore Technologies in Nairobi.',
  path: '/insights',
})

const breadcrumbLinks = [
  { href: '/', text: 'Home' },
  { href: '/insights', text: 'Insights' },
]

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${iso}T12:00:00Z`))

const page = () => (
  <>
    <JsonLd
      data={jsonLdGraph(
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
        ]),
        ...insights.map((insight) => ({
          '@type': 'Article',
          '@id': absoluteUrl(`/insights/#${insight.slug}`),
          url: absoluteUrl(`/insights/#${insight.slug}`),
          headline: insight.title,
          description: insight.summary,
          datePublished: insight.date,
          dateModified: insight.date,
          author: { '@id': absoluteUrl('/#organization') },
          publisher: { '@id': absoluteUrl('/#organization') },
          mainEntityOfPage: absoluteUrl('/insights/'),
        }))
      )}
    />
    <HeroSub
      eyebrow='Insights'
      title='Notes from the work'
      description='Short, practical notes on the systems, handoffs and evidence behind the work. No listicles.'
      breadcrumbLinks={breadcrumbLinks}
      aside={
        <div className='border-t border-[var(--ac-line)] pt-5'>
          <dl className='grid grid-cols-2 gap-4'>
            <div>
              <dt className='ac-meta'>Notes</dt>
              <dd className='ac-stat mt-1' style={{ color: 'var(--ac-accent)' }}>
                {String(insights.length).padStart(2, '0')}
              </dd>
            </div>
            <div>
              <dt className='ac-meta'>Updated</dt>
              <dd className='mt-1 text-[13px] text-[var(--ac-ink-2)]'>November 2026</dd>
            </div>
          </dl>
        </div>
      }
    />

    <section>
      <div className='ac-container grid grid-cols-1 gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20'>
        <nav aria-label='Notes' className='hidden lg:block'>
          <ol className='sticky top-28 space-y-3'>
            {insights.map((insight) => (
              <li key={insight.slug}>
                <a
                  href={`#${insight.slug}`}
                  className='ac-small transition-colors hover:text-[var(--ac-ink)]'>
                  {insight.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className='max-w-[var(--ac-max-prose)]'>
          {insights.map((insight, index) => (
            <article
              key={insight.slug}
              id={insight.slug}
              className={`scroll-mt-28 ${index > 0 ? 'mt-14 border-t border-[var(--ac-line)] pt-10' : ''}`}>
              <div className='flex flex-wrap items-center gap-x-4 gap-y-1'>
                <time dateTime={insight.date} className='ac-meta'>
                  {formatDate(insight.date)}
                </time>
                <span className='ac-meta'>{insight.readingTime} read</span>
              </div>

              <h2 className='ac-h2 mt-4'>{insight.title}</h2>
              <p className='ac-lead mt-4'>{insight.summary}</p>

              <div className='mt-8 space-y-7'>
                {insight.sections.map((section) => (
                  <div key={section.heading}>
                    <h3 className='ac-h4'>{section.heading}</h3>
                    <p className='ac-body mt-2'>{section.body}</p>
                  </div>
                ))}
              </div>

              {insight.related && (
                <div className='mt-6 flex flex-wrap gap-x-6 gap-y-2'>
                  {insight.related.map((link) => (
                    <Link key={link.href} href={link.href} className='ac-link'>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>

    <InquirySection />
  </>
)

export default page
