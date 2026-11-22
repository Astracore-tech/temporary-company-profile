import { useState } from 'react'
import Link from 'next/link'
import { HeaderItem } from '../../../../types/menu'
import { usePathname } from 'next/navigation'

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)

  const handleToggle = (e: React.MouseEvent) => {
    if (item.submenu) {
      e.preventDefault()
      setSubmenuOpen(!submenuOpen)
    }
  }

  const path = usePathname()
  // trailingSlash is on, so the path may be "/services/" — compare without it.
  const current = path.replace(/\/$/, '') || '/'
  const isActive =
    current === item.href || (item.href !== '/' && current.startsWith(`${item.href}/`))

  return (
    <div className='relative block w-full border-b border-[var(--ac-line)]'>
      <Link
        href={item.href}
        onClick={handleToggle}
        className={`flex w-full items-center justify-between px-4 py-4 text-[14px] font-medium transition-colors ${
          isActive ? 'text-[var(--ac-ink)]' : 'text-[var(--ac-ink-3)] hover:text-[var(--ac-ink)]'
        }`}>
        <span className='flex items-center gap-2.5'>
          <span
            aria-hidden='true'
            className={`h-1 w-1 rounded-[1px] ${
              isActive ? 'bg-[var(--ac-accent)]' : 'bg-transparent'
            }`}
          />
          {item.label}
        </span>
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
        <div className='w-full bg-[var(--ac-surface-2)] px-2 py-1'>
          {item.submenu.map((subItem) => {
            const isSubActive = path === subItem.href
            return (
              <Link
                key={subItem.href}
                href={subItem.href}
                className={`block px-4 py-2.5 text-[13px] ${
                  isSubActive
                    ? 'text-[var(--ac-ink)]'
                    : 'text-[var(--ac-ink-3)] hover:text-[var(--ac-ink)]'
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

export default MobileHeaderLink
