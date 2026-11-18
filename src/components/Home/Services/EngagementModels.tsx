import React from 'react'
import SectionHeading from '@/components/SharedComponent/SectionHeading'

const MODELS = [
  {
    title: 'Project-based',
    body: 'A defined implementation or build: assessment, scope, delivery and handover.',
    detail: 'Useful when the problem is clear and the work has an end date.',
    tone: 'var(--ac-accent)',
  },
  {
    title: 'Managed',
    body: 'A recurring contract for maintenance, monitoring, operations or marketing execution.',
    detail: 'Responsibilities, service levels and reporting are agreed in writing.',
    tone: 'var(--ac-warn)',
  },
  {
    title: 'Combined',
    body: 'Implementation followed by ongoing management, with the same team.',
    detail: 'Useful when a system needs to be built and then actually run.',
    tone: 'var(--ac-ok)',
  },
]

/** The three commercial models, without publishing prices. */
const EngagementModels = () => (
  <section className='border-t border-[var(--ac-line)]'>
    <div className='ac-container'>
      <SectionHeading
        eyebrow='Ways to engage'
        title={
          <>
            Project, managed
            <br />
            <span className='ac-muted-line'>or both</span>
          </>
        }
        description='The work can stop at handover or continue as a managed service. The proposal says which.'
      />

      <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
        {MODELS.map((model, index) => (
          <div key={model.title} className='border-t border-[var(--ac-line)] pt-5'>
            <span className='ac-index' style={{ color: model.tone }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className='ac-h4 mt-3'>{model.title}</h3>
            <p className='ac-small mt-2'>{model.body}</p>
            <p className='ac-small mt-3 text-[var(--ac-ink-2)]'>{model.detail}</p>
          </div>
        ))}
      </div>

      <p className='ac-small mt-8 max-w-xl'>
        We do not publish fixed prices. Scope, cost and what we run are agreed before work starts.
      </p>
    </div>
  </section>
)

export default EngagementModels
