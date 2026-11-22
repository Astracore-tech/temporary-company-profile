'use client'
import { useEffect, useRef, useState } from 'react'

const CARD =
  'absolute flex h-[280px] w-[220px] flex-col overflow-hidden rounded-[8px] border border-black/5 bg-[#f2f5fa] p-4 text-[#0b0d11] shadow-[0_28px_70px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-[var(--ac-ease)] sm:h-[330px] sm:w-[280px] sm:p-5'

/**
 * Two paper work objects, not stock art: the invoice and the matched payment.
 * The paid card sits behind, right-aligned, so its green outcome stays visible.
 * Decorative, so the whole stack is one accessible image.
 */
export default function CtaCards() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(true)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = element.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.9) return

    setShown(false)
    let fallback = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShown(true)
        observer.disconnect()
        window.clearTimeout(fallback)
      },
      { threshold: 0.15 }
    )
    observer.observe(element)
    fallback = window.setTimeout(() => setShown(true), 1800)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  return (
    <div
      ref={ref}
      role='img'
      aria-label='Example work cards: an invoice and a matched M-Pesa payment'
      className={`relative mx-auto h-[360px] w-full max-w-[480px] transition-[opacity,transform] duration-700 ease-[var(--ac-ease)] sm:h-[400px] ${
        shown ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
      }`}>
      {/* Invoice — front */}
      <div
        aria-hidden='true'
        className={`${CARD} left-0 top-10 z-20 -rotate-5 hover:z-30 hover:-translate-y-2 hover:rotate-0`}>
        <div className='flex items-center justify-between gap-3'>
          <span className='inline-flex items-center gap-2 text-[11px] font-medium text-[#59616f]'>
            <span className='h-1.5 w-1.5 rounded-[1px] bg-[#b7791f]' />
            Invoice
          </span>
          <span className='text-[10px] text-[#8a92a1]'>Due</span>
        </div>

        <p
          className='mt-6 text-[21px] font-semibold leading-tight'
          style={{ fontFamily: 'var(--ac-display)' }}>
          AC-0142
        </p>
        <p
          className='mt-1 text-[26px] font-semibold leading-tight sm:text-[30px]'
          style={{ fontFamily: 'var(--ac-display)' }}>
          KES 48,500
        </p>
        <p className='mt-1 text-[11px] text-[#8a92a1]'>Due 30 Nov</p>

        <div className='mt-5 border-t border-[#0b0d11]/10 pt-3 text-[11px]'>
          <div className='flex items-center justify-between gap-2'>
            <span className='text-[#8a92a1]'>Issued</span>
            <span className='font-medium'>Today</span>
          </div>
          <div className='mt-1.5 flex items-center justify-between gap-2'>
            <span className='text-[#8a92a1]'>Payment</span>
            <span className='font-medium'>M-Pesa or bank</span>
          </div>
        </div>

        <div className='mt-auto border-t border-[#0b0d11]/10 pt-3'>
          <div className='flex items-center justify-between gap-2 text-[11px]'>
            <span className='text-[#8a92a1]'>M-Pesa</span>
            <span className='font-medium'>QK72…</span>
          </div>
          <div className='mt-1.5 flex items-center justify-between gap-2 text-[11px]'>
            <span className='text-[#8a92a1]'>Status</span>
            <span className='font-medium text-[#8a5a12]'>Awaiting match</span>
          </div>
        </div>
      </div>

      {/* Paid — back, right-aligned so it stays visible */}
      <div
        aria-hidden='true'
        className={`${CARD} left-[100px] top-0 z-10 rotate-6 hover:z-30 hover:-translate-y-2 hover:rotate-0 sm:left-[190px]`}>
        <div className='flex flex-col items-end text-right'>
          <div className='flex items-center justify-end gap-2 text-[11px] font-medium text-[#59616f]'>
            Paid
            <span className='h-1.5 w-1.5 rounded-[1px] bg-[#138a55]' />
          </div>

          <span className='mt-7 flex h-9 w-9 items-center justify-center rounded-[3px] bg-[#e4f5ec] text-[#138a55]'>
            <i className='ti ti-check text-[18px]' aria-hidden='true' />
          </span>
          <p
            className='mt-3 text-[16px] font-semibold leading-tight sm:text-[20px]'
            style={{ fontFamily: 'var(--ac-display)' }}>
            M-Pesa matched
          </p>
          <p className='mt-1 text-[11px] text-[#8a92a1]'>Invoice AC-0142</p>

          <div className='mt-auto w-full border-t border-[#0b0d11]/10 pt-3 text-right'>
            <p className='text-[10px] text-[#8a92a1]'>Onboarding</p>
            <p className='mt-0.5 text-[12px] font-medium text-[#138a55]'>Started</p>
            <p className='mt-2 text-[10px] text-[#8a92a1]'>Next</p>
            <p className='mt-0.5 text-[12px] font-medium'>Kick-off</p>
          </div>
        </div>
      </div>
    </div>
  )
}
