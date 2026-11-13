import React from 'react'
import Link from 'next/link'
import { WORK_CTA } from '@/content/site-copy'

const NotFound = () => (
  <section className='!pt-16 sm:!pt-24'>
    <div className='ac-container'>
      <p className='ac-eyebrow mb-3'>Page not found</p>
      <h1 className='ac-display max-w-[18ch]'>This page doesn’t exist, or has moved.</h1>
      <p className='ac-lead mt-5'>Try the home page, or go straight to the work.</p>
      <div className='mt-9 flex flex-col sm:flex-row gap-3'>
        <Link href='/' className='ac-btn ac-btn-primary'>
          Go to the home page
        </Link>
        <Link href={WORK_CTA.href} className='ac-btn ac-btn-ghost'>
          {WORK_CTA.label}
        </Link>
      </div>
    </div>
  </section>
)

export default NotFound
