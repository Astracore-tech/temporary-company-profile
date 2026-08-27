'use client'
import React from 'react'
import Link from 'next/link'
import { portfolioinfo } from '@/app/api/data'

interface PortfolioCardProps {
  activeFilter: string
}

export const ALL_WORK = 'All Work'

/** Filter list is derived from the data, so a category can never lose its button. */
export const PORTFOLIO_FILTERS = [
  ALL_WORK,
  ...Array.from(new Set(portfolioinfo.map((p) => p.category))).map(
    (c) => c.charAt(0).toUpperCase() + c.slice(1),
  ),
]

// ── Statement card ──────────────────────────────────────────────────────────
function StatementCard({ item }: { item: any }) {
  return (
    <div className='ac-card group relative overflow-hidden flex flex-col justify-between p-10 aspect-[4/3]'>
      <div className='flex items-center gap-2'>
        <i className={`ti ${item.icon} text-xs text-[var(--ac-accent)]`} />
        <span className='text-[10px] font-semibold tracking-[0.24em] uppercase text-[var(--ac-accent)]'>
          {item.iconText || item.info}
        </span>
      </div>

      <div>
        <h3
          className='ac-h2'
          dangerouslySetInnerHTML={{ __html: item.heading || item.title }}
        />
        {item.description && <p className='ac-small mt-4 max-w-xs'>{item.description}</p>}
      </div>

      <div className='flex items-center justify-end'>
        <span className='ac-link'>{item.actionText || 'See Work →'}</span>
      </div>
    </div>
  )
}

// ── Project card ────────────────────────────────────────────────────────────
function ProjectCard({ item }: { item: any }) {
  const card = (
    <div className='group relative overflow-hidden block w-full aspect-[4/3] border border-[var(--ac-line)] hover:border-[var(--ac-line-strong)] transition-colors duration-300'>
      <div className='ac-media absolute inset-0'>
        <img src={item.image} alt={item.alt || item.title || ''} decoding='async' loading='lazy' />
      </div>

      <div className='absolute inset-0 flex flex-col justify-end p-7 z-10'>
        <p className='text-[10px] font-semibold tracking-[0.24em] uppercase mb-2 text-[var(--ac-accent)]'>
          {item.info}
        </p>
        <div className='flex items-end justify-between gap-4'>
          <h3 className='ac-h3'>{item.title}</h3>
          <span className='ac-tag shrink-0 hidden md:inline-flex group-hover:text-[var(--ac-accent)] group-hover:border-[var(--ac-accent-line)] transition-colors'>
            View →
          </span>
        </div>
      </div>

      <span className='absolute bottom-0 left-0 right-0 h-px bg-[var(--ac-accent)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-20' />
    </div>
  )

  if (!item.slug) return card

  return (
    <Link href={`/portfolio/${item.slug}`} passHref>
      {card}
    </Link>
  )
}

// ── Grid ────────────────────────────────────────────────────────────────────
const PortfolioCard: React.FC<PortfolioCardProps> = ({ activeFilter }) => {
  const filteredProjects = portfolioinfo.filter(
    (p) => activeFilter === ALL_WORK || p.category.toLowerCase() === activeFilter.toLowerCase(),
  )

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--ac-line)] border border-[var(--ac-line)]'>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((item, i) => (
            <React.Fragment key={item.slug || i}>
              {item.type === 'text' ? <StatementCard item={item} /> : <ProjectCard item={item} />}
            </React.Fragment>
          ))
        ) : (
          <div className='col-span-full py-28 flex flex-col items-center justify-center gap-4 bg-[var(--ac-surface)]'>
            <i className='ti ti-folder-open text-4xl text-[var(--ac-ink-4)]' />
            <p className='ac-small'>No projects in this category yet.</p>
          </div>
        )}
      </div>

      <div className='flex items-center justify-between gap-4 pt-6'>
        <span className='ac-small'>
          Showing {filteredProjects.length} project{filteredProjects.length === 1 ? '' : 's'}
          {activeFilter !== ALL_WORK && ` in ${activeFilter}`}
        </span>
        <Link href='/contact' className='ac-link'>
          Start a Project →
        </Link>
      </div>
    </div>
  )
}

export default PortfolioCard
