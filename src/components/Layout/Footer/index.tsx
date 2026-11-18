'use client'
import React, { FC } from 'react'
import Link from 'next/link'
import Logo from '../Header/Logo'
import { services } from '@/content/services'
import { PRIMARY_CTA } from '@/content/site-copy'
import { SITE } from '@/utils/site'

const SOCIALS = [
  { icon: 'ti-brand-x', label: 'X (Twitter)', href: 'https://x.com/AstraCoreTec' },
  {
    icon: 'ti-brand-instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/astracoretech3',
  },
  {
    icon: 'ti-brand-linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/astra-coretech-87105b415',
  },
]

const NAV = [
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Our Work', href: '/portfolio' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
]

const Footer: FC = () => {
  return (
    <footer className='relative z-10 border-t border-[var(--ac-line)]'>
      <div className='ac-container'>
        <div className='grid grid-cols-1 md:grid-cols-3'>
          {/* Brand + CTA */}
          <div className='flex flex-col justify-between gap-10 py-12 md:pr-8'>
            <Logo />
            <div>
              <p className='ac-h2 mb-6' style={{ fontSize: 'clamp(24px, 2.4vw, 32px)' }}>
                Tell us what is getting in the way
              </p>
              <Link href={PRIMARY_CTA.href} className='ac-btn ac-btn-primary'>
                {PRIMARY_CTA.label}
              </Link>
              <p className='ac-small mt-5'>
                Product: <Link href='/amplifyr/' className='ac-link'>Amplifyr</Link>
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className='border-t border-[var(--ac-line)] py-12 md:border-l md:border-t-0 md:px-8'>
            <p className='ac-label mb-6'>Contact</p>

            <div className='space-y-5'>
              <div>
                <p className='ac-meta mb-1'>Phone</p>
                <Link
                  href={`tel:${SITE.telephone}`}
                  className='ac-h4 transition-colors hover:text-[var(--ac-accent)]'>
                  {SITE.telephoneDisplay}
                </Link>
              </div>
              <div>
                <p className='ac-meta mb-1'>Email</p>
                <Link
                  href={`mailto:${SITE.email}`}
                  className='ac-h4 break-all transition-colors hover:text-[var(--ac-accent)]'>
                  {SITE.email}
                </Link>
              </div>
              <div>
                <p className='ac-meta mb-1'>Based in</p>
                <p className='ac-body'>Nairobi, Kenya</p>
              </div>
            </div>

            <ul className='mt-7 flex items-center gap-2'>
              {SOCIALS.map(({ icon, label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={label}
                    className='flex h-9 w-9 items-center justify-center rounded-[2px] border border-[var(--ac-line)] text-[var(--ac-ink-3)] transition-colors hover:border-[var(--ac-line-strong)] hover:text-[var(--ac-ink)]'>
                    <i className={`ti ${icon} text-[16px]`} aria-hidden='true' />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className='border-t border-[var(--ac-line)] py-12 md:border-l md:border-t-0 md:pl-8'>
            <p className='ac-label mb-6'>What we build</p>
            <ul className='space-y-3'>
              {services.map(({ slug, title }) => (
                <li key={slug}>
                  <Link
                    href={`/services/${slug}/`}
                    className='ac-body transition-colors hover:text-[var(--ac-ink)]'>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className='ac-small mt-6 max-w-xs'>
              Working with businesses in Kenya and across Africa.
            </p>
          </div>
        </div>

        {/* Legal bar */}
        <div className='flex flex-col items-center justify-between gap-4 border-t border-[var(--ac-line)] py-6 md:flex-row'>
          <ul className='flex flex-wrap items-center justify-center gap-x-6 gap-y-2'>
            {NAV.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className='ac-small transition-colors hover:text-[var(--ac-ink)]'>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <p className='ac-small text-center md:text-right'>
            © {new Date().getFullYear()} AstraCore Technologies. All rights reserved. Developed by
            Frankline Onyango.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
