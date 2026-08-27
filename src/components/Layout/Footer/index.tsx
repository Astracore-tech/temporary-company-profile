'use client'
import React, { FC } from 'react'
import Link from 'next/link'
import Logo from '../Header/Logo'
import { Icon } from '@iconify/react'

const SOCIALS = [
  { icon: 'ph:x-logo-bold', label: 'X (Twitter)', href: 'https://x.com/AstraCoreTec' },
  {
    icon: 'ph:instagram-logo-bold',
    label: 'Instagram',
    href: 'https://www.instagram.com/astracoretech3',
  },
  {
    icon: 'ph:linkedin-logo-bold',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/astra-coretech-87105b415',
  },
]

const NAV = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const Footer: FC = () => {
  return (
    <footer className='relative z-10 border-t border-[var(--ac-line)]'>
      <div className='ac-container'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--ac-line)] border-x border-b border-[var(--ac-line)] -mx-px'>

          {/* Brand + CTA */}
          <div className='bg-[var(--ac-bg)] px-8 py-12 flex flex-col justify-between gap-10'>
            <Logo />
            <div>
              <p className='ac-h2 mb-7' style={{ fontSize: 'clamp(26px, 2.6vw, 34px)' }}>
                Ready to get started?
              </p>
              <Link href='/#contact' className='ac-btn ac-btn-primary'>
                Get Started →
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className='bg-[var(--ac-bg)] px-8 py-12'>
            <p className='text-[var(--ac-ink-3)] text-[10px] font-semibold tracking-[0.26em] uppercase mb-8'>
              Support
            </p>

            <div className='space-y-7'>
              <div>
                <p className='text-[var(--ac-ink-4)] text-[10px] uppercase tracking-[0.2em] mb-2'>
                  Phone
                </p>
                <Link
                  href='tel:+254739045698'
                  className='ac-h3 hover:text-[var(--ac-accent)] transition-colors'>
                  0739 045 698
                </Link>
              </div>
              <div>
                <p className='text-[var(--ac-ink-4)] text-[10px] uppercase tracking-[0.2em] mb-2'>
                  Email
                </p>
                <Link
                  href='mailto:info@astracoretech.org'
                  className='ac-h3 hover:text-[var(--ac-accent)] transition-colors'>
                  info@astracoretech.org
                </Link>
              </div>
            </div>

            <ul className='flex items-center gap-2.5 mt-9'>
              {SOCIALS.map(({ icon, label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={label}
                    className='flex items-center justify-center w-9 h-9 border border-[var(--ac-line)] text-[var(--ac-ink-3)] hover:text-[var(--ac-accent)] hover:border-[var(--ac-accent-line)] transition-colors'>
                    <Icon icon={icon} width='16' height='16' />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className='bg-[var(--ac-bg)] px-8 py-12'>
            <p className='text-[var(--ac-ink-3)] text-[10px] font-semibold tracking-[0.26em] uppercase mb-8'>
              Newsletter
            </p>
            <p className='ac-h3 mb-3'>Subscribe newsletter</p>
            <p className='ac-small mb-7'>
              Stay updated with the latest in software development, AI, and systems engineering.
            </p>
            <form className='flex w-full' onSubmit={(e) => e.preventDefault()}>
              <label htmlFor='footer-email' className='sr-only'>
                Email address
              </label>
              <input
                id='footer-email'
                name='email'
                type='email'
                placeholder='Email address'
                className='flex-1 min-w-0 px-4 py-3 text-xs outline-0 border border-[var(--ac-line)] bg-[var(--ac-surface)] text-[var(--ac-ink)] placeholder:text-[var(--ac-ink-4)] focus:border-[var(--ac-accent)] transition-colors'
              />
              <button
                type='submit'
                className='px-5 text-xs font-bold bg-[var(--ac-accent)] text-[var(--ac-on-accent)] hover:bg-[#5cf0ff] transition-colors cursor-pointer'>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Legal bar */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-5 py-8'>
          <ul className='flex flex-wrap justify-center items-center gap-x-7 gap-y-2'>
            {NAV.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className='ac-small hover:text-[var(--ac-accent)] transition-colors'>
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

        {/* Attribution — deliberately quiet, but held at the faintest tone that
            still clears WCAG AA so it stays legible. */}
        <div className='border-t border-[var(--ac-line)] py-5 text-center'>
          <p className='text-[var(--ac-ink-4)] text-[10px] italic lowercase tracking-[0.02em]'>
            Powered by Margravon
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
