import React from 'react'
import Image from 'next/image'
import { getImgPath } from '@/utils/image'

const ContactForm = () => {
  return (
    <section>
      <div className='ac-container'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start max-w-6xl mx-auto'>
          
          {/* Form Column */}
          <div className='lg:col-span-7' data-aos='fade-right' data-aos-duration='900'>
            <h2 className='ac-h2 mb-9' style={{ fontSize: 'clamp(24px, 2.6vw, 34px)' }}>
              Request a Consultation
            </h2>
            
            <form className='space-y-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div>
                  <label htmlFor='first-name' className='text-[var(--ac-ink-3)] text-[10px] uppercase tracking-[0.2em] block mb-2.5'>
                    First Name*
                  </label>
                  <input
                    id='first-name'
                    className='w-full bg-[var(--ac-surface)] text-[var(--ac-ink)] text-sm px-5 py-4 border border-[var(--ac-line)] focus:border-[var(--ac-accent)] placeholder:text-[var(--ac-ink-4)] rounded-none focus-visible:outline-none transition-colors'
                    type='text'
                    required
                  />
                </div>
                <div>
                  <label htmlFor='last-name' className='text-[var(--ac-ink-3)] text-[10px] uppercase tracking-[0.2em] block mb-2.5'>
                    Last Name*
                  </label>
                  <input
                    id='last-name'
                    className='w-full bg-[var(--ac-surface)] text-[var(--ac-ink)] text-sm px-5 py-4 border border-[var(--ac-line)] focus:border-[var(--ac-accent)] placeholder:text-[var(--ac-ink-4)] rounded-none focus-visible:outline-none transition-colors'
                    type='text'
                    required
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div>
                  <label htmlFor='email' className='text-[var(--ac-ink-3)] text-[10px] uppercase tracking-[0.2em] block mb-2.5'>
                    Email Address*
                  </label>
                  <input
                    id='email'
                    type='email'
                    className='w-full bg-[var(--ac-surface)] text-[var(--ac-ink)] text-sm px-5 py-4 border border-[var(--ac-line)] focus:border-[var(--ac-accent)] placeholder:text-[var(--ac-ink-4)] rounded-none focus-visible:outline-none transition-colors'
                    required
                  />
                </div>
                <div>
                  <label htmlFor='service' className='text-[var(--ac-ink-3)] text-[10px] uppercase tracking-[0.2em] block mb-2.5'>
                    Project Type*
                  </label>
                  <select 
                    id='service'
                    className='w-full bg-[var(--ac-surface)] text-[var(--ac-ink)] text-sm px-5 py-4 border border-[var(--ac-line)] focus:border-[var(--ac-accent)] rounded-none focus-visible:outline-none transition-colors appearance-none cursor-pointer'
                    style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundPosition: 'right 16px center', backgroundRepeat: 'no-repeat', backgroundSize: '16px' }}
                    required>
                    <option value='' className='bg-[var(--ac-surface)]'>Select a service</option>
                    <option value='Web' className='bg-[var(--ac-surface)]'>Web Development</option>
                    <option value='Mobile' className='bg-[var(--ac-surface)]'>Mobile & iOS Apps</option>
                    <option value='POS' className='bg-[var(--ac-surface)]'>POS & Retail Systems</option>
                    <option value='ERP' className='bg-[var(--ac-surface)]'>ERP & Enterprise Software</option>
                    <option value='Automation' className='bg-[var(--ac-surface)]'>AI & Bots Automation</option>
                    <option value='Other' className='bg-[var(--ac-surface)]'>Other Solutions</option>
                  </select>
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div>
                  <label htmlFor='date' className='text-[var(--ac-ink-3)] text-[10px] uppercase tracking-[0.2em] block mb-2.5'>
                    Preferred Date
                  </label>
                  <input
                    id='date'
                    className='w-full bg-[var(--ac-surface)] text-[var(--ac-ink)] text-sm px-5 py-4 border border-[var(--ac-line)] focus:border-[var(--ac-accent)] rounded-none focus-visible:outline-none transition-colors'
                    type='date'
                  />
                </div>
                <div>
                  <label htmlFor='time' className='text-[var(--ac-ink-3)] text-[10px] uppercase tracking-[0.2em] block mb-2.5'>
                    Preferred Time
                  </label>
                  <input
                    id='time'
                    className='w-full bg-[var(--ac-surface)] text-[var(--ac-ink)] text-sm px-5 py-4 border border-[var(--ac-line)] focus:border-[var(--ac-accent)] rounded-none focus-visible:outline-none transition-colors'
                    type='time'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='message' className='text-[var(--ac-ink-3)] text-[10px] uppercase tracking-[0.2em] block mb-2.5'>
                  Project Brief
                </label>
                <textarea
                  id='message'
                  rows={4}
                  className='w-full bg-[var(--ac-surface)] text-[var(--ac-ink)] text-sm px-5 py-4 border border-[var(--ac-line)] focus:border-[var(--ac-accent)] placeholder:text-[var(--ac-ink-4)] rounded-none focus-visible:outline-none transition-colors resize-none'
                  placeholder='Tell us briefly about your requirements...'
                />
              </div>

              <div>
                <button
                  className='ac-btn ac-btn-primary px-10'
                  type='submit'>
                  Schedule Consultation →
                </button>
              </div>
            </form>
          </div>

          {/* Image Column */}
          <div className='lg:col-span-5' data-aos='fade-left' data-aos-duration='900' data-aos-delay='200'>
            <div className='ac-media ac-media-plain border border-[var(--ac-line)] relative aspect-[4/5] w-full'>
              <Image
                src={getImgPath('/images/contact-page/contact.png')}
                alt='Contact AstraCore'
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ContactForm

