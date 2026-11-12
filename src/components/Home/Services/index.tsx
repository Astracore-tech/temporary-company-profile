import React from 'react'
import Link from 'next/link'
import { services } from '@/content/services'
import { PRIMARY_CTA } from '@/content/site-copy'
import SectionHeading from '@/components/SharedComponent/SectionHeading'

/**
 * The four services, rendered from src/content/services.ts. `detailed` shows
 * the buyer problem, approach and examples (the /services page); otherwise a
 * compact card linking there (the home page).
 */
const Services = ({ detailed = false }: { detailed?: boolean }) => (
  <section className='border-t border-[var(--ac-line)] scroll-mt-24' id='services'>
    <div className='ac-container'>
      <SectionHeading
        eyebrow='What We Build'
        title={
          <>
            Four ways we
            <br />
            <span className='ac-muted-line'>can help</span>
          </>
        }
        description='Each starts from a problem you can describe in plain words. If yours doesn’t fit neatly, tell us anyway.'
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--ac-line)] border border-[var(--ac-line)]'>
        {services.map((s, i) => (
          <article
            key={s.id}
            id={s.id}
            className='scroll-mt-28 flex flex-col bg-[var(--ac-surface)] p-6 sm:p-8 lg:p-10'
            data-aos='fade-up'
            data-aos-duration='700'
            data-aos-delay={`${(i % 2) * 80}`}>
            <div className='flex items-center gap-4 mb-6'>
              <div
                className='w-11 h-11 shrink-0 flex items-center justify-center border'
                style={{ background: 'var(--ac-accent-dim)', borderColor: 'var(--ac-accent-line)' }}>
                <i className={`ti ${s.icon} text-xl text-[var(--ac-accent)]`} aria-hidden='true' />
              </div>
              <h3 className='ac-h3'>{s.title}</h3>
            </div>

            {detailed ? (
              <>
                <p className='text-[var(--ac-ink-4)] text-[10px] font-bold uppercase tracking-[0.22em] mb-2'>
                  The problem
                </p>
                <p className='ac-body mb-6'>{s.problem}</p>
                <p className='text-[var(--ac-ink-4)] text-[10px] font-bold uppercase tracking-[0.22em] mb-2'>
                  What we build
                </p>
                <p className='ac-body mb-5'>{s.approach}</p>
                <ul className='space-y-2 mb-2'>
                  {s.examples.map((ex) => (
                    <li key={ex} className='ac-small flex gap-3'>
                      <span className='text-[var(--ac-accent)]' aria-hidden='true'>
                        —
                      </span>
                      {ex}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p className='ac-body mb-4'>{s.problem}</p>
                <Link href={`/services/#${s.id}`} className='ac-link mt-auto pt-2'>
                  How we’d fix it →
                </Link>
              </>
            )}
          </article>
        ))}
      </div>

      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-8'>
        <p className='ac-small max-w-md'>
          Not sure which of these you need? That’s normal — describe the problem and we’ll work it out
          together.
        </p>
        <Link href={PRIMARY_CTA.href} className='ac-btn ac-btn-primary'>
          {PRIMARY_CTA.label}
        </Link>
      </div>
    </div>
  </section>
)

export default Services
