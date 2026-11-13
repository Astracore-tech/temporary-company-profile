import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/SEO/JsonLd'
import { StatusTag } from '@/components/Portfolio'
import { projects, projectBySlug, type Evidence } from '@/content/portfolio'
import { serviceTitle } from '@/content/services'
import { PRIMARY_CTA } from '@/content/site-copy'
import { pageMetadata } from '@/utils/pageMeta'
import { jsonLdGraph, breadcrumbSchema, projectSchema } from '@/utils/structuredData'

type Params = { params: Promise<{ slug: string }> }

// Only the slugs in content/portfolio.ts exist; anything else is a 404.
export const dynamicParams = false
export const generateStaticParams = () => projects.map(({ slug }) => ({ slug }))

export async function generateMetadata({ params }: Params) {
  const p = projectBySlug((await params).slug)
  if (!p) return {}
  // Link previews (WhatsApp, email) show the real screenshot when there is one.
  const share = p.evidence?.[0]
  return pageMetadata({
    title: p.headline ?? `${p.name} — ${p.kind}`,
    description: p.lede ?? p.summary,
    path: `/portfolio/${p.slug}`,
    ...(share
      ? { image: share.src, imageAlt: share.alt, imageWidth: share.width, imageHeight: share.height }
      : {}),
  })
}

const Label = ({ children }: { children: React.ReactNode }) => <p className='ac-label mb-4'>{children}</p>

const Check = ({ dashed = false }: { dashed?: boolean }) => (
  <svg width='18' height='18' viewBox='0 0 18 18' aria-hidden='true' className='shrink-0 mt-[3px] text-[var(--ac-accent)]'>
    {dashed ? (
      <circle cx='9' cy='9' r='7' fill='none' stroke='currentColor' strokeWidth='1.5' strokeDasharray='3 3' />
    ) : (
      <path d='M3.5 9.5l3.5 3.5 7.5-8' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
    )}
  </svg>
)

const List = ({ items, dashed }: { items: string[]; dashed?: boolean }) => (
  <ul className='space-y-3'>
    {items.map((item) => (
      <li key={item} className='ac-body flex gap-3'>
        <Check dashed={dashed} />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

const Figure = ({ e, priority = false }: { e: Evidence; priority?: boolean }) => (
  <figure>
    <a href={e.src} className='ac-figure block' aria-label={`Open full-size image: ${e.alt}`}>
      <Image src={e.src} alt={e.alt} width={e.width} height={e.height} priority={priority} sizes='(min-width: 1200px) 1100px, 100vw' />
    </a>
    <figcaption className='ac-small mt-3'>{e.caption}</figcaption>
  </figure>
)

export default async function ProjectPage({ params }: Params) {
  const project = projectBySlug((await params).slug)
  if (!project) notFound()
  const p = project
  const [lead, ...moreEvidence] = p.evidence ?? []
  const next = projects[(projects.indexOf(p) + 1) % projects.length]
  const ownTool = p.status === 'in-use' || p.status === 'internal-tool'

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

      {/* First phone screen: what it is, whose it is, what it does. */}
      <section className='!pt-8 sm:!pt-14 !pb-10'>
        <div className='ac-container'>
          <nav aria-label='Breadcrumb' className='ac-small mb-6'>
            <Link href='/portfolio/' className='hover:text-[var(--ac-ink)]'>
              Our work
            </Link>
            <span aria-hidden='true' className='mx-2'>/</span>
            <span className='text-[var(--ac-ink)]'>{p.name}</span>
          </nav>
          <div className='flex flex-wrap gap-2 mb-5'>
            <span className='ac-tag ac-tag-accent'>
              Case study{ownTool ? ' · Our own internal tool' : ''}
            </span>
            <StatusTag status={p.status} />
          </div>
          <h1 className='ac-display max-w-[18ch]'>{p.headline ?? p.name}</h1>
          <p className='ac-lead mt-5'>{p.lede ?? p.summary}</p>
          {p.highlights && (
            <ul className='mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl'>
              {p.highlights.map((h) => (
                <li key={h} className='ac-body flex gap-3'>
                  <Check />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {lead && (
        <section className='!pt-0'>
          <div className='ac-container'>
            <Figure e={lead} priority />
          </div>
        </section>
      )}

      <section className='border-t border-[var(--ac-line)]'>
        <div className='ac-container grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-20'>
          <div>
            <p className='ac-eyebrow mb-3'>The problem it solves</p>
            <p className='ac-lead'>{p.problem}</p>
          </div>
          <div className='space-y-10'>
            <div>
              <Label>{p.planned ? 'Done so far' : 'What we built'}</Label>
              <List items={p.built} />
            </div>
            {p.planned && (
              <div>
                <Label>Designed, not yet built</Label>
                <List items={p.planned} dashed />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className='border-t border-[var(--ac-line)]'>
        <div className='ac-container'>
          <p className='ac-eyebrow mb-3'>How it works</p>
          <ol className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3'>
            {p.flow.map((f, i) => (
              <li key={f.step} className='ac-panel p-5'>
                <span className='text-[13px] font-semibold text-[var(--ac-accent)] tabular-nums'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className='ac-h4 mt-2 mb-1.5'>{f.step}</h3>
                <p className='ac-small'>{f.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {moreEvidence.length > 0 && (
        <section className='!pt-0'>
          <div className='ac-container grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {moreEvidence.map((e) => (
              <Figure key={e.src} e={e} />
            ))}
          </div>
        </section>
      )}

      <section className='border-t border-[var(--ac-line)]'>
        <div className='ac-container'>
          <p className='ac-eyebrow mb-3'>Decisions worth explaining</p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {p.decisions.map((d) => (
              <article key={d.title} className='ac-card p-6'>
                <h3 className='ac-h4 mb-2'>{d.title}</h3>
                <p className='ac-small'>{d.body}</p>
              </article>
            ))}
          </div>

          <dl className='mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8'>
            <div>
              <dt className='ac-label mb-3'>Built with</dt>
              <dd className='flex flex-wrap gap-2'>
                {p.stack.map((t) => (
                  <span key={t} className='ac-tag'>
                    {t}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className='ac-label mb-3'>Related services</dt>
              <dd className='flex flex-wrap gap-x-5 gap-y-2'>
                {p.services.map((id) => (
                  <Link key={id} href={`/services/#${id}`} className='ac-link'>
                    {serviceTitle(id)}
                  </Link>
                ))}
              </dd>
            </div>
          </dl>

          <div className='flex flex-col sm:flex-row sm:justify-between gap-4 pt-10 mt-12 border-t border-[var(--ac-line)]'>
            <Link href='/portfolio/' className='ac-link'>
              ← All work
            </Link>
            <Link href={`/portfolio/${next.slug}/`} className='ac-link'>
              Next: {next.name} →
            </Link>
          </div>
        </div>
      </section>

      {/* The page ends on one action. */}
      <section className='border-t border-[var(--ac-line)] bg-[var(--ac-surface-2)]'>
        <div className='ac-container'>
          <div className='max-w-2xl'>
            <h2 className='ac-h2'>{p.ctaLabel ?? PRIMARY_CTA.label}</h2>
            <p className='ac-body mt-4 mb-8'>
              Tell us how the work is done today and what gets in the way. We reply on the email
              or phone number you give us.
            </p>
            <Link href={PRIMARY_CTA.href} className='ac-btn ac-btn-primary w-full sm:w-auto'>
              {p.ctaLabel ?? PRIMARY_CTA.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
