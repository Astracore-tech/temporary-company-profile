import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getImgPath } from '@/utils/image'
import SignOutButton from '@/components/Inbox/SignOutButton'
import { getStaff } from '@/server/auth'

export const metadata: Metadata = {
  title: 'Founder inbox',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

/** Private area chrome. Each page enforces sign-in itself, on the server. */
export default async function InboxLayout({ children }: { children: React.ReactNode }) {
  const staff = await getStaff().catch(() => null)
  return (
    <div className='min-h-screen bg-[var(--ac-bg)]'>
      <header className='border-b border-[var(--ac-line)]'>
        <div className='ac-container flex items-center justify-between gap-4 h-16'>
          <Link href='/inbox/' className='flex items-center gap-3 min-w-0 group'>
            {/* Brand mark only — the full wordmark crowds the bar on phones. */}
            <Image
              src={getImgPath('/images/logo/logo-icon.png')}
              alt='AstraCore'
              width={28}
              height={28}
              className='shrink-0'
            />
            <span className='ac-h4 group-hover:text-[var(--ac-accent)] transition-colors'>Inbox</span>
          </Link>
          {staff && (
            <div className='flex items-center gap-4 min-w-0'>
              <span className='ac-small hidden sm:inline truncate'>{staff.name}</span>
              <SignOutButton />
            </div>
          )}
        </div>
      </header>
      <main className='ac-container py-8 sm:py-10'>{children}</main>
    </div>
  )
}
