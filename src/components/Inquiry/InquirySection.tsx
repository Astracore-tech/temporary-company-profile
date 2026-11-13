import React from 'react'
import InquiryForm from './InquiryForm'
import { INQUIRY_HEADING } from '@/content/site-copy'
import { SITE } from '@/utils/site'

/**
 * The one inquiry journey, used on the home page (#contact, kept for existing
 * links) and the contact page (#inquiry).
 */
const InquirySection = ({ id = 'inquiry' }: { id?: string }) => (
  <section className='border-t border-[var(--ac-line)] bg-[var(--ac-surface-2)] scroll-mt-16' id={id}>
    <div className='ac-container grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-16 items-start'>
      <div>
        <p className='ac-eyebrow mb-3'>Start here</p>
        <h2 className='ac-h2'>{INQUIRY_HEADING}</h2>
        <p className='ac-body mt-4 max-w-md'>
          Your name, how to reach you, and the problem in your own words are enough. You don’t
          need to know which service you need. The founder reads every message and replies.
        </p>
        <dl className='mt-8 space-y-4 ac-small'>
          <div>
            <dt className='ac-label mb-1'>Email</dt>
            <dd>
              <a href={`mailto:${SITE.email}`} className='ac-link break-all'>
                {SITE.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className='ac-label mb-1'>Phone</dt>
            <dd>
              <a href={`tel:${SITE.telephone}`} className='ac-link'>
                {SITE.telephoneDisplay}
              </a>
            </dd>
          </div>
        </dl>
      </div>
      <div className='ac-card p-5 sm:p-8'>
        <InquiryForm />
      </div>
    </div>
  </section>
)

export default InquirySection
