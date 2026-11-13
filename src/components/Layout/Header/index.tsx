'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { headerData } from './Navigation/menuData'
import HeaderLink from './Navigation/HeaderLink'
import MobileHeaderLink from './Navigation/MobileHeaderLink'
import Logo from './Logo'
import { PRIMARY_CTA } from '@/content/site-copy'

const Header: React.FC = () => {
  const [open, setOpen] = useState(false)
  const path = usePathname()

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [path])

  return (
    <header className='sticky top-0 z-50 bg-[var(--ac-bg)]/95 backdrop-blur-sm border-b border-[var(--ac-line)]'>
      <div className='ac-container flex items-center justify-between h-16'>
        <Logo />

        <nav aria-label='Main' className='hidden md:flex items-center gap-1'>
          {headerData.map((item) => (
            <HeaderLink key={item.href} item={item} />
          ))}
        </nav>

        <div className='flex items-center gap-2'>
          <Link
            href={PRIMARY_CTA.href}
            className='hidden md:inline-flex ac-btn ac-btn-primary !min-h-0 !py-2.5 !px-4 !text-sm'>
            {PRIMARY_CTA.label}
          </Link>
          <button
            type='button'
            onClick={() => setOpen((o) => !o)}
            className='md:hidden inline-flex items-center gap-2 h-10 px-3 -mr-3 text-[15px] font-medium text-[var(--ac-ink)]'
            aria-expanded={open}
            aria-controls='mobile-menu'>
            {open ? 'Close' : 'Menu'}
            <svg width='16' height='16' viewBox='0 0 16 16' aria-hidden='true' className='shrink-0'>
              {open ? (
                <path d='M3.5 3.5l9 9m0-9l-9 9' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
              ) : (
                <path d='M2 5h12M2 11h12' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id='mobile-menu' className='md:hidden border-t border-[var(--ac-line)] bg-[var(--ac-bg)]'>
          <nav aria-label='Main' className='ac-container py-3 flex flex-col'>
            {headerData.map((item) => (
              <MobileHeaderLink key={item.href} item={item} />
            ))}
            <Link href={PRIMARY_CTA.href} className='ac-btn ac-btn-primary w-full mt-4 mb-2'>
              {PRIMARY_CTA.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
