'use client'
import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { faqData } from '@/utils/faq'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className='border-b border-[var(--ac-line)]' id='faq'>
      <div className='ac-container'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start'>

          <div className='lg:col-span-5' data-aos='fade-up' data-aos-duration='800'>
            <span className='ac-eyebrow'>Got Questions?</span>
            <h2 className='ac-h2 mt-6 mb-7'>
              Frequently <span className='ac-muted-line'>Asked</span>
              <br />
              Questions.
            </h2>
            <p className='ac-body max-w-sm'>
              Can&apos;t find what you&apos;re looking for? Reach out to our technical team directly
              for a consultation.
            </p>
          </div>

          <div
            className='lg:col-span-7 w-full'
            data-aos='fade-up'
            data-aos-duration='800'
            data-aos-delay='120'>
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
                      className='w-full text-left py-6 flex justify-between items-center gap-6 group cursor-pointer'
                      onClick={() => setOpenIndex(isOpen ? null : index)}>
                      <span
                        className={`ac-h3 transition-colors ${
                          isOpen ? 'text-[var(--ac-accent)]' : 'group-hover:text-[var(--ac-ink-2)]'
                        }`}>
                        {item.question}
                      </span>
                      <Icon
                        icon={isOpen ? 'ph:minus' : 'ph:plus'}
                        aria-hidden='true'
                        className={`text-xl shrink-0 transition-colors duration-300 ${
                          isOpen
                            ? 'text-[var(--ac-accent)]'
                            : 'text-[var(--ac-ink-4)] group-hover:text-[var(--ac-ink-2)]'
                        }`}
                      />
                    </button>
                    <div
                      id={panelId}
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                      <p className='pb-8 ac-body max-w-2xl'>{item.answer}</p>
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
