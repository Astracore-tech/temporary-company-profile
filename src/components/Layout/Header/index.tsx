'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { headerData } from '../Header/Navigation/menuData'
import MobileHeaderLink from '../Header/Navigation/MobileHeaderLink'
import { Icon } from '@iconify/react/dist/iconify.js'
import Logo from './Logo'
import HeaderLink from '../Header/Navigation/HeaderLink'

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
      className={`fixed top-0 z-50 w-full border-b border-[var(--ac-line)] transition-[height,background-color] duration-300 ${
        sticky
          ? 'h-16 bg-[rgba(8,9,12,0.88)] backdrop-blur-xl'
          : 'h-20 bg-[var(--ac-bg)]'
      }`}>
      <div className='ac-container flex items-center justify-between h-full'>
        <Logo />

        <nav className='hidden lg:flex items-center'>
          {headerData.map((item) => (
            <HeaderLink key={item.href + item.label} item={item} />
          ))}
        </nav>

        <div className='flex items-center gap-3'>
          <Link
            href='/contact'
            className='hidden lg:inline-flex items-center gap-2 px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase font-bold bg-[var(--ac-accent)] text-[var(--ac-on-accent)] hover:bg-[#5cf0ff] transition-colors'>
            Get a Quote
          </Link>

          <button
            type='button'
            onClick={() => setNavbarOpen(!navbarOpen)}
            className='lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer'
            aria-expanded={navbarOpen}
            aria-label='Toggle navigation menu'>
            <span className='block w-6 h-px bg-[var(--ac-ink)]' />
            <span className='block w-6 h-px bg-[var(--ac-ink)]' />
            <span className='block w-4 h-px bg-[var(--ac-ink)]' />
          </button>
        </div>
      </div>

      {navbarOpen && (
        <div
          className='fixed inset-0 bg-black/70 z-40 lg:hidden'
          onClick={() => setNavbarOpen(false)}
          aria-hidden='true'
        />
      )}

      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-[290px] bg-[var(--ac-surface)] border-l border-[var(--ac-line)] transform transition-transform duration-300 z-50 ${
          navbarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className='flex items-center justify-between px-6 h-20 border-b border-[var(--ac-line)]'>
          <span className='ac-h4'>Menu</span>
          <button
            type='button'
            onClick={() => setNavbarOpen(false)}
            aria-label='Close menu'
            className='cursor-pointer'>
            <Icon
              icon='ic:round-close'
              className='text-[var(--ac-ink-3)] text-2xl hover:text-[var(--ac-ink)] transition-colors'
            />
          </button>
        </div>

        <nav className='flex flex-col p-6 gap-1'>
          {headerData.map((item) => (
            <MobileHeaderLink key={item.href + item.label} item={item} />
          ))}
          <Link
            href='/contact'
            onClick={() => setNavbarOpen(false)}
            className='ac-btn ac-btn-primary w-full mt-6'>
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
