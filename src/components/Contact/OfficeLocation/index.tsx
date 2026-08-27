import React from 'react'
import Link from 'next/link'

const OFFICES = [
  {
    name: 'Nairobi Head Office',
    address: ['AstraCore Suite, Kilimani,', 'Nairobi, Kenya'],
    email: 'info@astracoretech.org',
    phone: '0739 045 698',
  },
  {
    name: 'Mombasa Office',
    address: ['Nyali Hub, Nyali,', 'Mombasa, Kenya'],
    email: 'info@astracoretech.org',
    phone: '0739 045 698',
  },
]

const Location = () => {
  return (
    <section className='border-t border-b border-[var(--ac-line)]'>
      <div className='ac-container'>
        {OFFICES.map((office, i) => (
          <div
            key={office.name}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${
              i === 0 ? 'border-b border-[var(--ac-line)] pb-14' : 'pt-14'
            }`}
            data-aos='fade-up'
            data-aos-delay={`${i * 100}`}
            data-aos-duration='700'>
            <h2 className='ac-h2' style={{ fontSize: 'clamp(24px, 2.4vw, 32px)' }}>
              {office.name}
            </h2>

            <address className='ac-body not-italic'>
              {office.address.map((line) => (
                <React.Fragment key={line}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </address>

            <div className='flex flex-col gap-3'>
              <Link
                href={`mailto:${office.email}`}
                className='ac-h3 hover:text-[var(--ac-accent)] transition-colors w-fit'>
                {office.email}
              </Link>
              <Link
                href='tel:+254739045698'
                className='ac-body flex items-center gap-2.5 hover:text-[var(--ac-accent)] transition-colors w-fit'>
                <span className='text-[var(--ac-ink-4)] text-[10px] uppercase tracking-[0.2em]'>
                  Call
                </span>
                {office.phone}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Location
