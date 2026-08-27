import React, { FC } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import { BreadcrumbLink } from '@/types/breadcrumb'

interface HeroSubProps {
  title: string
  description: string
  breadcrumbLinks: BreadcrumbLink[]
}

const HeroSub: FC<HeroSubProps> = ({ title, description, breadcrumbLinks }) => {
  return (
    <section className='ac-flush text-center border-b border-[var(--ac-line)] pt-40 pb-20 relative overflow-hidden'>
      {/* Accent bloom, matching the home hero */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.05) 0%, transparent 60%)',
        }}
      />

      <div className='ac-container relative z-10'>
        <h1 className='ac-display'>{title}</h1>
        <p className='ac-body max-w-xl mx-auto mt-5 mb-8'>{description}</p>
        <div className='flex justify-center'>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </div>
    </section>
  )
}

export default HeroSub
