import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getImgPath } from '@/utils/image'

const NotFound = () => {
  return (
    <section>
      <div className='ac-container'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20 items-center'>
          <div className='relative mx-auto w-full max-w-[360px] opacity-70'>
            <Image
              src={getImgPath('/images/svgs/404.svg')}
              alt=''
              aria-hidden='true'
              width={360}
              height={385}
              quality={100}
              priority
              style={{ width: '100%', height: 'auto' }}
              className='mx-auto'
            />
          </div>

          <div>
            <p
              className='text-[var(--ac-ink-4)] font-extrabold leading-none tracking-tighter mb-6'
              style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(72px, 11vw, 140px)' }}>
              404
            </p>
            <h2 className='ac-h2 mb-5'>
              We Can&apos;t Seem to Find The Page You&apos;re Looking For.
            </h2>
            <p className='ac-body mb-9 max-w-md'>
              Oops! The page you are looking for does not exist. It might have been moved or
              deleted.
            </p>
            <div className='flex items-center flex-wrap gap-3'>
              <Link href='/' className='ac-btn ac-btn-primary'>
                Go To Home
              </Link>
              <Link href='/contact' className='ac-btn ac-btn-ghost'>
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFound
