import React from 'react'

/**
 * A concept view of the finance flow, not a live deployment and not client
 * data. It shows the shape of the work: an invoice, a matched M-Pesa payment
 * and a reconciliation line.
 */
const FinancePreview = () => (
  <div className='border border-[var(--ac-line)] bg-[var(--ac-surface)] p-4'>
    <div className='flex items-center justify-between gap-4 border-b border-[var(--ac-line)] pb-3'>
      <div className='flex items-center gap-2'>
        <span
          aria-hidden='true'
          className='h-1.5 w-1.5 rounded-[1px]'
          style={{ background: 'var(--ac-warn)' }}
        />
        <span className='ac-meta'>Concept view</span>
      </div>
      <span className='ac-meta'>No client data</span>
    </div>

    <div className='mt-4 flex items-start justify-between gap-4'>
      <div>
        <p className='ac-meta'>Invoice</p>
        <p className='ac-h3 mt-1'>AC-0142</p>
      </div>
      <span className='inline-flex items-center gap-2 text-[12px] text-[var(--ac-ink-3)]'>
        <span
          aria-hidden='true'
          className='h-1.5 w-1.5 rounded-[1px]'
          style={{ background: 'var(--ac-ok)' }}
        />
        Paid
      </span>
    </div>

    <dl className='mt-4 grid grid-cols-2 gap-4 border-t border-[var(--ac-line)] pt-4'>
      <div>
        <dt className='ac-meta'>Amount</dt>
        <dd className='mt-1 text-[15px] text-[var(--ac-ink)]'>KES 48,500</dd>
      </div>
      <div>
        <dt className='ac-meta'>M-Pesa</dt>
        <dd className='mt-1 text-[15px] text-[var(--ac-ink)]'>QK72… matched</dd>
      </div>
    </dl>

    <div className='mt-4 border-t border-[var(--ac-line)] pt-4'>
      <div className='flex items-center justify-between gap-4'>
        <span className='ac-meta'>Reconciliation</span>
        <span className='ac-meta'>2 of 2 matched</span>
      </div>
      <div className='mt-2 h-1 w-full bg-[var(--ac-surface-3)]'>
        <div className='h-full w-full bg-[var(--ac-ok)]' />
      </div>
    </div>
  </div>
)

export default FinancePreview
