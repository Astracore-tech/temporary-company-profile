import React from 'react'
import Link from 'next/link'
import HeroSub from '@/components/SharedComponent/HeroSub'
import SectionHeading from '@/components/SharedComponent/SectionHeading'
import InquirySection from '@/components/Inquiry/InquirySection'
import JsonLd from '@/components/SEO/JsonLd'
import { solutions } from '@/content/solutions'
import { pageMetadata } from '@/utils/pageMeta'
import { jsonLdGraph, breadcrumbSchema } from '@/utils/structuredData'

export const metadata = pageMetadata({
  title: 'Solutions',
  description:
    'Start with the symptom: missed enquiries, manual payment matching, work spread across tools, a weak website or marketing that stops and starts. Find the department that fits.',
  path: '/solutions',
})

const breadcrumbLinks = [
  { href: '/', text: 'Home' },
  { href: '/solutions', text: 'Solutions' },
]

const page = () => (
  <>
    <JsonLd
      data={jsonLdGraph(
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Solutions', path: '/solutions' },
        ])
      )}
    />
    <HeroSub
      eyebrow='Solutions'
      title='Start with the symptom, not the department'
      description='Most businesses do not arrive asking for a department. They describe what is going wrong. Find yours below and we will work out the rest together.'
      breadcrumbLinks={breadcrumbLinks}
      aside={
        <div className='border-t border-[var(--ac-line)] pt-5'>
          <dl className='grid grid-cols-2 gap-4'>
            <div>
              <dt className='ac-meta'>Symptoms</dt>
              <dd className='ac-stat mt-1' style={{ color: 'var(--ac-accent)' }}>
                {String(solutions.length).padStart(2, '0')}
              </dd>
            </div>
            <div>
              <dt className='ac-meta'>Starts with</dt>
              <dd className='mt-1 text-[13px] text-[var(--ac-ink-2)]'>An assessment</dd>
            </div>
          </dl>
        </div>
      }
    />

    <section>
      <div className='ac-container'>
        <SectionHeading
          eyebrow='Common symptoms'
          title={
            <>
              What is
              <br />
              <span className='ac-muted-line'>getting in the way?</span>
            </>
          }
          description='Each symptom points to a department, but the first conversation is about the work, not the label.'
        />

        <div className='border-t border-[var(--ac-line)]'>
          {solutions.map((solution, index) => (
            <div
              key={solution.title}
              className='grid grid-cols-1 gap-5 border-b border-[var(--ac-line)] py-6 md:grid-cols-12 md:gap-8'>
              <div className='flex items-baseline gap-4 md:col-span-4'>
                <span className='ac-index' style={{ color: solution.tone }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className='ac-h3 flex items-center gap-2.5'>
                  <span
                    aria-hidden='true'
                    className='h-1.5 w-1.5 shrink-0 rounded-[1px]'
                    style={{ background: solution.tone }}
                  />
                  {solution.title}
                </h2>
              </div>

              <div className='md:col-span-8'>
                <p className='ac-body max-w-2xl'>{solution.symptom}</p>
                <p className='ac-small mt-3 max-w-2xl text-[var(--ac-ink-2)]'>
                  <span className='text-[var(--ac-ink-4)]'>What we would look at: </span>
                  {solution.approach}
                </p>
                <Link
                  href={`/services/${solution.departmentSlug}/`}
                  className='ac-link mt-4 inline-flex'>
                  {solution.departmentTitle}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className='border-t border-[var(--ac-line)]'>
      <div className='ac-container grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16'>
        <div className='lg:col-span-4'>
          <span className='ac-eyebrow'>How we choose</span>
          <h2 className='ac-h2 mt-4'>Assess first, then propose</h2>
          <p className='ac-small mt-5 max-w-xs'>
            We do not start from a product. We start from how the work happens today and what a
            useful first version would change.
          </p>
        </div>
        <ol className='grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3 lg:col-span-8'>
          {[
            ['Assess', 'Map the current workflow, the records and the exceptions.'],
            ['Propose', 'Put the scope, cost and what we run in writing.'],
            ['Run', 'Build, automate or manage the agreed work, then review it.'],
          ].map(([title, body], index) => (
            <li key={title} className='border-t border-[var(--ac-line)] pt-5'>
              <span className='ac-index' style={{ color: 'var(--ac-accent)' }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className='ac-h4 mt-3'>{title}</h3>
              <p className='ac-small mt-2'>{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <InquirySection />
  </>
)

export default page
