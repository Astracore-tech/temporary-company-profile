import React from 'react'
import Link from 'next/link'
import { services } from '@/content/services'
import { projectsForService } from '@/content/portfolio'
import SectionHeading from '@/components/SharedComponent/SectionHeading'

/**
 * The services, rendered from src/content/services.ts. `detailed` (the
 * /services page) shows the buyer problem, approach, examples and related
 * work; otherwise a compact list linking there (the home page).
 */
const Services = ({ detailed = false }: { detailed?: boolean }) => (
  <section className={`scroll-mt-20 ${detailed ? '' : 'border-t border-[var(--ac-line)]'}`} id='services'>
    <div className='ac-container'>
      <SectionHeading
        eyebrow='What we build'
        title='Four kinds of work, each starting from a problem you can name'
        description='If yours doesn’t fit neatly, tell us anyway. Working out the right approach is part of the first conversation.'
      />

      <div className='border-t border-[var(--ac-line-strong)]'>
        {services.map((s, i) => (
          <article
            key={s.id}
            id={s.id}
            className='scroll-mt-24 grid grid-cols-1 md:grid-cols-[3rem_minmax(0,4fr)_minmax(0,7fr)] gap-x-8 gap-y-3 py-8 border-b border-[var(--ac-line)]'>
            <span className='text-[13px] font-semibold text-[var(--ac-accent)] tabular-nums pt-1'>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className='ac-h3'>{s.title}</h3>
            <div>
              {detailed ? (
                <div className='space-y-5'>
                  <div>
                    <p className='ac-label mb-1.5'>The problem</p>
                    <p className='ac-body'>{s.problem}</p>
                  </div>
                  <div>
                    <p className='ac-label mb-1.5'>What we build</p>
                    <p className='ac-body'>{s.approach}</p>
                  </div>
                  <ul className='space-y-1.5'>
                    {s.examples.map((ex) => (
                      <li key={ex} className='ac-small flex gap-3'>
                        <span className='text-[var(--ac-accent)]' aria-hidden='true'>
                          –
                        </span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                  {projectsForService(s.id).length > 0 && (
                    <p className='ac-small'>
                      See it in our work:{' '}
                      {projectsForService(s.id).map((p, j) => (
                        <React.Fragment key={p.slug}>
                          {j > 0 && ', '}
                          <Link href={`/portfolio/${p.slug}/`} className='ac-link'>
                            {p.name}
                          </Link>
                        </React.Fragment>
                      ))}
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <p className='ac-body text-[var(--ac-ink-3)]'>{s.summary}</p>
                  <Link href={`/services/#${s.id}`} className='ac-link mt-3'>
                    How we’d approach it →
                  </Link>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default Services
