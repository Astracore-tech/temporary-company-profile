'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * A short fade and rise for blocks below the fold. It starts visible, so the
 * page still reads without JavaScript; only blocks that are off-screen on mount
 * are hidden and then revealed.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(true)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = element.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.9) return

    setShown(false)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShown(true)
        observer.disconnect()
      },
      { threshold: 0.12 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${className} transition-transform duration-500 ease-[var(--ac-ease)] ${
        shown ? 'translate-y-0' : 'translate-y-1'
      }`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}
