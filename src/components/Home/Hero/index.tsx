'use client'
import Link from 'next/link'
import { services } from '@/content/services'
import { PRIMARY_CTA } from '@/content/site-copy'

const CONTACT = [
  { icon: 'ti-map-pin', label: 'Kilimani, Nairobi, Kenya', href: null },
  { icon: 'ti-mail', label: 'info@astracoretech.org', href: 'mailto:info@astracoretech.org' },
  { icon: 'ti-phone', label: '0739 045 698', href: 'tel:+254739045698' },
]

const SOCIALS = [
  { icon: 'ti-brand-linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/astra-coretech-87105b415' },
  { icon: 'ti-brand-x', label: 'Twitter/X', href: 'https://x.com/AstraCoreTec' },
  { icon: 'ti-brand-instagram', label: 'Instagram', href: 'https://www.instagram.com/astracoretech3' },
]

const Hero = () => {
  return (
    <section
      id='home'
      className='ac-flush relative min-h-screen flex flex-col overflow-hidden bg-[var(--ac-bg)] pt-20'>

      {/* ── Background ──────────────────────────────────────────────────── */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: "url('/images/hero/cinematic-office.png')",
          filter: 'saturate(0.5) contrast(1.05) brightness(0.55)',
        }}
      />
      <div
        className='absolute inset-0'
        style={{
          background:
            'linear-gradient(105deg, rgba(8,9,12,0.95) 0%, rgba(8,9,12,0.78) 45%, rgba(8,9,12,0.9) 100%)',
        }}
      />
      <div
        className='absolute top-0 left-0 w-[720px] h-[720px] pointer-events-none'
        style={{
          background: 'radial-gradient(circle at 18% 22%, rgba(0,229,255,0.06) 0%, transparent 62%)',
        }}
      />

      {/* ── Utility bar ─────────────────────────────────────────────────── */}
      <div className='relative z-10 border-b border-[var(--ac-line)]'>
        <div className='ac-container flex flex-col md:flex-row items-center gap-x-7 gap-y-2 py-3'>
          {CONTACT.map(({ icon, label, href }) => (
            <div key={label} className='flex items-center gap-2'>
              <i className={`ti ${icon} text-[var(--ac-accent)] text-xs`} />
              {href ? (
                <Link
                  href={href}
                  className='text-[11px] text-[var(--ac-ink-3)] hover:text-[var(--ac-accent)] transition-colors'>
                  {label}
                </Link>
              ) : (
                <span className='text-[11px] text-[var(--ac-ink-3)]'>{label}</span>
              )}
            </div>
          ))}
          <div className='md:ml-auto flex items-center gap-5'>
            {SOCIALS.map(({ icon, label, href }) => (
              <Link
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={label}
                className='text-[var(--ac-ink-4)] hover:text-[var(--ac-accent)] transition-colors text-sm'>
                <i className={`ti ${icon}`} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <div className='relative z-10 flex-1 flex items-center py-20 lg:py-24'>
        <div className='ac-container w-full'>
          <div className='grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] gap-14 lg:gap-20 items-center'>

            {/* Headline */}
            <div data-aos='fade-up' data-aos-duration='800'>
              <span className='ac-eyebrow mb-7'>Software · Nairobi, Kenya</span>

              <h1 className='ac-display mt-7 mb-8'>
                Software that fixes
                <br />
                how your business runs.
              </h1>

              <p className='ac-lead mb-10'>
                We build business websites and portals, custom operational systems, M&#8209;Pesa
                integrations and workflow automation — for businesses in Kenya and abroad.
              </p>

              <div className='flex items-center flex-wrap gap-3'>
                <Link href={PRIMARY_CTA.href} className='ac-btn ac-btn-primary'>
                  <i className='ti ti-send text-sm' />
                  {PRIMARY_CTA.label}
                </Link>
                <Link href='/services/' className='ac-btn ac-btn-ghost'>
                  What we build
                </Link>
              </div>
            </div>

            {/* Service summary */}
            <ul
              className='hidden lg:flex flex-col gap-px bg-[var(--ac-line)] border border-[var(--ac-line)]'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='150'>
              {services.map(({ id, icon, title, summary }) => (
                <li key={id}>
                  <Link
                    href={`/services/#${id}`}
                    className='group flex items-start gap-5 p-6 bg-[rgba(14,16,20,0.72)] backdrop-blur-md hover:bg-[rgba(27,31,39,0.82)] transition-colors duration-300'>
                    <div
                      className='w-10 h-10 shrink-0 flex items-center justify-center border'
                      style={{
                        background: 'var(--ac-accent-dim)',
                        borderColor: 'var(--ac-accent-line)',
                      }}>
                      <i className={`ti ${icon} text-lg text-[var(--ac-accent)]`} />
                    </div>
                    <div>
                      <h2 className='ac-h4 mb-1.5'>{title}</h2>
                      <p className='ac-small'>{summary}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero
