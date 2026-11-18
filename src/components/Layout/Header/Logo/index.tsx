import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getImgPath } from '@/utils/image'

const Logo: React.FC = () => {
  return (
    <Link href='/' className='group flex shrink-0 items-center gap-2.5'>
      <div className='relative h-7 w-7'>
        <Image
          src={getImgPath('/images/logo/logo-icon.png')}
          alt='AstraCore'
          fill
          sizes='28px'
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
      <span className='flex flex-col leading-none'>
        <span
          className='text-[17px] font-semibold text-[var(--ac-ink)] transition-colors group-hover:text-[var(--ac-accent)]'
          style={{ fontFamily: 'var(--ac-display)' }}>
          AstraCore
        </span>
        <span className='mt-1 text-[11px] font-medium text-[var(--ac-ink-4)]'>Technologies</span>
      </span>
    </Link>
  )
}

export default Logo
