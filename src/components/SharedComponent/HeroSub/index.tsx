import React, { FC } from 'react'
import Link from 'next/link'
import { BreadcrumbLink } from '@/types/breadcrumb'

interface HeroSubProps {
  title: string
  description: string
  breadcrumbLinks: BreadcrumbLink[]
}

/** Inner-page header: breadcrumb, title, one line. */
const HeroSub: FC<HeroSubProps> = ({ title, description, breadcrumbLinks }) => (
  <section className='!pt-8 sm:!pt-14 !pb-10 sm:!pb-14 border-b border-[var(--ac-line)]'>
    <div className='ac-container'>
      <nav aria-label='Breadcrumb' className='ac-small mb-6'>
        {breadcrumbLinks.map((l, i) => {
          const last = i === breadcrumbLinks.length - 1
          return (
            <React.Fragment key={l.href}>
              {i > 0 && (
                <span aria-hidden='true' className='mx-2'>
                  /
                </span>
              )}
              {last ? (
                <span aria-current='page' className='text-[var(--ac-ink)]'>
                  {l.text}
                </span>
              ) : (
                <Link href={l.href} className='hover:text-[var(--ac-ink)]'>
                  {l.text}
                </Link>
              )}
            </React.Fragment>
          )
        })}
      </nav>
      <h1 className='ac-display max-w-[20ch]'>{title}</h1>
      <p className='ac-lead mt-5'>{description}</p>
    </div>
  </section>
)

export default HeroSub
