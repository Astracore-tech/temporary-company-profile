'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { headerData } from '../Header/Navigation/menuData'
import MobileHeaderLink from '../Header/Navigation/MobileHeaderLink'
import Logo from './Logo'
import HeaderLink from '../Header/Navigation/HeaderLink'
import { HEADER_CTA } from '@/content/site-copy'

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY >= 80)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = navbarOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [navbarOpen])

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-[var(--ac-line)] transition-colors duration-200 ${
        sticky ? 'h-16 bg-[rgba(10,11,14,0.9)] backdrop-blur-xl' : 'h-20 bg-[var(--ac-bg)]'
      }`}>
      <div className='ac-container flex h-full items-center justify-between'>
        <Logo />

        <nav className='hidden items-center lg:flex'>
          {headerData.map((item) => (
            <HeaderLink key={item.href + item.label} item={item} />
          ))}
        </nav>

        <div className='flex items-center gap-3'>
          <Link
            href={HEADER_CTA.href}
            className='ac-btn ac-btn-primary hidden min-h-[36px] px-4 py-2 lg:inline-flex'>
            {HEADER_CTA.label}
          </Link>

          <button
            type='button'
            onClick={() => setNavbarOpen(!navbarOpen)}
            className='flex cursor-pointer flex-col gap-1.5 p-2 lg:hidden'
            aria-expanded={navbarOpen}
            aria-label='Toggle navigation menu'>
            <span className='block h-px w-6 bg-[var(--ac-ink)]' />
            <span className='block h-px w-6 bg-[var(--ac-ink)]' />
            <span className='block h-px w-4 bg-[var(--ac-ink)]' />
          </button>
        </div>
      </div>

      {navbarOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/70 lg:hidden'
          onClick={() => setNavbarOpen(false)}
          aria-hidden='true'
        />
      )}

      <div
        inert={!navbarOpen}
        className={`fixed right-0 top-0 z-50 h-full w-[300px] transform border-l border-[var(--ac-line)] bg-[var(--ac-surface)] transition-transform duration-300 lg:hidden ${
          navbarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className='flex h-20 items-center justify-between border-b border-[var(--ac-line)] px-6'>
          <span className='ac-h4'>Menu</span>
          <button
            type='button'
            onClick={() => setNavbarOpen(false)}
            aria-label='Close menu'
            className='cursor-pointer'>
            <i
              className='ti ti-x text-[20px] text-[var(--ac-ink-3)] transition-colors hover:text-[var(--ac-ink)]'
              aria-hidden='true'
            />
          </button>
        </div>

        <nav className='flex flex-col p-6'>
          {headerData.map((item) => (
            <MobileHeaderLink key={item.href + item.label} item={item} />
          ))}
          <Link
            href={HEADER_CTA.href}
            onClick={() => setNavbarOpen(false)}
            className='ac-btn ac-btn-primary mt-6 w-full'>
            {HEADER_CTA.label}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
