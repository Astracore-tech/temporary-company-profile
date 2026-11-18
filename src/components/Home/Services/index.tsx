import React from 'react'
import Link from 'next/link'
import { services, departmentPath } from '@/content/services'
import { PRIMARY_CTA } from '@/content/site-copy'
import SectionHeading from '@/components/SharedComponent/SectionHeading'

/**
 * The five departments. `detailed` adds a few included services and is used on
 * /services/; the home page uses the quieter list.
 */
const Services = ({ detailed = false }: { detailed?: boolean }) => (
  <section className='border-t border-[var(--ac-line)] scroll-mt-24' id='services'>
    <div className='ac-container'>
      <SectionHeading
        eyebrow='Departments'
        title={
          <>
            Five departments
            <br />
            <span className='ac-muted-line'>one operating standard</span>
          </>
        }
        description='Marketing, AI, software, websites and managed operations. Start with the one closest to the problem.'
      />

      <div className='border-t border-[var(--ac-line)]'>
        {services.map((s, i) => (
          <Link
            key={s.id}
            id={s.id}
            href={departmentPath(s)}
            className='group relative flex scroll-mt-28 items-start gap-4 overflow-hidden border-b border-[var(--ac-line)] py-6 transition-colors hover:bg-[rgba(255,255,255,0.015)] sm:gap-6'>
            <span
              className='ac-index w-5 shrink-0 pt-1.5'
              style={{ color: s.tone }}>
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className='min-w-0 flex-1'>
              <div className='flex flex-wrap items-baseline gap-x-3 gap-y-1'>
                <h3 className='ac-h3 flex items-center gap-2.5 transition-colors group-hover:text-[var(--ac-accent)]'>
                  <span
                    aria-hidden='true'
                    className='h-1.5 w-1.5 shrink-0 rounded-[1px]'
                    style={{ background: s.tone }}
                  />
                  {s.title}
                </h3>
                <span className='ac-meta'>{s.includes.length} services</span>
              </div>

              <p className='ac-body mt-1.5 max-w-2xl'>{s.summary}</p>
              <p className='ac-small mt-2 text-[var(--ac-ink-2)]'>{s.outcome}</p>

              {detailed && (
                <ul className='mt-3 flex flex-wrap gap-1.5'>
                  {s.includes.slice(0, 3).map((item) => (
                    <li key={item} className='ac-tag'>
                      {item}
                    </li>
                  ))}
                  <li className='ac-tag'>+{s.includes.length - 3} more</li>
                </ul>
              )}
            </div>

            <span className='hidden shrink-0 pt-1 text-[13px] font-medium text-[var(--ac-ink-3)] transition-colors group-hover:text-[var(--ac-accent)] sm:block'>
              View department
            </span>
            <i
              className='ti ti-arrow-up-right mt-1 shrink-0 text-[16px] text-[var(--ac-ink-4)] transition-colors group-hover:text-[var(--ac-accent)]'
              aria-hidden='true'
            />
            <span
              aria-hidden='true'
              className='pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-[var(--ac-ease)] group-hover:scale-x-100'
              style={{ background: s.tone }}
            />
          </Link>
        ))}
      </div>

      <div className='flex flex-col justify-between gap-5 pt-8 sm:flex-row sm:items-center'>
        <p className='ac-small max-w-md'>
          Not sure which department you need? Describe the problem and we will work it out. Each can
          be a project, a managed service, or both; the proposal says which parts we run.
        </p>
        <Link href={PRIMARY_CTA.href} className='ac-btn ac-btn-primary'>
          {PRIMARY_CTA.label}
        </Link>
      </div>
    </div>
  </section>
)

export default Services
