'use client'
import React from 'react'
import Image from 'next/image'
import { teamMembers } from '@/app/api/data'
import { Icon } from '@iconify/react'
import SectionHeading from '@/components/SharedComponent/SectionHeading'

const SOCIALS = [
  { icon: 'ph:x-logo-bold', label: 'X (Twitter)', href: 'https://x.com/AstraCoreTec' },
  {
    icon: 'ph:linkedin-logo-bold',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/astra-coretech-87105b415',
  },
  {
    icon: 'ph:instagram-logo-bold',
    label: 'Instagram',
    href: 'https://www.instagram.com/astracoretech3',
  },
]

const Team = () => {
  return (
    <section className='border-b border-[var(--ac-line)]' id='team'>
      <div className='ac-container'>
        <SectionHeading
          eyebrow='Our Leadership'
          title={
            <>
              Meet the Minds
              <br />
              <span className='ac-muted-line'>Behind AstraCore</span>
            </>
          }
          description={
            <>
              A team of passionate <strong className='text-[var(--ac-ink)] font-semibold'>Kenyan engineers</strong>,
              designers, and <strong className='text-[var(--ac-ink)] font-semibold'>systems architects</strong>{' '}
              dedicated to building{' '}
              <strong className='text-[var(--ac-ink)] font-semibold'>world-class technology solutions</strong> for
              East African enterprises.
            </>
          }
        />

        {/* Column count follows the number of people, so the row never leaves a hole */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--ac-line)] border border-[var(--ac-line)]'>
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              data-aos='fade-up'
              data-aos-delay={`${index * 90}`}
              data-aos-duration='700'
              className='group relative aspect-[4/5] overflow-hidden bg-[var(--ac-surface)]'>
              <div className='ac-media absolute inset-0'>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className='absolute inset-0 flex flex-col justify-end p-7 z-20'>
                <p className='text-[var(--ac-accent)] text-[10px] font-semibold uppercase tracking-[0.24em] mb-2'>
                  {member.role}
                </p>
                <h3 className='ac-h3 mb-4'>{member.name}</h3>

                <div className='flex gap-2.5 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-500 overflow-hidden ease-out'>
                  {SOCIALS.map(({ icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`${member.name} — ${label}`}
                      className='flex items-center justify-center w-8 h-8 border border-[var(--ac-line-strong)] text-[var(--ac-ink-3)] hover:text-[var(--ac-accent)] hover:border-[var(--ac-accent-line)] transition-colors'>
                      <Icon icon={icon} width='15' height='15' />
                    </a>
                  ))}
                </div>
              </div>

              {/* Accent rule sweeps in on hover */}
              <span className='absolute bottom-0 left-0 right-0 h-px bg-[var(--ac-accent)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-30' />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
