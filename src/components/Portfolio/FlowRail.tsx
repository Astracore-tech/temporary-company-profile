'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * The project flow. On wide screens a hairline draws across the steps as the
 * section enters view; the steps follow with a short stagger.
 */
export default function FlowRail({
  steps,
  tone = 'var(--ac-accent)',
}: {
  steps: { step: string; detail: string }[]
  tone?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShown(true)
        observer.disconnect()
      },
      { threshold: 0.15 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className='relative mt-10'>
      <div
        aria-hidden='true'
        className='absolute left-0 right-0 top-0 hidden h-px bg-[var(--ac-line)] lg:block'
      />
      <div
        aria-hidden='true'
        className='absolute left-0 top-0 hidden h-px origin-left transition-transform duration-700 ease-[var(--ac-ease)] lg:block'
        style={{ background: tone, transform: shown ? 'scaleX(1)' : 'scaleX(0)' }}
      />

      <ol className='grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5'>
        {steps.map((step, index) => (
          <li
            key={step.step}
            className='border-t border-[var(--ac-line)] pt-4 transition-transform duration-500 ease-[var(--ac-ease)] lg:border-t-0'
            style={{
              transitionDelay: `${index * 80}ms`,
              transform: shown ? 'none' : 'translateY(6px)',
            }}>
            <span className='ac-index' style={{ color: tone }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className='ac-h4 mt-3'>{step.step}</h3>
            <p className='ac-small mt-2'>{step.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
