import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { Metadata } from 'next'
import { getAllPosts, getPostBySlug, getPostSlugs } from '@/utils/markdown'
import markdownToHtml from '@/utils/markdownToHtml'
import { getImgPath } from '@/utils/image'
import JsonLd from '@/components/SEO/JsonLd'
import { pageMetadata } from '@/utils/pageMeta'
import { jsonLdGraph, breadcrumbSchema, articleSchema } from '@/utils/structuredData'

const ACCENT = 'var(--ac-accent)'

const SERP_TITLE_MAX = 60

function trimTitle(title: string) {
  if (title.length <= SERP_TITLE_MAX) return title
  const cut = title.slice(0, SERP_TITLE_MAX - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 30 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:—-]+$/, '')}…`
}

/**
 * These posts ship with an excerpt identical to the title, which is far too
 * short to be a useful search snippet. Fall back to the opening prose.
 */
function articleDescription(post: any): string {
  const excerpt: string = (post.excerpt || '').trim()
  if (excerpt.length >= 80) return excerpt

  const prose = String(post.content || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s+.*$/gm, ' ')
    .replace(/[>*_`#|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const lead = excerpt ? `${excerpt} ` : ''
  const combined = `${lead}${prose}`.trim()
  if (combined.length <= 158) return combined || excerpt

  const cut = combined.slice(0, 157)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:]+$/, '')}…`
}

// ── Static generation ─────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return getPostSlugs().map((file) => ({ slug: file.replace(/\.mdx$/, '') }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug, ['title', 'excerpt', 'coverImage', 'date', 'content'])
  if (!post) return { title: 'Article Not Found' }

  const meta = pageMetadata({
    title: post.title,
    description: articleDescription(post),
    path: `/blog/${slug}`,
    image: post.coverImage,
    imageAlt: post.title,
    type: 'article',
    publishedTime: post.date ? new Date(post.date).toISOString() : undefined,
  })

  // Post titles are long enough that appending the site name blows past the
  // ~60-char SERP limit, so set the title absolutely and trim it instead.
  return { ...meta, title: { absolute: trimTitle(post.title) } }
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug, [
    'title',
    'date',
    'excerpt',
    'coverImage',
    'author',
    'authorImage',
    'content',
  ])

  if (!post) return notFound()

  const content = await markdownToHtml(post.content || '')
  const related = getAllPosts(['title', 'date', 'excerpt', 'coverImage', 'slug'])
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  return (
    <main className='bg-[var(--ac-bg)] text-white min-h-screen' style={{ fontFamily: 'Inter, sans-serif' }}>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${slug}` },
          ]),
          articleSchema({
            title: post.title,
            description: post.excerpt,
            slug,
            date: post.date,
            image: post.coverImage,
            author: post.author,
          })
        )}
      />

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <section className='relative overflow-hidden' style={{ height: 'clamp(360px, 52vh, 580px)' }}>
        {post.coverImage && (
          <Image
            src={getImgPath(post.coverImage)}
            alt={post.title || 'Article cover'}
            fill
            priority
            sizes='100vw'
            className='object-cover'
            style={{ opacity: 0.45 }}
            unoptimized
          />
        )}
        <div
          className='absolute inset-0'
          style={{ background: 'linear-gradient(to top, var(--ac-bg) 0%, rgba(8,9,12,0.45) 60%, rgba(8,9,12,0.15) 100%)' }}
        />

        {/* Top bar nav */}
        <div className='absolute top-0 left-0 right-0 px-6 lg:px-16 py-5 flex items-center justify-between border-b border-[var(--ac-line)] backdrop-blur-sm bg-[var(--ac-bg)]/40 z-10'>
          <Link
            href='/blog'
            className='flex items-center gap-2 text-[var(--ac-ink-3)] text-xs hover:text-white transition-colors'
          >
            <i className='ti ti-arrow-left text-sm' />
            Back to Blog
          </Link>
          <span
            className='text-[10px] font-semibold tracking-[0.28em] uppercase px-3 py-1.5 border'
            style={{ color: ACCENT, borderColor: 'var(--ac-accent-line)' }}
          >
            Insights
          </span>
        </div>

        {/* Hero text */}
        <div className='absolute bottom-0 left-0 right-0 px-6 lg:px-16 pb-10 z-10'>
          <p className='text-[10px] font-semibold tracking-[0.3em] uppercase mb-3' style={{ color: ACCENT }}>
            {post.date ? format(new Date(post.date), 'dd MMM yyyy') : 'AstraCore Journal'}
          </p>
          <h1
            className='text-white font-extrabold leading-none tracking-tighter max-w-4xl'
            style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 4.6vw, 62px)' }}
          >
            {post.title}
          </h1>
        </div>
      </section>

      {/* ── Meta strip ──────────────────────────────────────────────────── */}
      <section className='border-b border-[var(--ac-line)] px-6 lg:px-16 py-6 flex flex-wrap items-center gap-8 md:gap-16 bg-[var(--ac-surface)]'>
        <div className='flex items-center gap-4'>
          {post.authorImage && (
            <Image
              src={getImgPath(post.authorImage)}
              alt={post.author || 'Author'}
              width={44}
              height={44}
              className='rounded-full border border-[var(--ac-line-strong)]'
              unoptimized
            />
          )}
          <div>
            <p className='text-[var(--ac-ink-4)] text-[9px] tracking-[0.28em] uppercase mb-1'>Author</p>
            <p className='text-[var(--ac-ink-2)] text-sm font-medium capitalize'>{post.author || 'AstraCore Team'}</p>
          </div>
        </div>
        {post.date && (
          <div>
            <p className='text-[var(--ac-ink-4)] text-[9px] tracking-[0.28em] uppercase mb-1'>Published</p>
            <p className='text-[var(--ac-ink-2)] text-sm font-medium'>{format(new Date(post.date), 'dd MMM yyyy')}</p>
          </div>
        )}
        <div className='md:ml-auto'>
          <Link
            href='/contact'
            className='ac-btn ac-btn-primary'
          >
            <i className='ti ti-send text-xs' />
            Talk to Our Team
          </Link>
        </div>
      </section>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <section className='px-6 lg:px-16 py-20'>
        <article className='blog-details max-w-3xl mx-auto text-[var(--ac-ink-2)] leading-relaxed'>
          {post.excerpt && (
            <p
              className='text-[var(--ac-ink-2)] mb-10'
              style={{ fontSize: 'clamp(17px, 2.2vw, 21px)', lineHeight: 1.7 }}
            >
              {post.excerpt}
            </p>
          )}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </section>

      {/* ── Related Articles ────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className='border-t border-[var(--ac-line)] px-6 lg:px-16 py-20 bg-[var(--ac-surface)]'>
          <div className='max-w-6xl mx-auto'>
            <div className='flex items-end justify-between mb-10'>
              <h2
                className='text-white font-extrabold tracking-tighter leading-none'
                style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)' }}
              >
                More Reading
              </h2>
              <Link
                href='/blog'
                className='text-xs font-bold tracking-wider pb-0.5 transition-colors'
                style={{ color: ACCENT, borderBottom: '1.5px solid var(--ac-accent-line)' }}
              >
                View All →
              </Link>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-[2px]'>
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className='group block relative overflow-hidden bg-[var(--ac-surface)]'
                  style={{ height: '240px' }}
                >
                  {p.coverImage && (
                    <Image
                      src={getImgPath(p.coverImage)}
                      alt={p.title || 'Article'}
                      fill
                      sizes='(max-width: 768px) 100vw, 33vw'
                      className='object-cover group-hover:scale-105 transition-transform duration-700'
                      style={{ opacity: 0.7 }}
                      unoptimized
                    />
                  )}
                  <div
                    className='absolute inset-0'
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 65%)' }}
                  />
                  <div className='absolute bottom-0 left-0 right-0 px-5 py-5'>
                    <p className='text-[9px] font-semibold tracking-[0.26em] uppercase mb-1' style={{ color: ACCENT }}>
                      {p.date ? format(new Date(p.date), 'dd MMM yyyy') : 'Insights'}
                    </p>
                    <h3
                      className='text-white text-base font-extrabold leading-tight line-clamp-2'
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
