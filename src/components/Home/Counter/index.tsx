'use client'
import React from 'react'
import SectionHeading from '@/components/SharedComponent/SectionHeading'

const stats = [
  {
    value: '250',
    suffix: '+',
    label: 'Projects Delivered',
    sub: 'Across Kenya & East Africa',
    icon: 'ti-briefcase',
  },
  {
    value: '50',
    suffix: '+',
    label: 'Enterprise Clients',
    sub: 'From startups to government agencies',
    icon: 'ti-building-skyscraper',
  },
  {
    value: '4.9',
    suffix: '★',
    label: 'Client Rating',
    sub: '500+ verified reviews on our platform',
    icon: 'ti-star-filled',
  },
  {
    value: '8',
    suffix: '+',
    label: 'Years Experience',
    sub: 'Building digital solutions for Africa',
    icon: 'ti-award',
  },
]

const Counter = ({ isColorMode = false }: { isColorMode?: boolean }) => {
  return (
    <section className='relative overflow-hidden border-b border-[var(--ac-line)]'>
      {/* Background photo, graded down to sit inside the dark theme */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=85')",
          filter: 'saturate(0.4) brightness(0.5)',
        }}
      />
      <div className='absolute inset-0' style={{ background: 'rgba(8,9,12,0.93)' }} />

      <div className='ac-container relative z-10'>
        <SectionHeading center eyebrow='Our Track Record' />

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--ac-line)] border border-[var(--ac-line)]'>
          {stats.map((item, index) => (
            <div
              key={item.label}
              className='group relative overflow-hidden bg-[rgba(14,16,20,0.78)] backdrop-blur-sm hover:bg-[var(--ac-surface-2)] transition-colors duration-300 px-8 py-10 flex flex-col'
              data-aos='fade-up'
              data-aos-delay={`${index * 90}`}
              data-aos-duration='700'>
              {/* Hover rule */}
              <span className='absolute top-0 left-0 right-0 h-px bg-[var(--ac-accent)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500' />

              <div
                className='w-11 h-11 flex items-center justify-center border shrink-0 mb-7'
                style={{
                  borderColor: 'var(--ac-accent-line)',
                  background: 'var(--ac-accent-dim)',
                }}>
                <i className={`ti ${item.icon} text-lg text-[var(--ac-accent)]`} />
              </div>

              <p
                className='text-[var(--ac-ink)] font-extrabold leading-none tracking-tight'
                style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(38px, 4vw, 52px)' }}>
                {item.value}
                <span className='text-[var(--ac-accent)]'>{item.suffix}</span>
              </p>

              <p className='ac-h4 mt-5 mb-1.5'>{item.label}</p>
              <p className='ac-small'>{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Counter
