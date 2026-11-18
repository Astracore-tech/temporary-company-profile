import React, { FC } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import { BreadcrumbLink } from '@/types/breadcrumb'

interface HeroSubProps {
  /** Quiet label above the page title. */
  eyebrow?: string
  title: string
  description: string
  breadcrumbLinks: BreadcrumbLink[]
  /** Optional facts or counts that belong beside the title. */
  aside?: React.ReactNode
}

const HeroSub: FC<HeroSubProps> = ({ eyebrow, title, description, breadcrumbLinks, aside }) => {
  return (
    <section className='ac-flush border-b border-[var(--ac-line)] pt-32 pb-16 lg:pt-40 lg:pb-20'>
      <div className='ac-container'>
        <Breadcrumb links={breadcrumbLinks} />

        <div className='mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end'>
          <div className={aside ? 'lg:col-span-8' : 'lg:col-span-10'}>
            {eyebrow && <span className='ac-eyebrow'>{eyebrow}</span>}
            <h1 className={`ac-display ${eyebrow ? 'mt-4' : ''}`}>{title}</h1>
            <p className='ac-lead mt-5'>{description}</p>
          </div>
          {aside && <div className='lg:col-span-4 w-full'>{aside}</div>}
        </div>
      </div>
    </section>
  )
}

export default HeroSub
