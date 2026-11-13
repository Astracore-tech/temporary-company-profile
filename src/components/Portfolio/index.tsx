import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { projects, featuredProject, STATUS_LABEL, type Project } from '@/content/portfolio'
import SectionHeading from '@/components/SharedComponent/SectionHeading'

/** Honest status: green for running work, amber for unfinished. */
export const StatusTag = ({ status }: { status: Project['status'] }) => {
  const done = status !== 'in-development'
  return (
    <span className='ac-tag' style={{ color: done ? 'var(--ac-ok)' : 'var(--ac-warn)' }}>
      <span aria-hidden='true' className='inline-block w-1.5 h-1.5 rounded-full bg-current' />
      {STATUS_LABEL[status]}
    </span>
  )
}

/** The lead case study, with its real screenshot. */
export const FeaturedProject = ({ p = featuredProject }: { p?: Project }) => {
  const shot = p.evidence?.[0]
  return (
    <Link
      href={`/portfolio/${p.slug}/`}
      className='ac-card group grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] overflow-hidden'>
      <div className='p-6 sm:p-8 lg:p-10 flex flex-col'>
        <div className='flex flex-wrap gap-2 mb-5'>
          <span className='ac-tag ac-tag-accent'>Case study</span>
          <StatusTag status={p.status} />
        </div>
        <h3 className='ac-h2 !text-[clamp(24px,2.6vw,32px)] mb-4 group-hover:text-[var(--ac-accent)] transition-colors'>
          {p.headline ?? p.name}
        </h3>
        <p className='ac-body mb-6'>{p.lede ?? p.summary}</p>
        <span className='ac-link mt-auto'>Read the case study →</span>
      </div>
      {shot && (
        <div className='bg-[var(--ac-surface-2)] border-t lg:border-t-0 lg:border-l border-[var(--ac-line)] p-4 sm:p-6 flex items-center'>
          <figure className='w-full'>
            <div className='ac-figure'>
              <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes='(min-width: 1024px) 680px, 100vw' />
            </div>
            <figcaption className='text-[13px] leading-snug text-[var(--ac-ink-4)] mt-3'>
              Real screen, demo data.
            </figcaption>
          </figure>
        </div>
      )}
    </Link>
  )
}

const ProjectCard = ({ p }: { p: Project }) => (
  <Link href={`/portfolio/${p.slug}/`} className='ac-card group flex flex-col p-6 sm:p-7 h-full'>
    <div className='mb-4'>
      <StatusTag status={p.status} />
    </div>
    <p className='ac-label mb-1.5'>{p.kind}</p>
    <h3 className='ac-h3 mb-3 group-hover:text-[var(--ac-accent)] transition-colors'>{p.name}</h3>
    <p className='ac-small mb-5'>{p.summary}</p>
    <span className='ac-link mt-auto'>How it’s built →</span>
  </Link>
)

/**
 * The portfolio: the featured case study first, then the rest. On the home
 * page (`compact`) it adds a link through to /portfolio/.
 */
const WorkSection = ({ compact = false }: { compact?: boolean }) => {
  const others = projects.filter((p) => p.slug !== featuredProject.slug)
  return (
    <section className='scroll-mt-20' id='work'>
      <div className='ac-container'>
        <SectionHeading
          eyebrow='Our work'
          title='Systems we have built and run ourselves'
          description='We are a young company, so instead of mock-ups we show what we have actually built, described as it stands today. No client names or results we can’t stand behind.'
          aside={
            compact ? (
              <Link href='/portfolio/' className='ac-link'>
                All work →
              </Link>
            ) : undefined
          }
        />
        <FeaturedProject />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
          {others.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkSection
