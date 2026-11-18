import React from 'react'
import InquiryForm from './InquiryForm'
import { INQUIRY_HEADING } from '@/content/site-copy'
import { SITE } from '@/utils/site'

/**
 * The one inquiry journey, used on the home page (#contact, kept for existing
 * links) and the contact page (#inquiry).
 */
const InquirySection = ({
  id = 'inquiry',
  defaultService,
}: {
  id?: string
  defaultService?: string
}) => (
  <section className='border-t border-[var(--ac-line)] scroll-mt-20' id={id}>
    <div className='ac-container'>
      <div className='grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16'>
        <div className='lg:col-span-5'>
          <span className='ac-eyebrow'>Start here</span>
          <h2 className='ac-h2 mt-4'>{INQUIRY_HEADING}</h2>
          <p className='ac-body mt-5 max-w-md'>
            Three things are enough: your name, how to reach you, and the problem in your own
            words. You do not need to know which service you need or have a brief ready.
          </p>

          <dl className='mt-8 space-y-4 border-t border-[var(--ac-line)] pt-6'>
            <div>
              <dt className='ac-label'>Email</dt>
              <dd className='mt-1'>
                <a
                  href={`mailto:${SITE.email}`}
                  className='ac-h4 break-all transition-colors hover:text-[var(--ac-accent)]'>
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className='ac-label'>Phone</dt>
              <dd className='mt-1'>
                <a
                  href={`tel:${SITE.telephone}`}
                  className='ac-h4 transition-colors hover:text-[var(--ac-accent)]'>
                  {SITE.telephoneDisplay}
                </a>
              </dd>
            </div>
          </dl>

          <p className='ac-small mt-6 max-w-sm'>
            Prefer to write directly? Email or call. Mark reads both.
          </p>
        </div>

        <div className='w-full lg:col-span-7'>
          <div className='ac-card p-5 sm:p-8 lg:p-10'>
            <InquiryForm defaultService={defaultService} />
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default InquirySection
