import React from 'react'
import Link from 'next/link'
import { projects, portfolioStats, STATUS_LABEL, isRunning, type Project } from '@/content/portfolio'
import { serviceTitle } from '@/content/services'
import SectionHeading from '@/components/SharedComponent/SectionHeading'
import Reveal from '@/components/Common/Reveal'

/** Honest status line — green for running, amber for unfinished. */
export const StatusTag = ({ status }: { status: Project['status'] }) => {
  const running = isRunning(status)
  return (
    <span className='inline-flex items-center gap-2 text-[12px] text-[var(--ac-ink-3)]'>
      <span
        aria-hidden='true'
        className='h-1.5 w-1.5 shrink-0 rounded-[1px]'
        style={{ background: running ? 'var(--ac-ok)' : 'var(--ac-warn)' }}
      />
      {STATUS_LABEL[status]}
    </span>
  )
}

const ProjectRow = ({ p, i }: { p: Project; i: number }) => (
  <Link
    href={`/portfolio/${p.slug}/`}
    className='group grid grid-cols-[24px_minmax(0,1fr)] gap-4 border-b border-[var(--ac-line)] py-6 transition-colors hover:bg-[rgba(255,255,255,0.015)] sm:grid-cols-[32px_minmax(0,1fr)_auto] sm:gap-6 lg:py-7'>
    <span
      className='ac-index pt-1.5'
      style={{ color: isRunning(p.status) ? 'var(--ac-ok)' : 'var(--ac-warn)' }}>
      {String(i + 1).padStart(2, '0')}
    </span>

    <div className='min-w-0'>
      <div className='flex flex-wrap items-baseline gap-x-3 gap-y-1'>
        <h3 className='ac-h3 transition-colors group-hover:text-[var(--ac-accent)]'>{p.name}</h3>
        <span className='ac-meta'>{p.kind}</span>
      </div>
      <p className='ac-body mt-2 max-w-3xl'>{p.summary}</p>

      <div className='mt-3 flex flex-wrap items-center gap-x-5 gap-y-2'>
        <StatusTag status={p.status} />
        <span className='ac-meta'>
          {p.built.length} {isRunning(p.status) ? 'capabilities' : 'items done'}
        </span>
        <ul className='flex flex-wrap gap-1.5' aria-label='Related services'>
          {p.services.map((id) => (
            <li key={id} className='ac-tag'>
              {serviceTitle(id)}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <i
      className='ti ti-arrow-up-right mt-1 hidden shrink-0 text-[16px] text-[var(--ac-ink-4)] transition-colors group-hover:text-[var(--ac-accent)] sm:block'
      aria-hidden='true'
    />
  </Link>
)

/**
 * The portfolio index. On the home page (`compact`) it adds a link through to
 * /portfolio/; on /portfolio/ itself it also states the running totals.
 */
const WorkSection = ({ compact = false }: { compact?: boolean }) => (
  <section className='border-t border-[var(--ac-line)] scroll-mt-24' id='work'>
    <div className='ac-container'>
      <SectionHeading
        eyebrow='Our work'
        title={
          <>
            Systems we have built
            <br />
            <span className='ac-muted-line'>and where each stands</span>
          </>
        }
        description={
          compact
            ? 'We are a young company, so instead of mock-ups we show what we have actually built — the same kinds of work we offer you.'
            : 'Every project here is our own work, described as it stands today. We do not show client names, figures or results we cannot stand behind.'
        }
        aside={
          compact ? (
            <Link href='/portfolio/' className='ac-link'>
              See all work
            </Link>
          ) : undefined
        }
      />

      <div className='flex items-center justify-between gap-4 border-y border-[var(--ac-line)] py-3'>
        <span className='ac-meta'>
          {String(portfolioStats.total).padStart(2, '0')} projects
        </span>
        <span className='ac-meta'>
          {String(portfolioStats.running).padStart(2, '0')} running ·{' '}
          {String(portfolioStats.explored).padStart(2, '0')} explored
        </span>
      </div>

      <div>
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 45}>
            <ProjectRow p={p} i={i} />
          </Reveal>
        ))}
      </div>

      <div className='flex flex-col justify-between gap-4 pt-6 sm:flex-row sm:items-center'>
        <p className='ac-small max-w-xl'>
          Every entry is our own work. Anything unfinished is labelled as in development or earlier
          exploration, not presented as a shipped feature.
        </p>
        <Link href='/contact/#inquiry' className='ac-link'>
          Start with your problem
        </Link>
      </div>
    </div>
  </section>
)

export default WorkSection
