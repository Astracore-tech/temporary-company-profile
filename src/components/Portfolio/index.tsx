import React from 'react'
import Link from 'next/link'
import { projects, STATUS_LABEL, type Project } from '@/content/portfolio'
import { serviceTitle } from '@/content/services'
import SectionHeading from '@/components/SharedComponent/SectionHeading'

/** Honest status chip — green for running, amber for unfinished. */
export const StatusTag = ({ status }: { status: Project['status'] }) => {
  const done = status !== 'in-development'
  return (
    <span className='ac-tag gap-2' style={{ color: done ? 'var(--ac-ok)' : 'var(--ac-warn)' }}>
      <span
        aria-hidden='true'
        className='inline-block w-1.5 h-1.5 rounded-full'
        style={{ background: 'currentColor' }}
      />
      {STATUS_LABEL[status]}
    </span>
  )
}

const ProjectCard = ({ p, i }: { p: Project; i: number }) => (
  <Link
    href={`/portfolio/${p.slug}/`}
    className='ac-card group flex flex-col p-6 sm:p-8 lg:p-10 h-full'
    data-aos='fade-up'
    data-aos-duration='700'
    data-aos-delay={`${(i % 2) * 80}`}>
    <div className='flex items-start justify-between gap-4 mb-6'>
      <div
        className='w-11 h-11 shrink-0 flex items-center justify-center border'
        style={{ background: 'var(--ac-accent-dim)', borderColor: 'var(--ac-accent-line)' }}>
        <i className={`ti ${p.icon} text-xl text-[var(--ac-accent)]`} aria-hidden='true' />
      </div>
      <StatusTag status={p.status} />
    </div>
    <p className='text-[var(--ac-ink-4)] text-[10px] font-bold uppercase tracking-[0.22em] mb-2'>
      {p.kind}
    </p>
    <h3 className='ac-h3 mb-3 group-hover:text-[var(--ac-accent)] transition-colors'>{p.name}</h3>
    <p className='ac-body mb-6'>{p.summary}</p>
    <div className='mt-auto flex flex-wrap items-center justify-between gap-4'>
      <ul className='flex flex-wrap gap-2' aria-label='Related services'>
        {p.services.map((id) => (
          <li key={id} className='ac-tag'>
            {serviceTitle(id)}
          </li>
        ))}
      </ul>
      <span className='ac-link'>How it’s built →</span>
    </div>
  </Link>
)

/**
 * The portfolio grid. On the home page (`compact`) it adds a link through to
 * /portfolio/; on /portfolio/ itself it explains what the list is and isn't.
 */
const WorkSection = ({ compact = false }: { compact?: boolean }) => (
  <section className='border-t border-[var(--ac-line)] scroll-mt-24' id='work'>
    <div className='ac-container'>
      <SectionHeading
        eyebrow='Our Work'
        title={
          <>
            Systems we’ve built
            <br />
            <span className='ac-muted-line'>and run ourselves</span>
          </>
        }
        description={
          compact
            ? 'We’re a young company, so instead of mock-ups we show what we have actually built — the same kinds of work we offer you.'
            : 'Every project here is our own work, described as it stands today. We don’t show client names, figures or results we can’t stand behind.'
        }
        aside={
          compact ? (
            <Link href='/portfolio/' className='ac-link'>
              See all work →
            </Link>
          ) : undefined
        }
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} p={p} i={i} />
        ))}
      </div>
    </div>
  </section>
)

export default WorkSection
