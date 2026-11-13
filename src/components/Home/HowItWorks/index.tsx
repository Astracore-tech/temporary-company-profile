import React from 'react'
import { howItWorks } from '@/content/site-copy'
import SectionHeading from '@/components/SharedComponent/SectionHeading'

const HowItWorks = () => (
  <section className='border-t border-[var(--ac-line)]' id='how-it-works'>
    <div className='ac-container'>
      <SectionHeading
        eyebrow='How it works'
        title='From first message to a written proposal'
        description='The same process whether you are in Nairobi or anywhere else. Nothing starts until you have agreed the scope and cost in writing.'
      />
      <ol className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
        {howItWorks.map((step, i) => (
          <li key={step.title} className='ac-panel p-6'>
            <span className='text-[13px] font-semibold text-[var(--ac-accent)] tabular-nums'>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className='ac-h4 mt-2 mb-2'>{step.title}</h3>
            <p className='ac-small'>{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
)

export default HowItWorks
