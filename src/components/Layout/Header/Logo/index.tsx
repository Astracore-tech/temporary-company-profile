import Link from 'next/link'

/**
 * Text wordmark. A placeholder until official logo artwork is approved: the
 * repo only has an unverified icon (public/images/logo/logo-icon.png) and the
 * template's own logo files, so neither is used here. Swap this for the
 * approved artwork once it exists.
 */
const Logo: React.FC<{ href?: string; suffix?: string }> = ({ href = '/', suffix }) => (
  <Link
    href={href}
    aria-label='AstraCore Technologies — home'
    className='inline-flex items-baseline gap-1.5 text-[17px] leading-none tracking-[-0.01em] whitespace-nowrap'>
    <span className='font-semibold text-[var(--ac-ink)]'>AstraCore</span>
    <span className='text-[var(--ac-ink-4)]'>{suffix ?? 'Technologies'}</span>
  </Link>
)

export default Logo
