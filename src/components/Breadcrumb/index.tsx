import React, { FC } from 'react'
import Link from 'next/link'

interface BreadcrumbProps {
  links: { href: string; text: string }[]
}

const Breadcrumb: FC<BreadcrumbProps> = ({ links }) => {
  const lastIndex = links.length - 1

  return (
    <nav aria-label='Breadcrumb'>
      <ol className='flex items-center flex-wrap justify-center gap-2.5 text-[13px]'>
        {links.map((link, index) => (
          <li key={link.href + link.text} className='flex items-center gap-2.5'>
            {index !== lastIndex ? (
              <>
                <Link
                  href={link.href}
                  className='text-[var(--ac-ink-3)] hover:text-[var(--ac-accent)] transition-colors'>
                  {link.text}
                </Link>
                <span aria-hidden='true' className='text-[var(--ac-ink-4)]'>
                  /
                </span>
              </>
            ) : (
              <span aria-current='page' className='text-[var(--ac-ink)]'>
                {link.text}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
