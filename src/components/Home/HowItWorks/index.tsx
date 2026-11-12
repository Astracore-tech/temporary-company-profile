import React from 'react'
import { howItWorks } from '@/content/site-copy'
import SectionHeading from '@/components/SharedComponent/SectionHeading'

const HowItWorks = () => (
  <section className='border-t border-[var(--ac-line)]' id='how-it-works'>
    <div className='ac-container'>
      <SectionHeading
        eyebrow='How It Works'
        title={
          <>
            From first message
            <br />
            <span className='ac-muted-line'>to a clear proposal</span>
          </>
        }
        description='The same process whether you are in Nairobi or anywhere else.'
      />
      <ol className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--ac-line)] border border-[var(--ac-line)]'>
        {howItWorks.map((step, i) => (
          <li
            key={step.title}
            className='bg-[var(--ac-surface)] p-6 sm:p-8'
            data-aos='fade-up'
            data-aos-duration='700'
            data-aos-delay={`${i * 80}`}>
            <span className='text-[10px] font-bold tracking-[0.25em] text-[var(--ac-accent)]'>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className='ac-h4 mt-3 mb-2.5'>{step.title}</h3>
            <p className='ac-small'>{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
)

export default HowItWorks
