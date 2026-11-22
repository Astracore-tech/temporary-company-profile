import React from 'react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <section>
      <div className='ac-container'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-16'>
          <div className='md:col-span-4'>
            <p className='ac-meta'>What to do</p>
          </div>

          <div className='md:col-span-8'>
            <p className='ac-body max-w-md'>
              The link may be old, or the address may have a typo. The work and services pages are
              the best place to pick up from.
            </p>
            <div className='mt-8 flex flex-wrap items-center gap-3'>
              <Link href='/' className='ac-btn ac-btn-primary'>
                Back to home
              </Link>
              <Link href='/portfolio/' className='ac-btn ac-btn-ghost'>
                See the work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFound
