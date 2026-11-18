'use client'
import React, { useState } from 'react'
import { faqData } from '@/content/site-copy'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className='border-t border-[var(--ac-line)]' id='faq'>
      <div className='ac-container'>
        <div className='grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16'>
          <div className='lg:col-span-4'>
            <span className='ac-eyebrow'>FAQ</span>
            <h2 className='ac-h2 mt-4'>
              Questions,
              <br />
              <span className='ac-muted-line'>answered</span>
            </h2>
            <p className='ac-small mt-5 max-w-xs'>
              Can’t find what you need? Ask it in the inquiry form below.
            </p>
          </div>

          <div className='w-full lg:col-span-8'>
            <div className='border-t border-[var(--ac-line)]'>
              {faqData.map((item, index) => {
                const isOpen = openIndex === index
                const panelId = `faq-panel-${index}`
                return (
                  <div key={item.question} className='border-b border-[var(--ac-line)]'>
                    <button
                      type='button'
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className='group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left'
                      onClick={() => setOpenIndex(isOpen ? null : index)}>
                      <span
                        className={`text-[15px] font-medium leading-6 transition-colors ${
                          isOpen
                            ? 'text-[var(--ac-ink)]'
                            : 'text-[var(--ac-ink-2)] group-hover:text-[var(--ac-ink)]'
                        }`}>
                        {item.question}
                      </span>
                      <i
                        className={`ti ${
                          isOpen ? 'ti-minus' : 'ti-plus'
                        } shrink-0 text-[16px] text-[var(--ac-ink-4)] transition-colors group-hover:text-[var(--ac-ink-2)]`}
                        aria-hidden='true'
                      />
                    </button>
                    <div id={panelId} hidden={!isOpen} className='pb-5 pr-8'>
                      <p className='ac-body max-w-2xl'>{item.answer}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
