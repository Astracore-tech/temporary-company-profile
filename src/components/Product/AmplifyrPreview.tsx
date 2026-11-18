import React from 'react'

const COLUMNS = [
  {
    role: 'Brand',
    tone: 'var(--ac-accent)',
    title: 'Campaign brief',
    lines: ['3 short videos', 'TikTok + Reels', 'Escrow · milestone 1'],
    foot: 'Applications · review',
  },
  {
    role: 'Creator',
    tone: 'var(--ac-ok)',
    title: 'Campaign match',
    lines: ['Apply to the brief', 'Post the work', 'Submit the link'],
    foot: 'Status · In review',
  },
  {
    role: 'Manager',
    tone: 'var(--ac-warn)',
    title: 'Submission',
    lines: ['Check the link', 'Verify the views', 'Release the milestone'],
    foot: 'Decision · pending',
  },
]

/** A compact example of the three sides of the Amplifyr workspace. */
const AmplifyrPreview = () => (
  <div className='overflow-hidden border border-[var(--ac-line)] bg-[var(--ac-surface)]'>
    <div className='flex flex-wrap items-center justify-between gap-3 border-b border-[var(--ac-line)] bg-[var(--ac-surface-2)] px-4 py-3'>
      <div className='flex items-center gap-2'>
        <span className='flex h-6 w-6 items-center justify-center rounded-[2px] bg-[var(--ac-accent-dim)] text-[var(--ac-accent)]'>
          <i className='ti ti-bolt text-[14px]' aria-hidden='true' />
        </span>
        <span className='text-[12px] font-medium text-[var(--ac-ink)]'>Amplifyr</span>
      </div>
      <span className='ac-meta'>Example workspace · no client data</span>
    </div>

    <div className='grid grid-cols-1 gap-px bg-[var(--ac-line)] sm:grid-cols-3'>
      {COLUMNS.map((column) => (
        <div key={column.role} className='bg-[var(--ac-surface)] p-4'>
          <div className='flex items-center gap-2'>
            <span
              aria-hidden='true'
              className='h-1.5 w-1.5 rounded-[1px]'
              style={{ background: column.tone }}
            />
            <span className='ac-meta'>{column.role}</span>
          </div>

          <p className='mt-4 text-[13px] font-medium text-[var(--ac-ink)]'>{column.title}</p>
          <ul className='mt-2 space-y-1.5'>
            {column.lines.map((line) => (
              <li key={line} className='flex items-start gap-2 text-[11px] leading-4 text-[var(--ac-ink-3)]'>
                <i className='ti ti-minus mt-0.5 shrink-0 text-[10px]' aria-hidden='true' />
                {line}
              </li>
            ))}
          </ul>

          <p className='mt-4 border-t border-[var(--ac-line)] pt-3 text-[11px] text-[var(--ac-ink-2)]'>
            {column.foot}
          </p>
        </div>
      ))}
    </div>

    <div className='border-t border-[var(--ac-line)] px-4 py-3'>
      <div className='flex items-center justify-between gap-3'>
        <span className='ac-meta'>Campaign flow</span>
        <span className='ac-meta'>Brief → Match → Submit → Release</span>
      </div>
      <div className='mt-2 flex gap-px' aria-hidden='true'>
        <span className='h-1 flex-1 bg-[var(--ac-accent)]' />
        <span className='h-1 flex-1 bg-[var(--ac-accent)]' />
        <span className='h-1 flex-1 bg-[var(--ac-warn)]' />
        <span className='h-1 flex-1 bg-[var(--ac-ok)]' />
      </div>
    </div>
  </div>
)

export default AmplifyrPreview
