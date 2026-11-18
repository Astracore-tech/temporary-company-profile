import React from 'react'
import Link from 'next/link'
import HeroSub from '@/components/SharedComponent/HeroSub'
import SectionHeading from '@/components/SharedComponent/SectionHeading'
import InquirySection from '@/components/Inquiry/InquirySection'
import AmplifyrPreview from '@/components/Product/AmplifyrPreview'
import JsonLd from '@/components/SEO/JsonLd'
import { amplifyr } from '@/content/amplifyr'
import { pageMetadata } from '@/utils/pageMeta'
import { jsonLdGraph, breadcrumbSchema, amplifyrSchema } from '@/utils/structuredData'

export const metadata = pageMetadata({
  title: 'Amplifyr',
  description:
    'Amplifyr is a two-sided creator marketplace for brands and creators: campaign briefs, discovery, applications, submissions, verification and milestone-based payment. In development at AstraCore.',
  path: '/amplifyr',
})

const breadcrumbLinks = [
  { href: '/', text: 'Home' },
  { href: '/services/marketing-growth/', text: 'Marketing and growth' },
  { href: '/amplifyr', text: 'Amplifyr' },
]

const TONES = ['var(--ac-accent)', 'var(--ac-ok)', 'var(--ac-warn)'] as const

const page = () => (
  <>
    <JsonLd
      data={jsonLdGraph(
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Marketing and growth', path: '/services/marketing-growth' },
          { name: 'Amplifyr', path: '/amplifyr' },
        ]),
        amplifyrSchema({
          name: amplifyr.name,
          summary: amplifyr.summary,
        })
      )}
    />
    <HeroSub
      eyebrow={amplifyr.eyebrow}
      title={amplifyr.name}
      description={amplifyr.tagline}
      breadcrumbLinks={breadcrumbLinks}
      aside={
        <div className='border-t border-[var(--ac-line)] pt-5'>
          <dl className='space-y-3'>
            <div className='flex items-baseline justify-between gap-6 border-b border-[var(--ac-line)] pb-3'>
              <dt className='ac-meta'>Status</dt>
              <dd className='inline-flex items-center gap-2 text-[12px] text-[var(--ac-ink-3)]'>
                <span
                  aria-hidden='true'
                  className='h-1.5 w-1.5 rounded-[1px]'
                  style={{ background: 'var(--ac-warn)' }}
                />
                In development
              </dd>
            </div>
            <div className='flex items-baseline justify-between gap-6'>
              <dt className='ac-meta'>Product</dt>
              <dd className='text-[13px] text-[var(--ac-ink-2)]'>Two-sided marketplace</dd>
            </div>
          </dl>
        </div>
      }
    />

    <section>
      <div className='ac-container grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16'>
        <div className='lg:col-span-6'>
          <span className='ac-eyebrow'>What it is</span>
          <h2 className='ac-h2 mt-4'>A campaign is more than a post.</h2>
          <p className='ac-lead mt-5'>{amplifyr.problem}</p>

          <div className='mt-8 border-t border-[var(--ac-line)]'>
            {amplifyr.audiences.map((audience, index) => (
              <div
                key={audience.title}
                className='grid grid-cols-[24px_minmax(0,1fr)] gap-3 border-b border-[var(--ac-line)] py-4'>
                <span className='ac-index pt-0.5' style={{ color: TONES[index] }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className='ac-h4'>{audience.title}</h3>
                  <p className='ac-small mt-1'>{audience.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-8 flex flex-wrap items-center gap-4'>
            <Link href='#inquiry' className='ac-btn ac-btn-primary'>
              Request a walkthrough
              <i className='ti ti-arrow-right text-[15px]' aria-hidden='true' />
            </Link>
            <Link href='/services/marketing-growth/' className='ac-link'>
              Marketing and growth
            </Link>
          </div>
        </div>

        <div className='lg:col-span-6'>
          <AmplifyrPreview />
          <p className='ac-meta mt-4 text-center'>
            Example workspace · not a live campaign or client record
          </p>
        </div>
      </div>
    </section>

    <section className='border-t border-[var(--ac-line)]'>
      <div className='ac-container'>
        <SectionHeading
          eyebrow='How it works'
          title={
            <>
              Brief, match, submit
              <br />
              <span className='ac-muted-line'>then release</span>
            </>
          }
          description='The marketplace is designed around the handoffs where creator campaigns usually break.'
        />
        <ol className='grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4'>
          {amplifyr.loop.map((step, index) => (
            <li key={step.title} className='border-t border-[var(--ac-line)] pt-5'>
              <span className='ac-index' style={{ color: TONES[index] }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className='ac-h4 mt-3'>{step.title}</h3>
              <p className='ac-small mt-2'>{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className='border-t border-[var(--ac-line)]'>
      <div className='ac-container'>
        <SectionHeading
          eyebrow='What is inside'
          title='The workspace'
          description='Campaign, creator and manager views share one record, so the brief, the submission and the payment decision stay together.'
        />
        <div className='grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3'>
          {amplifyr.features.map((feature, index) => (
            <div key={feature.title} className='border-t border-[var(--ac-line)] pt-5'>
              <span className='ac-index' style={{ color: 'var(--ac-accent)' }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className='ac-h4 mt-3'>{feature.title}</h3>
              <p className='ac-small mt-2'>{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className='border-t border-[var(--ac-line)]'>
      <div className='ac-container grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16'>
        <div className='lg:col-span-4'>
          <span className='ac-eyebrow'>Status and evidence</span>
          <h2 className='ac-h2 mt-4'>In development</h2>
          <p className='ac-small mt-5 max-w-xs'>
            The interface and workflows are built. We do not publish production usage figures or
            claim live payments and platform verification before they are actually running.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:col-span-8'>
          <div>
            <h3 className='ac-label mb-3'>Built</h3>
            <ul className='space-y-2.5'>
              {amplifyr.built.map((item) => (
                <li key={item} className='ac-small flex gap-2.5'>
                  <i
                    className='ti ti-check mt-0.5 shrink-0 text-[14px]'
                    style={{ color: 'var(--ac-ok)' }}
                    aria-hidden='true'
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='ac-label mb-3'>Not claimed yet</h3>
            <ul className='space-y-2.5'>
              {amplifyr.notClaimed.map((item) => (
                <li key={item} className='ac-small flex gap-2.5'>
                  <i
                    className='ti ti-minus mt-0.5 shrink-0 text-[14px]'
                    style={{ color: 'var(--ac-warn)' }}
                    aria-hidden='true'
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className='ac-container mt-8'>
        <p className='ac-small max-w-2xl border-l border-[var(--ac-line-strong)] pl-3'>
          Amplifyr is a separate product within AstraCore. This page is an overview, not an
          integration. Request a walkthrough to see the working interface.
        </p>
      </div>
    </section>

    <InquirySection defaultService='marketing-growth' />
  </>
)

export default page
