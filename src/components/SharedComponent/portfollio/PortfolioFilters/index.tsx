'use client'
import React from 'react'

type Props = {
  filters: string[]
  active: string
  onChange: (filter: string) => void
  className?: string
}

/** The one filter control, shared by the home section and the portfolio page. */
const PortfolioFilters = ({ filters, active, onChange, className = '' }: Props) => (
  <div
    role='tablist'
    aria-label='Filter projects by category'
    className={`flex flex-wrap items-center gap-2 ${className}`}>
    {filters.map((filter) => {
      const isActive = active === filter
      return (
        <button
          key={filter}
          type='button'
          role='tab'
          aria-selected={isActive}
          onClick={() => onChange(filter)}
          className={`px-5 py-2.5 text-xs font-semibold tracking-wide cursor-pointer transition-colors whitespace-nowrap border ${
            isActive
              ? 'bg-[var(--ac-accent)] text-[var(--ac-on-accent)] border-[var(--ac-accent)]'
              : 'bg-transparent text-[var(--ac-ink-3)] border-[var(--ac-line)] hover:text-[var(--ac-ink)] hover:border-[var(--ac-line-strong)]'
          }`}>
          {filter}
        </button>
      )
    })}
  </div>
)

export default PortfolioFilters
