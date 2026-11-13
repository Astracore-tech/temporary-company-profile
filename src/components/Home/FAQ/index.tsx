import React from 'react'
import { faqData } from '@/content/site-copy'

/** Native <details>: works without JavaScript and is accessible by default. */
const FAQ = () => (
  <section className='border-t border-[var(--ac-line)]' id='faq'>
    <div className='ac-container grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-16'>
      <div>
        <p className='ac-eyebrow mb-3'>Questions</p>
        <h2 className='ac-h2'>What buyers usually ask first</h2>
      </div>
      <div className='border-t border-[var(--ac-line-strong)]'>
        {faqData.map((item, i) => (
          <details key={item.question} className='group border-b border-[var(--ac-line)]' open={i === 0}>
            <summary className='flex items-start justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden'>
              <span className='ac-h4 !text-[17px]'>{item.question}</span>
              <span
                aria-hidden='true'
                className='text-[22px] leading-none text-[var(--ac-ink-4)] transition-transform group-open:rotate-45'>
                +
              </span>
            </summary>
            <p className='ac-body pb-6 pr-8 max-w-2xl'>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
)

export default FAQ
