'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * A number that counts up once, when it enters the viewport. Renders the final
 * value on the server and for reduced-motion users.
 */
export default function CountUp({
  value,
  className = '',
  pad = 2,
}: {
  value: number
  className?: string
  pad?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(value)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const duration = 700
        const start = performance.now()
        setShown(0)

        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - progress, 3)
          setShown(Math.round(value * eased))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }

        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <span ref={ref} className={className}>
      <span aria-hidden='true'>{String(shown).padStart(pad, '0')}</span>
      <span className='sr-only'>{String(value)}</span>
    </span>
  )
}
