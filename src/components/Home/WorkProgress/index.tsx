'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Progress as ProgressData } from '@/app/api/data'

interface ProgressItem {
  title: string
  Progress: number
}


const CAPABILITIES = [
  'M-Pesa Native Integration',
  'Cloud-First Architecture',
  'Offline-Capable Apps',
  'Kenya Data Residency',
]

const Progresswork = ({ isColorMode = false }: { isColorMode?: boolean }) => {
  const [progressValues, setProgressValues] = useState<ProgressItem[]>([])

  useEffect(() => {
    setProgressValues(ProgressData)
  }, [])

  return (
    <section
      className='ac-flush border-b border-[var(--ac-line)] overflow-hidden scroll-mt-24'
      id='about'>
      <div className='grid grid-cols-1 lg:grid-cols-2'>

        {/* ── Left — photo ─────────────────────────────────────────────── */}
        <div className='ac-media relative min-h-[420px] lg:min-h-[640px]'>
          <img
            src='https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=85'
            alt='AstraCore team at work'
          />
          {/* Feathers the photo into the content panel on wide screens */}
          <div
            className='absolute inset-0 z-10 hidden lg:block'
            style={{
              background:
                'linear-gradient(to right, rgba(8,9,12,0) 55%, rgba(8,9,12,0.96) 100%)',
            }}
          />

        </div>

        {/* ── Right — copy ─────────────────────────────────────────────── */}
        <div
          className='flex flex-col justify-center px-[var(--ac-gutter)] py-[var(--ac-section-y)] lg:pr-[max(var(--ac-gutter),6vw)]'
          data-aos='fade-up'
          data-aos-duration='800'>
          <span className='ac-eyebrow'>About Us</span>

          <h2 className='ac-h2 mt-6 mb-6'>
            Premier Tech <span className='ac-muted-line'>Innovations</span>
            <br />
            For Africa.
          </h2>

          <p className='ac-body mb-10 max-w-md'>
            We engineer <strong className='text-[var(--ac-ink)] font-semibold'>systems that solve real problems</strong>{' '}
            across East Africa. From{' '}
            <strong className='text-[var(--ac-ink)] font-semibold'>secure e-commerce</strong> and{' '}
            <strong className='text-[var(--ac-ink)] font-semibold'>POS software</strong> to{' '}
            <strong className='text-[var(--ac-ink)] font-semibold'>cross-platform mobile apps</strong>, we
            design for <strong className='text-[var(--ac-accent)] font-semibold'>speed, security, and scale</strong>.
          </p>

          {/* Capability meters */}
          <div className='space-y-5 mb-10 max-w-md'>
            {progressValues.map((item) => (
              <div key={item.title}>
                <div className='flex justify-between items-baseline mb-2.5'>
                  <span className='text-[var(--ac-ink-2)] text-[13px] font-medium'>{item.title}</span>
                  <span
                    className='text-[var(--ac-accent)] text-[13px] font-bold'
                    style={{ fontFamily: 'Syne, sans-serif' }}>
                    {item.Progress}%
                  </span>
                </div>
                <div className='h-px w-full bg-[var(--ac-line-strong)] relative overflow-hidden'>
                  <span
                    className='absolute left-0 inset-y-0 bg-[var(--ac-accent)] transition-[width] duration-1000 ease-out'
                    style={{ width: `${item.Progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <ul className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 mb-10 max-w-md'>
            {CAPABILITIES.map((feat) => (
              <li key={feat} className='flex items-center gap-2.5'>
                <i className='ti ti-circle-check text-[var(--ac-accent)] text-sm shrink-0' />
                <span className='ac-small'>{feat}</span>
              </li>
            ))}
          </ul>

          <div className='flex items-center flex-wrap gap-3'>
            <Link href='/contact' className='ac-btn ac-btn-primary'>
              <i className='ti ti-send text-sm' />
              Start a Project
            </Link>
            <Link href='/about' className='ac-btn ac-btn-ghost'>
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Progresswork
