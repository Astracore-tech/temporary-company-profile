import React, { FC } from 'react'
import Link from 'next/link'
import Logo from '../Header/Logo'
import { services } from '@/content/services'
import { PRIMARY_CTA } from '@/content/site-copy'
import { SITE } from '@/utils/site'

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/astra-coretech-87105b415' },
  { label: 'Instagram', href: 'https://www.instagram.com/astracoretech3' },
  { label: 'X', href: 'https://x.com/AstraCoreTec' },
]

const NAV = [
  { label: 'Our work', href: '/portfolio' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
]

const Heading = ({ children }: { children: React.ReactNode }) => <p className='ac-label mb-4'>{children}</p>

const Footer: FC = () => (
  <footer className='border-t border-[var(--ac-line)]'>
    <div className='ac-container py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,4fr)_repeat(3,minmax(0,2fr))] gap-10'>
      <div className='sm:col-span-2 lg:col-span-1'>
        <Logo />
        <p className='ac-small mt-4 max-w-xs'>
          Custom software for businesses in Kenya and abroad, built in {SITE.address.city}.
        </p>
        <Link href={PRIMARY_CTA.href} className='ac-btn ac-btn-primary mt-6'>
          {PRIMARY_CTA.label}
        </Link>
      </div>

      <div>
        <Heading>Contact</Heading>
        <ul className='space-y-2.5 ac-small'>
          <li>
            <a href={`mailto:${SITE.email}`} className='hover:text-[var(--ac-ink)] break-all'>
              {SITE.email}
            </a>
          </li>
          <li>
            <a href={`tel:${SITE.telephone}`} className='hover:text-[var(--ac-ink)]'>
              {SITE.telephoneDisplay}
            </a>
          </li>
          {SOCIALS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} target='_blank' rel='noopener noreferrer' className='hover:text-[var(--ac-ink)]'>
                {label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Heading>What we build</Heading>
        <ul className='space-y-2.5 ac-small'>
          {services.map(({ id, title }) => (
            <li key={id}>
              <Link href={`/services/#${id}`} className='hover:text-[var(--ac-ink)]'>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Heading>Company</Heading>
        <ul className='space-y-2.5 ac-small'>
          {NAV.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className='hover:text-[var(--ac-ink)]'>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className='border-t border-[var(--ac-line)]'>
      <div className='ac-container py-6 flex flex-col sm:flex-row sm:justify-between gap-2 text-[13px] text-[var(--ac-ink-4)]'>
        <p>
          © {new Date().getFullYear()} AstraCore Technologies. All rights reserved. Developed by
          Frankline Onyango.
        </p>
        <p>Powered by Margravon</p>
      </div>
    </div>
  </footer>
)

export default Footer
