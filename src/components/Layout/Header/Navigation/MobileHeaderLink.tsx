'use client'
import Link from 'next/link'
import { HeaderItem } from '../../../../types/menu'
import { useIsActive } from './HeaderLink'

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const active = useIsActive(item.href)
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={`flex items-center justify-between py-3.5 border-b border-[var(--ac-line)] text-[17px] ${
        active ? 'text-[var(--ac-accent)] font-semibold' : 'text-[var(--ac-ink)]'
      }`}>
      {item.label}
      <span aria-hidden='true' className='text-[var(--ac-ink-4)]'>
        →
      </span>
    </Link>
  )
}

export default MobileHeaderLink
