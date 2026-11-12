'use client'
import { signOut } from 'next-auth/react'
import { SIGN_IN_PATH } from '@/lib/inquiryForm'

const SignOutButton = () => (
  <button
    type='button'
    onClick={() => signOut({ callbackUrl: SIGN_IN_PATH })}
    className='ac-small hover:text-[var(--ac-accent)] transition-colors cursor-pointer'>
    Sign out
  </button>
)

export default SignOutButton
