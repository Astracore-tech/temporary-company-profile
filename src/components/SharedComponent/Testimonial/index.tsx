import React from 'react'
import { Icon } from '@iconify/react'

const Testimonial = () => {
  return (
    <section className='border-b border-[var(--ac-line)] scroll-mt-24' id='testimonials'>
      <div className='ac-container'>
        <div
          className='max-w-3xl mx-auto text-center'
          data-aos='fade-up'
          data-aos-duration='800'>
          <div className='flex justify-center mb-9 text-[var(--ac-accent)] opacity-45'>
            <Icon icon='ri:double-quotes-l' width='40' height='40' />
          </div>

          {/* Inter, not the display face — this is a paragraph, not a headline */}
          <blockquote
            className='text-[var(--ac-ink)] font-normal mb-10'
            style={{ fontSize: 'clamp(19px, 2.1vw, 27px)', lineHeight: 1.5, letterSpacing: '-0.015em' }}>
            &ldquo;AstraCore transformed our digital operations. Their custom POS and school
            management systems are robust, incredibly fast, and have helped us automate 90% of our
            daily administrative tasks.&rdquo;
          </blockquote>

          <div className='flex flex-col items-center gap-1.5'>
            <cite className='ac-h4 not-italic'>Dr. Joseph Kiprop</cite>
            <span className='text-[var(--ac-ink-3)] text-[11px] font-semibold tracking-[0.18em] uppercase'>
              Director, Kiprop Group of Schools &amp; Retailers
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial
