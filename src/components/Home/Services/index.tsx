'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Servicebox } from '@/app/api/data'
import { Icon } from '@iconify/react'
import SectionHeading from '@/components/SharedComponent/SectionHeading'

// ── Category mapping ─────────────────────────────────────────────────────────
const iconToCat: Record<string, string> = {
  'ph:globe-bold': 'Digital',
  'ph:device-mobile-bold': 'Digital',
  'ph:shopping-cart-bold': 'Digital',
  'ph:megaphone-bold': 'Digital',
  'ph:circles-three-plus-bold': 'Enterprise',
  'ph:receipt-bold': 'Enterprise',
  'ph:shield-check-bold': 'Enterprise',
  'ph:paint-brush-broad-bold': 'Creative',
  'ph:film-slate-bold': 'Creative',
  'ph:robot-bold': 'Intelligence',
  'ph:student-bold': 'Intelligence',
  'ph:monitor-play-bold': 'Intelligence',
}

const ALL = 'All'

/** Derived from the data so a service category can never lose its tab. */
const categories = [
  ALL,
  ...Array.from(new Set(Servicebox.map((s: any) => iconToCat[s.icon]).filter(Boolean))),
]

// ── Featured stories ─────────────────────────────────────────────────────────
const stories = [
  {
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    badge: 'Web & Mobile',
    headline: 'Engineered for\nSpeed & Scale',
    sub: 'Next.js, React & Flutter powering businesses from Nairobi to global markets.',
  },
  {
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=900&q=80',
    badge: 'AI & Automation',
    headline: '24/7 Intelligent\nAutomation',
    sub: 'WhatsApp bots, AI assistants and smart workflows running while you sleep.',
  },
  {
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80',
    badge: 'Brand & Design',
    headline: 'Premium Brand\nIdentities',
    sub: 'UI/UX, motion graphics and visual identities that make a lasting impression.',
  },
]

// ── Service card ─────────────────────────────────────────────────────────────
function ServiceCard({ item, index }: { item: any; index: number }) {
  const cat = iconToCat[item.icon] || 'Service'

  return (
    <Link
      href='/services'
      className='group relative flex flex-col h-full bg-[var(--ac-surface)] hover:bg-[var(--ac-surface-2)] transition-colors duration-300'>
      {/* Fixed-height thumbnail keeps every card in the row identical */}
      <div className='ac-media relative h-[180px] shrink-0'>
        <img src={item.image} alt='' aria-hidden='true' loading='lazy' decoding='async' />
        <span className='absolute top-3.5 left-4 z-10 ac-tag ac-tag-accent bg-[rgba(8,9,12,0.72)] backdrop-blur-sm'>
          {cat}
        </span>
        <div
          className='absolute top-3 right-3.5 z-10 w-9 h-9 flex items-center justify-center border backdrop-blur-sm'
          style={{
            background: 'rgba(8,9,12,0.72)',
            borderColor: 'var(--ac-accent-line)',
          }}>
          <Icon icon={item.icon} width='17' height='17' className='text-[var(--ac-accent)]' />
        </div>
      </div>

      {/* Body — flex column so the footer sits on the baseline in every card */}
      <div className='flex flex-col flex-1 px-6 pt-5 pb-6'>
        <span className='text-[10px] font-bold tracking-[0.25em] text-[var(--ac-ink-4)]'>
          {String(index + 1).padStart(2, '0')}
        </span>

        <h3 className='ac-h4 mt-3 mb-2.5 line-clamp-2 min-h-[42px]'>{item.title}</h3>

        <p className='ac-small line-clamp-3'>{item.description}</p>

        <div className='ac-card-foot pt-5'>
          <div className='h-px w-full bg-[var(--ac-line)] mb-4' />
          <div className='flex items-center justify-between'>
            <span className='text-[11px] font-bold tracking-wider text-[var(--ac-ink-4)] group-hover:text-[var(--ac-accent)] transition-colors duration-300'>
              Get Started →
            </span>
            <span className='w-6 h-6 flex items-center justify-center rounded-full border border-[var(--ac-line)] group-hover:border-[var(--ac-accent)] transition-colors duration-300'>
              <svg width='7' height='7' viewBox='0 0 7 7' fill='none' aria-hidden='true'>
                <path
                  d='M1 6L6 1M6 1H2M6 1V5'
                  stroke='currentColor'
                  className='text-[var(--ac-ink-4)] group-hover:text-[var(--ac-accent)] transition-colors'
                  strokeWidth='1.2'
                  strokeLinecap='round'
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Story card ───────────────────────────────────────────────────────────────
function StoryCard({ s, i }: { s: (typeof stories)[0]; i: number }) {
  return (
    <div className='group relative overflow-hidden select-none min-h-[320px] bg-[var(--ac-surface)]'>
      <div className='ac-media absolute inset-0'>
        <img src={s.image} alt='' aria-hidden='true' loading='lazy' decoding='async' />
      </div>

      <div className='relative z-10 flex flex-col justify-between h-full p-8 min-h-[320px]'>
        <span className='ac-tag ac-tag-accent self-start'>{s.badge}</span>

        <div className='flex flex-col gap-3 mt-auto'>
          <h3 className='ac-h2 whitespace-pre-line' style={{ fontSize: 'clamp(24px, 2.6vw, 34px)' }}>
            {s.headline}
          </h3>
          <p className='ac-small max-w-xs'>{s.sub}</p>
          <span className='text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--ac-ink-4)] group-hover:text-[var(--ac-accent)] transition-colors duration-300'>
            {`${String(i + 1).padStart(2, '0')} / 03`}
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Section ──────────────────────────────────────────────────────────────────
const Services = () => {
  const [activeTab, setActiveTab] = useState<string>(ALL)

  const displayed =
    activeTab === ALL ? Servicebox : Servicebox.filter((s: any) => iconToCat[s.icon] === activeTab)

  return (
    <section className='border-t border-[var(--ac-line)] scroll-mt-24' id='services'>
      <div className='ac-container'>
        <SectionHeading
          eyebrow='What We Do'
          title={
            <>
              Our
              <br />
              <span className='ac-muted-line'>Services</span>
            </>
          }
          description={
            <>
              Premium <strong className='text-[var(--ac-ink)] font-semibold'>software solutions</strong>{' '}
              engineered for{' '}
              <strong className='text-[var(--ac-accent)] font-semibold'>modern enterprises</strong> across
              Kenya and East Africa.
            </>
          }
        />

        {/* Featured stories */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--ac-line)] border border-[var(--ac-line)] mb-10'>
          {stories.map((s, i) => (
            <StoryCard key={s.badge} s={s} i={i} />
          ))}
        </div>

        {/* Category tabs */}
        <div className='flex flex-wrap items-center gap-2 mb-8'>
          {categories.map((cat) => {
            const isActive = activeTab === cat
            return (
              <button
                key={cat}
                type='button'
                aria-pressed={isActive}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2.5 text-xs font-semibold tracking-wide cursor-pointer transition-colors whitespace-nowrap border ${
                  isActive
                    ? 'bg-[var(--ac-accent)] text-[var(--ac-on-accent)] border-[var(--ac-accent)]'
                    : 'bg-transparent text-[var(--ac-ink-3)] border-[var(--ac-line)] hover:text-[var(--ac-ink)] hover:border-[var(--ac-line-strong)]'
                }`}>
                {cat}
              </button>
            )
          })}
          <span className='ml-auto ac-small'>{displayed.length} services</span>
        </div>

        {/* Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[var(--ac-line)] border border-[var(--ac-line)]'>
          {displayed.map((item: any, index: number) => (
            <ServiceCard key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className='flex items-center justify-end pt-6'>
          <Link href='/contact' className='ac-link'>
            Start a Project →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Services
