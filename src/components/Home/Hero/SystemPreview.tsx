'use client'
import { useState } from 'react'
import Link from 'next/link'

const MODULES = [
  {
    id: 'projects',
    short: 'Projects',
    name: 'Projects and tasks',
    icon: 'ti-layout-kanban',
    detail: 'Kanban boards, checklists and an activity trail',
    rows: [
      'Kanban boards, checklists and comments',
      'Attachments and an activity trail',
      'Two-way task sync with ClickUp',
    ],
    footer: 'Task sync · ClickUp',
  },
  {
    id: 'hr',
    short: 'HR',
    name: 'HR and leave',
    icon: 'ti-users',
    detail: 'Requests, balances and approvals',
    rows: [
      'Leave requests, balances and approvals',
      'Performance reviews and bonuses',
      'Guided onboarding checklist',
    ],
    footer: 'Role-based access · Founder to staff',
  },
  {
    id: 'finance',
    short: 'Finance',
    name: 'Finance',
    icon: 'ti-receipt',
    detail: 'Invoices, numbering and a finance summary',
    rows: [
      'Invoices with automatic numbering',
      'Finance summary and exports',
      'Clients and deals pipeline',
    ],
    footer: 'Invoices · Finance summary',
  },
  {
    id: 'compliance',
    short: 'Compliance',
    name: 'Compliance',
    icon: 'ti-calendar-due',
    detail: 'Legal and tax deadlines in one tracker',
    rows: [
      'Legal and tax deadline tracker',
      'Compliance status at a glance',
      'Audit log of major actions',
    ],
    footer: 'Deadlines · Audit log',
  },
  {
    id: 'documents',
    short: 'Documents',
    name: 'Documents',
    icon: 'ti-folder',
    detail: 'Storage, notifications and an audit log',
    rows: [
      'Document storage and attachments',
      'Notifications for the people who act',
      'Audit log of major actions',
    ],
    footer: 'Storage · Notifications',
  },
]

export default function SystemPreview({ capabilityCount }: { capabilityCount: number }) {
  const [active, setActive] = useState(0)
  const current = MODULES[active]

  const select = (index: number) => {
    setActive(index)
    document.getElementById(`system-tab-${MODULES[index].id}`)?.focus()
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      select((active + 1) % MODULES.length)
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      select((active - 1 + MODULES.length) % MODULES.length)
    }
    if (event.key === 'Home') {
      event.preventDefault()
      select(0)
    }
    if (event.key === 'End') {
      event.preventDefault()
      select(MODULES.length - 1)
    }
  }

  return (
    <div className='overflow-hidden border border-[var(--ac-line)] bg-[var(--ac-surface)]'>
      <div className='flex items-center justify-between gap-4 border-b border-[var(--ac-line)] bg-[var(--ac-surface-2)] px-4 py-3'>
        <div className='flex items-center gap-2'>
          <span
            aria-hidden='true'
            className='ac-live h-2 w-2 rounded-[1px]'
            style={{ background: 'var(--ac-ok)' }}
          />
          <span className='text-[12px] font-medium text-[var(--ac-ink)]'>AstraCore OS</span>
        </div>
        <span className='ac-meta'>In daily use</span>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-[132px_minmax(0,1fr)]'>
        <div className='border-b border-[var(--ac-line)] sm:border-b-0 sm:border-r'>
          <p className='ac-meta hidden px-3 pb-1 pt-3 sm:block'>Choose a module</p>
          <div
            role='tablist'
            aria-label='AstraCore OS modules'
            onKeyDown={onKeyDown}
            className='flex gap-1 overflow-x-auto p-2 sm:flex-col sm:overflow-visible'>
            {MODULES.map((module, index) => {
              const selected = index === active
              return (
                <button
                  key={module.id}
                  type='button'
                  role='tab'
                  id={`system-tab-${module.id}`}
                  aria-selected={selected}
                  aria-controls='system-panel'
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={`flex shrink-0 items-center gap-2 rounded-[2px] px-2 py-1.5 text-left text-[12px] transition-colors ${
                    selected
                      ? 'bg-[var(--ac-surface-3)] text-[var(--ac-ink)]'
                      : 'text-[var(--ac-ink-3)] hover:bg-[var(--ac-surface-2)] hover:text-[var(--ac-ink)]'
                  }`}>
                  <span
                    aria-hidden='true'
                    className={`h-1 w-1 shrink-0 rounded-[1px] ${
                      selected ? 'bg-[var(--ac-accent)]' : 'bg-transparent'
                    }`}
                  />
                  <i className={`ti ${module.icon} text-[14px]`} aria-hidden='true' />
                  {module.short}
                </button>
              )
            })}
          </div>
        </div>

        <div
          role='tabpanel'
          id='system-panel'
          aria-labelledby={`system-tab-${current.id}`}
          className='p-4 sm:p-5'>
          <div key={current.id}>
            <div className='ac-swap flex items-start justify-between gap-4'>
              <div>
                <p className='ac-meta'>Module {String(active + 1).padStart(2, '0')}</p>
                <p className='ac-h3 mt-1'>{current.name}</p>
                <p className='ac-small mt-1'>{current.detail}</p>
              </div>
              <span className='ac-tag shrink-0'>{capabilityCount} capabilities</span>
            </div>

            <ul className='mt-4 border-t border-[var(--ac-line)]'>
              {current.rows.map((row, index) => (
                <li
                  key={row}
                  className='ac-swap flex items-start gap-3 border-b border-[var(--ac-line)] py-2.5'
                  style={{ animationDelay: `${index * 45}ms` }}>
                  <i
                    className='ti ti-check mt-0.5 shrink-0 text-[14px] text-[var(--ac-ink-4)]'
                    aria-hidden='true'
                  />
                  <p className='text-[13px] leading-5 text-[var(--ac-ink-2)]'>{row}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className='mt-4 flex items-center justify-between gap-4'>
            <span className='ac-meta'>{current.footer}</span>
            <Link href='/portfolio/astracore-os/' className='ac-link'>
              Open the build
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
