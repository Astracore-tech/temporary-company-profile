'use client'
import React from 'react'
import { getImgPath } from '@/utils/image'

const DETAILS = [
  { label: 'Phone', value: '0739 045 698', href: 'tel:+254739045698' },
  { label: 'Email', value: 'info@astracoretech.org', href: 'mailto:info@astracoretech.org' },
  { label: 'Location', value: 'Nairobi, Kenya', href: null },
]

const PARTNERS = [
  { src: '/images/contact/google-pay.png', alt: 'Google Pay' },
  { src: '/images/contact/play-juction.png', alt: 'Play Junction' },
  { src: '/images/contact/stripe.png', alt: 'Stripe' },
  { src: '/images/contact/wise.png', alt: 'Wise' },
]

const FIELD =
  'w-full bg-[var(--ac-bg)] text-[var(--ac-ink)] text-sm px-5 py-4 border border-[var(--ac-line)] focus:border-[var(--ac-accent)] placeholder:text-[var(--ac-ink-4)] rounded-none focus-visible:outline-none transition-colors'

const Contactform = () => {
  return (
    <section className='border-t border-[var(--ac-line)] scroll-mt-24' id='contact'>
      <div className='ac-container'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start'>

          {/* Left — details */}
          <div className='lg:col-span-5' data-aos='fade-up' data-aos-duration='800'>
            <span className='ac-eyebrow'>Let&apos;s Connect</span>

            <h2 className='ac-h2 mt-6 mb-8'>
              Let&rsquo;s Discuss <span className='ac-muted-line'>Your Project</span>
              <br />
              And Scale.
            </h2>

            <dl className='space-y-6 py-8 border-t border-b border-[var(--ac-line)] max-w-md'>
              {DETAILS.map(({ label, value, href }) => (
                <div key={label}>
                  <dt className='text-[var(--ac-ink-3)] text-[10px] uppercase tracking-[0.22em] mb-2'>
                    {label}
                  </dt>
                  <dd>
                    {href ? (
                      <a
                        href={href}
                        className='ac-h3 hover:text-[var(--ac-accent)] transition-colors'>
                        {value}
                      </a>
                    ) : (
                      <span className='ac-h3'>{value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className='pt-8'>
              <p className='text-[var(--ac-ink-3)] text-[10px] uppercase tracking-[0.22em] mb-6'>
                Trusted Integrations
              </p>
              {/* Normalised to a common optical height so the row reads as one lockup */}
              <div className='flex items-center flex-wrap gap-x-9 gap-y-6 opacity-45 grayscale'>
                {PARTNERS.map(({ src, alt }) => (
                  // Plain <img>: these are tiny static logos sized purely by CSS, and
                  // next/image warns when only one dimension is set that way.
                  <img
                    key={alt}
                    src={getImgPath(src)}
                    alt={alt}
                    loading='lazy'
                    decoding='async'
                    className='h-5 w-auto max-w-none'
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div
            className='lg:col-span-7 w-full'
            data-aos='fade-up'
            data-aos-duration='800'
            data-aos-delay='120'>
            <div className='ac-card p-8 lg:p-12'>
              <h3 className='ac-h3 mb-8'>Start a Project</h3>

              <form className='space-y-5'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                  <div>
                    <label htmlFor='hc-first' className='sr-only'>First name</label>
                    <input id='hc-first' name='firstName' className={FIELD} type='text' placeholder='First name' />
                  </div>
                  <div>
                    <label htmlFor='hc-last' className='sr-only'>Last name</label>
                    <input id='hc-last' name='lastName' className={FIELD} type='text' placeholder='Last name' />
                  </div>
                </div>

                <div>
                  <label htmlFor='hc-email' className='sr-only'>Email address</label>
                  <input id='hc-email' name='email' type='email' className={FIELD} placeholder='youremail@website.com' />
                </div>

                <div>
                  <label htmlFor='hc-country' className='sr-only'>Country</label>
                  <input id='hc-country' name='country' className={FIELD} type='text' placeholder='Country' />
                </div>

                <div>
                  <label htmlFor='hc-message' className='sr-only'>Project details</label>
                  <textarea
                    id='hc-message'
                    name='message'
                    className={`${FIELD} h-[150px] resize-none`}
                    placeholder='Let us know about your project'
                  />
                </div>

                <div className='flex items-start gap-3 py-2'>
                  <input
                    id='hc-terms'
                    name='terms'
                    type='checkbox'
                    className='w-4 h-4 mt-0.5 rounded-none border border-[var(--ac-line-strong)] bg-[var(--ac-bg)] accent-[var(--ac-accent)] cursor-pointer'
                  />
                  <label htmlFor='hc-terms' className='ac-small cursor-pointer select-none'>
                    I have read and acknowledge the{' '}
                    <span className='text-[var(--ac-accent)]'>Terms and Conditions</span>
                  </label>
                </div>

                <button className='ac-btn ac-btn-primary w-full' type='submit'>
                  Submit Inquiry →
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contactform
