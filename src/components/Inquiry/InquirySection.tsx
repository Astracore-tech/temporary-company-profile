import React from 'react'
import InquiryForm from './InquiryForm'
import { PRIMARY_CTA } from '@/content/site-copy'
import { SITE } from '@/utils/site'

/**
 * The one inquiry journey, used on the home page (#contact, kept for existing
 * links) and the contact page (#inquiry).
 */
const InquirySection = ({ id = 'inquiry' }: { id?: string }) => (
  <section className='border-t border-[var(--ac-line)] scroll-mt-20' id={id}>
    <div className='ac-container'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start'>
        <div className='lg:col-span-5'>
          <span className='ac-eyebrow'>Start Here</span>
          <h2 className='ac-h2 mt-6 mb-6'>{PRIMARY_CTA.label}.</h2>
          <p className='ac-body mb-8 max-w-md'>
            Three things are enough: your name, how to reach you, and the problem in your own words.
            You don’t need to know which service you need.
          </p>

          <dl className='space-y-5 py-6 border-t border-b border-[var(--ac-line)] max-w-md'>
            <div>
              <dt className='text-[var(--ac-ink-3)] text-[10px] uppercase tracking-[0.22em] mb-1.5'>Email</dt>
              <dd>
                <a href={`mailto:${SITE.email}`} className='ac-h4 hover:text-[var(--ac-accent)] transition-colors break-all'>
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className='text-[var(--ac-ink-3)] text-[10px] uppercase tracking-[0.22em] mb-1.5'>Phone</dt>
              <dd>
                <a href={`tel:${SITE.telephone}`} className='ac-h4 hover:text-[var(--ac-accent)] transition-colors'>
                  {SITE.telephoneDisplay}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className='lg:col-span-7 w-full'>
          <div className='ac-card p-5 sm:p-8 lg:p-10 relative'>
            <InquiryForm />
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default InquirySection
