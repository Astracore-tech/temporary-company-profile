import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import HeroSub from '@/components/SharedComponent/HeroSub'
import InquirySection from '@/components/Inquiry/InquirySection'
import JsonLd from '@/components/SEO/JsonLd'
import { StatusTag } from '@/components/Portfolio'
import FlowRail from '@/components/Portfolio/FlowRail'
import { projects, projectBySlug } from '@/content/portfolio'
import { serviceTitle, serviceTone } from '@/content/services'
import { pageMetadata } from '@/utils/pageMeta'
import { jsonLdGraph, breadcrumbSchema, projectSchema } from '@/utils/structuredData'

type Params = { params: Promise<{ slug: string }> }

// Only the slugs in content/portfolio.ts exist; anything else is a 404.
export const dynamicParams = false
export const generateStaticParams = () => projects.map(({ slug }) => ({ slug }))

export async function generateMetadata({ params }: Params) {
  const project = projectBySlug((await params).slug)
  if (!project) return {}
  return pageMetadata({
    title: `${project.name} — ${project.kind}`,
    description: project.summary,
    path: `/portfolio/${project.slug}`,
  })
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className='ac-label mb-3'>{children}</p>
)

const Checklist = ({ items, mark }: { items: string[]; mark: string }) => (
  <ul className='space-y-3'>
    {items.map((item) => (
      <li key={item} className='ac-body flex gap-3'>
        <i className={`ti ${mark} mt-1 shrink-0 text-[15px] text-[var(--ac-ink-4)]`} aria-hidden='true' />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

export default async function ProjectPage({ params }: Params) {
  const project = projectBySlug((await params).slug)
  if (!project) notFound()
  const p = project
  const index = projects.indexOf(p)
  const next = projects[(index + 1) % projects.length]

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Our work', path: '/portfolio' },
            { name: p.name, path: `/portfolio/${p.slug}` },
          ]),
          projectSchema(p)
        )}
      />
      <HeroSub
        eyebrow='Our work'
        title={p.name}
        description={p.summary}
        breadcrumbLinks={[
          { href: '/', text: 'Home' },
          { href: '/portfolio', text: 'Our work' },
          { href: `/portfolio/${p.slug}`, text: p.name },
        ]}
        aside={
          <div className='border-t border-[var(--ac-line)] pt-5'>
            <StatusTag status={p.status} />
            <dl className='mt-4 grid grid-cols-2 gap-4'>
              <div>
                <dt className='ac-meta'>Built</dt>
                <dd className='ac-stat mt-1'>{p.built.length}</dd>
              </div>
              <div>
                <dt className='ac-meta'>{p.status === 'explored' ? 'Explored' : 'In design'}</dt>
                <dd
                  className='ac-stat mt-1'
                  style={{
                    color:
                      (p.planned?.length ?? 0) > 0 ? 'var(--ac-warn)' : 'var(--ac-ink)',
                  }}>
                  {p.planned?.length ?? 0}
                </dd>
              </div>
            </dl>
          </div>
        }
      />

      {/* Overview: status, kind, stack, services */}
      <section className='border-b border-[var(--ac-line)] !py-10'>
        <div className='ac-container grid grid-cols-1 gap-8 sm:grid-cols-3'>
          <div>
            <Label>What it is</Label>
            <p className='ac-small'>{p.kind}</p>
          </div>
          <div>
            <Label>Built with</Label>
            <ul className='flex flex-wrap gap-1.5'>
              {p.stack.map((t) => (
                <li key={t} className='ac-tag'>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Label>Related services</Label>
            <ul className='space-y-1.5'>
              {p.services.map((id) => (
                <li key={id}>
                  <Link href={`/services/#${id}`} className='ac-link'>
                    {serviceTitle(id)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What it proves */}
      <section className='border-b border-[var(--ac-line)]'>
        <div className='ac-container grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16'>
          <div className='lg:col-span-4'>
            <span className='ac-eyebrow'>What this proves</span>
            <div className='mt-6'>
              <p className='ac-meta'>Replaces</p>
              <p className='ac-body mt-1'>{p.replaces}</p>
            </div>
          </div>
          <div className='lg:col-span-8'>
            <p className='ac-lead'>{p.proof}</p>
            {(p.status === 'in-use' || p.status === 'internal-tool') && (
              <p className='ac-small mt-5 border-l border-[var(--ac-line-strong)] pl-3'>
                Internal system. No client data is shown.
              </p>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className='ac-container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16'>
          <div className='lg:col-span-5'>
            <span className='ac-eyebrow'>The problem</span>
            <p className='ac-lead mt-5'>{p.problem}</p>
          </div>
          <div className='space-y-10 lg:col-span-7'>
            <div>
              <Label>{p.planned ? 'Done so far' : 'What we built'}</Label>
              <Checklist items={p.built} mark='ti-check' />
            </div>
            {p.planned && (
              <div>
                <Label>
                  {p.status === 'explored' ? 'Explored, not built' : 'Designed, not yet built'}
                </Label>
                <Checklist items={p.planned} mark='ti-circle-dashed' />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className='border-t border-[var(--ac-line)]'>
        <div className='ac-container'>
          <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
            <div>
              <span className='ac-eyebrow'>How it works</span>
              <h2 className='ac-h2 mt-4'>From input to result</h2>
            </div>
            <span className='ac-meta'>{p.flow.length} steps</span>
          </div>

          <FlowRail steps={p.flow} tone={serviceTone(p.services[0])} />
        </div>
      </section>

      <section className='border-t border-[var(--ac-line)]'>
        <div className='ac-container grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16'>
          <div className='lg:col-span-4'>
            <span className='ac-eyebrow'>Decisions</span>
            <h2 className='ac-h2 mt-4'>Why it is built this way</h2>
          </div>
          <div className='border-t border-[var(--ac-line)] lg:col-span-8'>
            {p.decisions.map((d, i) => (
              <div
                key={d.title}
                className='grid grid-cols-[24px_minmax(0,1fr)] gap-4 border-b border-[var(--ac-line)] py-5'>
                <span className='ac-index pt-0.5'>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className='ac-h4'>{d.title}</h3>
                  <p className='ac-small mt-1.5'>{d.body}</p>
                </div>
              </div>
            ))}
            <div className='flex flex-col justify-between gap-4 pt-8 sm:flex-row sm:items-center'>
              <Link href='/portfolio/' className='ac-link'>
                ← All work
              </Link>
              <Link href={`/portfolio/${next.slug}/`} className='ac-link'>
                Next: {next.name} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InquirySection />
    </>
  )
}
