'use client'
import { useState } from 'react'
import Link from 'next/link'
import { HeaderItem } from '../../../../types/menu'
import { usePathname } from 'next/navigation'

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const path = usePathname()

  // trailingSlash is on, so the path may be "/services/" — compare without it.
  const current = path.replace(/\/$/, '') || '/'
  const isActive =
    current === item.href || (item.href !== '/' && current.startsWith(`${item.href}/`))

  return (
    <div
      className='relative px-2.5'
      onMouseEnter={() => item.submenu && setSubmenuOpen(true)}
      onMouseLeave={() => setSubmenuOpen(false)}>
      <Link
        href={item.href}
        aria-current={isActive ? 'page' : undefined}
        className='flex items-center gap-2 py-4 text-[13px] font-medium text-[var(--ac-ink-3)] transition-colors duration-150 hover:text-[var(--ac-ink)]'>
        <span
          aria-hidden='true'
          className={`h-1 w-1 rounded-[1px] transition-colors ${
            isActive ? 'bg-[var(--ac-accent)]' : 'bg-transparent'
          }`}
        />
        {item.label}
        {item.submenu && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1em'
            height='1em'
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
        <div className='absolute left-2.5 top-12 z-50 w-56 border border-[var(--ac-line)] bg-[var(--ac-surface-2)] p-1'>
          {item.submenu.map((subItem) => {
            const isSubActive = path === subItem.href
            return (
              <Link
                key={subItem.href}
                href={subItem.href}
                className={`block px-3 py-2 text-[13px] transition-colors ${
                  isSubActive
                    ? 'bg-[var(--ac-surface-3)] text-[var(--ac-ink)]'
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
