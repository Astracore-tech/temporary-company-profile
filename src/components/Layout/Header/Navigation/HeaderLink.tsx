'use client'
import { useState } from 'react'
import Link from 'next/link'
import { HeaderItem } from '../../../../types/menu'
import { usePathname } from 'next/navigation'

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const path = usePathname()

  const isActive =
    path === item.href ||
    (path.startsWith('/blog') && item.href === '/blog') ||
    (path.startsWith('/portfolio') && item.href === '/portfolio')

  return (
    <div
      className='relative px-4'
      onMouseEnter={() => item.submenu && setSubmenuOpen(true)}
      onMouseLeave={() => setSubmenuOpen(false)}>
      <Link
        href={item.href}
        aria-current={isActive ? 'page' : undefined}
        className={`text-[11px] flex items-center gap-1 py-4 font-semibold tracking-[0.22em] uppercase transition-colors duration-300 ${
          isActive
            ? 'text-[var(--ac-accent)]'
            : 'text-[var(--ac-ink-3)] hover:text-[var(--ac-ink)]'
        }`}>
        {item.label}
        {item.submenu && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1.1em'
            height='1.1em'
            viewBox='0 0 24 24'
            aria-hidden='true'
            className='opacity-60'>
            <path
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='m7 10l5 5l5-5'
            />
          </svg>
        )}
      </Link>

      {submenuOpen && item.submenu && (
        <div className='absolute left-4 top-12 w-56 bg-[var(--ac-surface-2)] border border-[var(--ac-line)] p-1 z-50'>
          {item.submenu.map((subItem) => {
            const isSubActive = path === subItem.href
            return (
              <Link
                key={subItem.href}
                href={subItem.href}
                className={`block px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  isSubActive
                    ? 'bg-[var(--ac-accent)] text-[var(--ac-on-accent)]'
                    : 'text-[var(--ac-ink-3)] hover:bg-[var(--ac-surface-3)] hover:text-[var(--ac-ink)]'
                }`}>
                {subItem.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default HeaderLink
