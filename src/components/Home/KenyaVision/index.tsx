'use client'
import React from 'react'
import Link from 'next/link'
import SectionHeading from '@/components/SharedComponent/SectionHeading'

const visions = [
  {
    icon: 'ti-building-bank',
    title: 'Smart Government Systems',
    description:
      'Digitising public services — from county revenue collection to citizen portals and e-government platforms that serve millions of Kenyans efficiently.',
    tag: 'GovTech',
    image: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: 'ti-heart-handshake',
    title: 'AgriTech for Farmers',
    description:
      "Precision agriculture platforms connecting Kenya's 4.9M smallholder farmers to markets, weather data, credit and crop insurance via mobile.",
    tag: 'AgriTech',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: 'ti-school',
    title: 'Digital Education Access',
    description:
      'AI-powered e-learning platforms delivering quality education to underserved schools across Kenya — bridging the digital divide one classroom at a time.',
    tag: 'EduTech',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: 'ti-building-hospital',
    title: 'HealthTech Infrastructure',
    description:
      'Telemedicine, digital health records, and hospital management systems bringing specialist care to Kenyans in remote counties.',
    tag: 'HealthTech',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: 'ti-currency-dollar',
    title: 'Inclusive Fintech',
    description:
      'Building M-Pesa-native financial systems, SACCO management tools, and lending platforms that bank the unbanked across East Africa.',
    tag: 'FinTech',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: 'ti-robot',
    title: 'AI for African Contexts',
    description:
      'Training machine learning models on Swahili, Kikuyu, and other local languages. AI products designed for African realities, not just Western use cases.',
    tag: 'AI/ML',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=600&q=80',
  },
]

const KenyaVision = () => {
  return (
    <section id='kenya-vision' className='border-t border-[var(--ac-line)]'>
      <div className='ac-container'>
        <SectionHeading
          eyebrow='Vision 2030 · Silicon Savannah'
          title={
            <>
              Building Kenya&apos;s <span className='ac-muted-line'>Digital</span>
              <br />
              Future.
            </>
          }
          description={`We are committed to building Kenya’s digital future — powering the next generation of enterprise, governance, healthcare, and agriculture.`}
        />

        {/* Sector grid — one accent, equal card heights */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--ac-line)] border border-[var(--ac-line)]'>
          {visions.map((v, i) => (
            <div
              key={v.title}
              className='group relative overflow-hidden bg-[var(--ac-surface)] hover:bg-[var(--ac-surface-2)] transition-colors duration-300'
              data-aos='fade-up'
              data-aos-delay={`${(i % 3) * 90}`}
              data-aos-duration='700'>
              {/* Faint sector image, kept well below the text */}
              <img
                src={v.image}
                alt=''
                aria-hidden='true'
                className='absolute inset-0 w-full h-full object-cover opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500'
                style={{ filter: 'saturate(0.3)' }}
                loading='lazy'
              />

              <div className='relative z-10 p-8 flex flex-col h-full min-h-[340px]'>
                <div className='flex items-start justify-between mb-7'>
                  <div
                    className='w-11 h-11 flex items-center justify-center border'
                    style={{
                      borderColor: 'var(--ac-accent-line)',
                      background: 'var(--ac-accent-dim)',
                    }}>
                    <i className={`ti ${v.icon} text-xl text-[var(--ac-accent)]`} />
                  </div>
                  <span className='ac-tag'>{v.tag}</span>
                </div>

                <div className='flex-1'>
                  <h3 className='ac-h3 mb-3'>{v.title}</h3>
                  <p className='ac-small leading-relaxed'>{v.description}</p>
                </div>
              </div>

              <span className='absolute bottom-0 left-0 right-0 h-px bg-[var(--ac-accent)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-20' />
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className='border border-t-0 border-[var(--ac-line)] bg-[var(--ac-surface)] px-8 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
          <div>
            <p className='ac-h3'>Let&apos;s build something bold for Kenya.</p>
            <p className='ac-small mt-2'>
              Join 50+ enterprises and government bodies already trusting AstraCore.
            </p>
          </div>
          <Link href='#contact' className='ac-btn ac-btn-primary shrink-0'>
            <i className='ti ti-rocket text-sm' />
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  )
}

export default KenyaVision
