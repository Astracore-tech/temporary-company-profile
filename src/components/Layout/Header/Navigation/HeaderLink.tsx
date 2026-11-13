'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HeaderItem } from '../../../../types/menu'

/** True when `href` is the current page or one of its children. */
export const useIsActive = (href: string) => {
  // trailingSlash is on, so the path may be "/services/" — compare without it.
  const current = usePathname().replace(/\/$/, '') || '/'
  return current === href || (href !== '/' && current.startsWith(`${href}/`))
}

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const active = useIsActive(item.href)
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={`px-3 py-2 text-[15px] rounded-md transition-colors ${
        active
          ? 'text-[var(--ac-ink)] font-semibold'
          : 'text-[var(--ac-ink-3)] hover:text-[var(--ac-ink)]'
      }`}>
      {item.label}
    </Link>
  )
}

export default HeaderLink
