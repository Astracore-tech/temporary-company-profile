import Link from 'next/link'
import CtaCards from './CtaCards'
import { HEADER_CTA } from '@/content/site-copy'

/**
 * The closing call to action. Same idea as a clean product CTA: one short
 * question, one button, and the actual work as the visual beside it.
 */
const CtaBand = () => (
  <section className='border-t border-[var(--ac-line)]'>
    <div className='ac-container'>
      <div className='grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16'>
        <div className='lg:col-span-6'>
          <span className='ac-eyebrow'>Start with the problem</span>

          <h2
            className='ac-display mt-5'
            style={{ fontSize: 'clamp(36px, 4.4vw, 56px)' }}>
            Ready to stop
            <br />
            losing <span className='text-[var(--ac-accent)]'>work</span>
            <br />
            between the tools?
          </h2>

          <p className='ac-lead mt-6 max-w-lg'>
            Bring the bottleneck. We map it, build the fix, and run it with you — from the first
            enquiry to the matched payment.
          </p>

          <div className='mt-8'>
            <Link href='#contact' className='ac-btn ac-btn-primary'>
              {HEADER_CTA.label}
              <i className='ti ti-arrow-right text-[15px]' aria-hidden='true' />
            </Link>
          </div>

          <p className='ac-small mt-4 max-w-sm'>
            No brief needed. Request a consultation or ask for a quote — three things are enough:
            your name, how to reach you, and the problem in your own words.
          </p>
        </div>

        <div className='lg:col-span-6'>
          <CtaCards />
          <p className='ac-meta mt-4 text-center'>
            Example work cards · not a price or a client record
          </p>
        </div>
      </div>
    </div>
  </section>
)

export default CtaBand
