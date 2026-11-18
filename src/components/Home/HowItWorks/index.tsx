import React from 'react'
import { howItWorks } from '@/content/site-copy'
import SectionHeading from '@/components/SharedComponent/SectionHeading'

const HowItWorks = () => (
  <section className='border-t border-[var(--ac-line)]' id='how-it-works'>
    <div className='ac-container'>
      <SectionHeading
        eyebrow='How it works'
        title={
          <>
            From first message
            <br />
            <span className='ac-muted-line'>to a written proposal</span>
          </>
        }
        description='The same process whether you are in Nairobi or elsewhere in Africa.'
      />

      <ol className='grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4'>
        {howItWorks.map((step, i) => (
          <li key={step.title} className='border-t border-[var(--ac-line)] pt-5'>
            <span className='ac-index'>{String(i + 1).padStart(2, '0')}</span>
            <h3 className='ac-h4 mt-3'>{step.title}</h3>
            <p className='ac-small mt-2.5'>{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
)

export default HowItWorks
