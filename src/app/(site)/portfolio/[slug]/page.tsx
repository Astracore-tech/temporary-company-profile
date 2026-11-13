import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import HeroSub from '@/components/SharedComponent/HeroSub'
import InquirySection from '@/components/Inquiry/InquirySection'
import JsonLd from '@/components/SEO/JsonLd'
import { StatusTag } from '@/components/Portfolio'
import { projects, projectBySlug } from '@/content/portfolio'
import { serviceTitle } from '@/content/services'
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
  <p className='text-[var(--ac-ink-4)] text-[10px] font-bold uppercase tracking-[0.22em] mb-4'>
    {children}
  </p>
)

const Checklist = ({ items, mark }: { items: string[]; mark: string }) => (
  <ul className='space-y-3'>
    {items.map((item) => (
      <li key={item} className='ac-body flex gap-3'>
        <i className={`ti ${mark} text-[var(--ac-accent)] mt-1 shrink-0`} aria-hidden='true' />
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
            { name: 'Our Work', path: '/portfolio' },
            { name: p.name, path: `/portfolio/${p.slug}` },
          ]),
          projectSchema(p)
        )}
      />
      <HeroSub
        title={p.name}
        description={p.summary}
        breadcrumbLinks={[
          { href: '/', text: 'Home' },
          { href: '/portfolio', text: 'Our Work' },
          { href: `/portfolio/${p.slug}`, text: p.name },
        ]}
      />

      {/* Overview: status, kind, stack, services */}
      <section className='border-b border-[var(--ac-line)] !py-10'>
        <div className='ac-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div>
            <Label>Status</Label>
            <StatusTag status={p.status} />
          </div>
          <div>
            <Label>What it is</Label>
            <p className='ac-small'>{p.kind}</p>
          </div>
          <div>
            <Label>Built with</Label>
            <ul className='flex flex-wrap gap-2'>
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

      <section>
        <div className='ac-container grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-20'>
          <div>
            <span className='ac-eyebrow'>The problem</span>
            <p className='ac-lead mt-6'>{p.problem}</p>
          </div>
          <div className='space-y-12'>
            <div>
              <Label>{p.planned ? 'Done so far' : 'What we built'}</Label>
              <Checklist items={p.built} mark='ti-check' />
            </div>
            {p.planned && (
              <div>
                <Label>Designed, not yet built</Label>
                <Checklist items={p.planned} mark='ti-circle-dashed' />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className='border-t border-[var(--ac-line)]'>
        <div className='ac-container'>
          <span className='ac-eyebrow'>How it works</span>
          <ol className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[var(--ac-line)] border border-[var(--ac-line)]'>
            {p.flow.map((f, i) => (
              <li key={f.step} className='bg-[var(--ac-surface)] p-6 relative'>
                <span className='text-[10px] font-bold tracking-[0.25em] text-[var(--ac-accent)]'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className='ac-h4 mt-3 mb-2'>{f.step}</h3>
                <p className='ac-small'>{f.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className='border-t border-[var(--ac-line)]'>
        <div className='ac-container'>
          <span className='ac-eyebrow'>Decisions worth explaining</span>
          <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6'>
            {p.decisions.map((d) => (
              <article key={d.title} className='ac-card p-6 sm:p-8'>
                <h3 className='ac-h4 mb-3'>{d.title}</h3>
                <p className='ac-small'>{d.body}</p>
              </article>
            ))}
          </div>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-12'>
            <Link href='/portfolio/' className='ac-link'>
              ← All work
            </Link>
            <Link href={`/portfolio/${next.slug}/`} className='ac-link'>
              Next: {next.name} →
            </Link>
          </div>
        </div>
      </section>

      <InquirySection />
    </>
  )
}
