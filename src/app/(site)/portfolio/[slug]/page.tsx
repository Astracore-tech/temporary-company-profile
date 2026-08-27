import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { portfolioinfo } from '@/app/api/data'
import { Metadata } from 'next'
import JsonLd from '@/components/SEO/JsonLd'
import { pageMetadata } from '@/utils/pageMeta'
import { jsonLdGraph, breadcrumbSchema, caseStudySchema } from '@/utils/structuredData'

// ── Static generation ─────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return portfolioinfo
    .filter((p) => p.type === 'image' && Boolean((p as any).slug))
    .map((p) => ({ slug: (p as any).slug as string }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = portfolioinfo.find((p) => p.slug === slug && p.type === 'image') as any
  if (!item) return { title: 'Project' }

  const overview: string | undefined = item.overview
  const description = overview
    ? overview.length > 158
      ? `${overview.slice(0, 155).trimEnd()}...`
      : overview
    : `${item.title} — ${item.info} project delivered by AstraCore Technologies in Nairobi.`

  return pageMetadata({
    title: item.title,
    description,
    path: `/portfolio/${slug}`,
    image: item.image,
    imageAlt: item.alt || item.title,
  })
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = portfolioinfo.find((p) => p.slug === slug && p.type === 'image') as any


  if (!item) return notFound()

  // The palette is single-accent now; per-item colours are no longer honoured.
  const accent = 'var(--ac-accent)'

  return (
    <main className="bg-[var(--ac-bg)] text-white min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Portfolio', path: '/portfolio' },
            { name: item.title, path: `/portfolio/${slug}` },
          ]),
          caseStudySchema({
            title: item.title,
            description: item.overview,
            slug,
            image: item.image,
            client: item.client,
            year: item.year,
          })
        )}
      />

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: 'clamp(380px, 55vh, 620px)' }}>
        <img
          src={item.image}
          alt={item.alt || item.title}
          className="w-full h-full object-cover"
          style={{ opacity: 0.5 }}
        />
        {/* gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--ac-bg) 0%, rgba(8,9,12,0.45) 60%, rgba(8,9,12,0.15) 100%)' }}
        />

        {/* Top bar nav */}
        <div className="absolute top-0 left-0 right-0 px-6 lg:px-16 py-5 flex items-center justify-between border-b border-[var(--ac-line)] backdrop-blur-sm bg-[var(--ac-bg)]/40 z-10">
          <Link
            href="/portfolio"
            className="flex items-center gap-2 text-[var(--ac-ink-3)] text-xs hover:text-white transition-colors"
          >
            <i className="ti ti-arrow-left text-sm" />
            Back to Portfolio
          </Link>
          <span
            className="text-[10px] font-semibold tracking-[0.28em] uppercase px-3 py-1.5 border"
            style={{ color: accent, borderColor: 'var(--ac-accent-line)' }}
          >
            {item.info}
          </span>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-16 pb-10 z-10">
          <p className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: accent }}>
            {item.client || 'AstraCore Project'}
          </p>
          <h1
            className="text-white font-extrabold leading-none tracking-tighter"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(40px, 6vw, 80px)',
            }}
          >
            {item.title}
          </h1>
        </div>
      </section>

      {/* ── Meta strip ──────────────────────────────────────────────────── */}
      <section className="border-b border-[var(--ac-line)] px-6 lg:px-16 py-6 flex flex-wrap items-center gap-8 md:gap-16 bg-[var(--ac-surface)]">
        {item.client && (
          <div>
            <p className="text-[var(--ac-ink-4)] text-[9px] tracking-[0.28em] uppercase mb-1">Client</p>
            <p className="text-[var(--ac-ink-2)] text-sm font-medium">{item.client}</p>
          </div>
        )}
        {item.year && (
          <div>
            <p className="text-[var(--ac-ink-4)] text-[9px] tracking-[0.28em] uppercase mb-1">Year</p>
            <p className="text-[var(--ac-ink-2)] text-sm font-medium">{item.year}</p>
          </div>
        )}
        {item.info && (
          <div>
            <p className="text-[var(--ac-ink-4)] text-[9px] tracking-[0.28em] uppercase mb-1">Category</p>
            <p className="text-[var(--ac-ink-2)] text-sm font-medium">{item.info}</p>
          </div>
        )}
        {item.services && (
          <div>
            <p className="text-[var(--ac-ink-4)] text-[9px] tracking-[0.28em] uppercase mb-1">Services</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {item.services.map((s: string) => (
                <span
                  key={s}
                  className="text-[10px] px-2.5 py-1 border border-[var(--ac-line-strong)] text-[var(--ac-ink-2)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="md:ml-auto">
          <Link
            href="#contact-section"
            className="flex items-center gap-2 text-xs font-bold px-6 py-3 text-black transition-colors"
            style={{ background: accent }}
          >
            <i className="ti ti-send text-xs" />
            Start Similar Project
          </Link>
        </div>
      </section>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-16 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-14">

            {/* Overview */}
            {item.overview && (
              <div>
                <p
                  className="text-[9px] font-semibold tracking-[0.32em] uppercase mb-5"
                  style={{ color: accent }}
                >
                  Overview
                </p>
                <p
                  className="text-[var(--ac-ink-2)] leading-relaxed"
                  style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', lineHeight: 1.7 }}
                >
                  {item.overview}
                </p>
              </div>
            )}

            {/* Challenge */}
            {item.challenge && (
              <div>
                <p
                  className="text-[9px] font-semibold tracking-[0.32em] uppercase mb-5"
                  style={{ color: accent }}
                >
                  The Challenge
                </p>
                <p className="text-[var(--ac-ink-2)] leading-relaxed text-base">{item.challenge}</p>
              </div>
            )}

            {/* Solution */}
            {item.solution && (
              <div>
                <p
                  className="text-[9px] font-semibold tracking-[0.32em] uppercase mb-5"
                  style={{ color: accent }}
                >
                  Our Solution
                </p>
                <p className="text-[var(--ac-ink-2)] leading-relaxed text-base">{item.solution}</p>
              </div>
            )}

            {/* Gallery */}
            {item.galleryImages && item.galleryImages.length > 0 && (
              <div>
                <p
                  className="text-[9px] font-semibold tracking-[0.32em] uppercase mb-5"
                  style={{ color: accent }}
                >
                  Project Gallery
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
                  {item.galleryImages.map((src: string, i: number) => (
                    <div key={i} className="overflow-hidden" style={{ height: '260px' }}>
                      <img
                        src={src}
                        alt={`${item.title} gallery ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right — sidebar */}
          <div className="space-y-10">

            {/* Results */}
            {item.results && (
              <div className="border border-[var(--ac-line)] p-7 bg-[var(--ac-surface)]">
                <p
                  className="text-[9px] font-semibold tracking-[0.32em] uppercase mb-6"
                  style={{ color: accent }}
                >
                  Results
                </p>
                <ul className="space-y-4">
                  {item.results.map((r: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="w-1 h-1 rounded-full mt-2 shrink-0"
                        style={{ background: accent }}
                      />
                      <span className="text-[var(--ac-ink-2)] text-sm leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            {item.tech && (
              <div className="border border-[var(--ac-line)] p-7 bg-[var(--ac-surface)]">
                <p
                  className="text-[9px] font-semibold tracking-[0.32em] uppercase mb-6"
                  style={{ color: accent }}
                >
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((t: string) => (
                    <span
                      key={t}
                      className="text-[11px] font-medium px-3 py-1.5 bg-white/5 text-[var(--ac-ink-2)] border border-[var(--ac-line)] hover:border-[var(--ac-line-strong)] hover:text-white/80 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div
              className="p-7 border"
              style={{ borderColor: 'var(--ac-accent-line)', background: 'var(--ac-accent-dim)' }}
            >
              <p
                className="text-xs font-extrabold tracking-tighter leading-tight mb-3"
                style={{ fontFamily: 'Syne, sans-serif', color: accent }}
              >
                Have a similar project?
              </p>
              <p className="text-[var(--ac-ink-3)] text-xs leading-relaxed mb-5">
                Let&apos;s discuss your vision and build something remarkable together.
              </p>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-xs font-bold text-black px-5 py-3 w-full justify-center transition-opacity hover:opacity-90"
                style={{ background: accent }}
              >
                Get a Free Quote →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Projects ─────────────────────────────────────────────── */}
      <section id="contact-section" className="border-t border-[var(--ac-line)] px-6 lg:px-16 py-20 bg-[var(--ac-surface)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2
              className="text-white font-extrabold tracking-tighter leading-none"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)' }}
            >
              More Work
            </h2>
            <Link
              href="/portfolio"
              className="text-xs font-bold tracking-wider pb-0.5 transition-colors"
              style={{ color: accent, borderBottom: '1.5px solid var(--ac-accent-line)' }}
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
            {portfolioinfo
              .filter((p) => p.type === 'image' && p.slug !== slug)
              .slice(0, 3)
              .map((p) => (
                <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group block relative overflow-hidden" style={{ height: '240px', background: (p as any).bg || '#111' }}>
                  <img
                    src={(p as any).image}
                    alt={(p as any).alt || p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ opacity: 0.7 }}
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 65%)' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-5 py-5">
                    <p className="text-[9px] font-semibold tracking-[0.26em] uppercase mb-1" style={{ color: 'var(--ac-accent)' }}>
                      {p.info}
                    </p>
                    <h3 className="text-white text-lg font-extrabold leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

    </main>
  )
}
