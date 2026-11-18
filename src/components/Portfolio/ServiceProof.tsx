import React from 'react'
import Link from 'next/link'
import { services, departmentPath } from '@/content/services'
import { projectsForService, STATUS_LABEL } from '@/content/portfolio'
import SectionHeading from '@/components/SharedComponent/SectionHeading'
import Reveal from '@/components/Common/Reveal'

/**
 * Service-to-work mapping. A service only counts as proof when a finished
 * project sits behind it; where none does, the note says so.
 */
const ServiceProof = () => (
  <section className='border-t border-[var(--ac-line)]'>
    <div className='ac-container'>
      <SectionHeading
        eyebrow='By service'
        title={
          <>
            What we can show
            <br />
            <span className='ac-muted-line'>for each department</span>
          </>
        }
        description='A department only counts as proof when there is a finished project behind it. Where there is not, we say so.'
      />

      <div className='border-t border-[var(--ac-line)]'>
        {services.map((s, i) => {
          const proof = projectsForService(s.id)
          return (
            <Reveal key={s.id} delay={i * 50}>
              <div className='grid grid-cols-1 gap-4 border-b border-[var(--ac-line)] py-6 md:grid-cols-12 md:gap-8'>
                <div className='flex items-baseline gap-4 md:col-span-4'>
                  <span className='ac-index' style={{ color: s.tone }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Link
                    href={departmentPath(s)}
                    className='ac-h3 flex items-center gap-2.5 transition-colors hover:text-[var(--ac-accent)]'>
                    <span
                      aria-hidden='true'
                      className='h-1.5 w-1.5 shrink-0 rounded-[1px]'
                      style={{ background: s.tone }}
                    />
                    {s.title}
                  </Link>
                </div>

                <div className='md:col-span-8'>
                  {proof.length > 0 ? (
                    <ul className='space-y-4'>
                      {proof.map((p) => (
                        <li key={p.slug}>
                          <div className='flex flex-wrap items-baseline gap-x-3 gap-y-1'>
                            <Link
                              href={`/portfolio/${p.slug}/`}
                              className='text-[15px] font-medium text-[var(--ac-ink)] transition-colors hover:text-[var(--ac-accent)]'>
                              {p.name}
                            </Link>
                            <span className='ac-meta'>{STATUS_LABEL[p.status]}</span>
                          </div>
                          <p className='ac-small mt-1 max-w-2xl'>{p.proof}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className='ac-small max-w-2xl'>
                      {s.proofNote ?? 'No finished project to show yet.'}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  </section>
)

export default ServiceProof
