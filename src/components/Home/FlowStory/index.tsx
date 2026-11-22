'use client'
import { useEffect, useRef, useState } from 'react'

const STAGES = [
  {
    title: 'Enquiry',
    detail: 'Website, WhatsApp or a referral',
    icon: 'ti-inbox',
    tone: 'var(--ac-accent)',
  },
  {
    title: 'Qualified',
    detail: 'Routed to the right person',
    icon: 'ti-user-check',
    tone: 'var(--ac-accent)',
  },
  {
    title: 'Invoice',
    detail: 'Numbered and sent with a due date',
    icon: 'ti-receipt',
    tone: 'var(--ac-warn)',
  },
  {
    title: 'Paid',
    detail: 'M-Pesa matched to the invoice',
    icon: 'ti-cash',
    tone: 'var(--ac-ok)',
  },
  {
    title: 'Onboarding',
    detail: 'Kick-off checklist and handover',
    icon: 'ti-checks',
    tone: 'var(--ac-ok)',
  },
]

/**
 * A small, looping example of the operating loop. It pauses on hover or focus
 * and stays on the last stage for reduced-motion users.
 */
export default function FlowStory() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setInView(true)
        observer.disconnect()
      },
      { threshold: 0.2 }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(STAGES.length - 1)
      return
    }

    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % STAGES.length)
    }, 3000)

    return () => window.clearInterval(interval)
  }, [inView, paused])

  return (
    <section
      ref={ref}
      className='ac-flush bg-[var(--ac-surface)]'
      aria-label='Example operating flow'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}>
      <div className='ac-container py-8 lg:py-10'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <span className='ac-eyebrow'>The operating loop</span>
          <span className='ac-meta'>Example flow · no client data</span>
        </div>

        <ol className='mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4'>
          {STAGES.map((stage, index) => {
            const isActive = index === active
            return (
              <li
                key={stage.title}
                className={`border-t pt-4 transition-[border-color,transform] duration-500 ease-[var(--ac-ease)] ${
                  isActive ? '-translate-y-0.5' : ''
                }`}
                style={{ borderColor: isActive ? stage.tone : 'var(--ac-line)' }}>
                <div className='flex items-center justify-between gap-3'>
                  <span
                    className='ac-index transition-opacity duration-300'
                    style={{ color: stage.tone, opacity: isActive ? 1 : 0.55 }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    aria-hidden='true'
                    className='h-1.5 w-1.5 rounded-[1px] transition-opacity duration-300'
                    style={{ background: stage.tone, opacity: isActive ? 1 : 0.45 }}
                  />
                </div>

                <div className='mt-3 flex items-center gap-2'>
                  <i
                    className={`ti ${stage.icon} text-[15px] transition-colors`}
                    style={{ color: isActive ? stage.tone : 'var(--ac-ink-4)' }}
                    aria-hidden='true'
                  />
                  <h3
                    className={`text-[14px] font-medium transition-colors ${
                      isActive ? 'text-[var(--ac-ink)]' : 'text-[var(--ac-ink-2)]'
                    }`}>
                    {stage.title}
                  </h3>
                </div>
                <p className='ac-small mt-1.5'>{stage.detail}</p>
              </li>
            )
          })}
        </ol>

        <div aria-hidden='true' className='mt-6 hidden lg:flex'>
          {STAGES.slice(0, -1).map((stage, index) => (
            <span
              key={stage.title}
              className='h-px flex-1 transition-opacity duration-500 ease-[var(--ac-ease)]'
              style={{
                background:
                  index < 2
                    ? 'var(--ac-accent)'
                    : index === 2
                      ? 'var(--ac-warn)'
                      : 'var(--ac-ok)',
                opacity: active > index ? 1 : 0.22,
              }}
            />
          ))}
        </div>

        <p className='ac-small mt-4 max-w-xl'>
          One path from the first enquiry to a matched payment and a clean handover.
        </p>
      </div>
    </section>
  )
}
