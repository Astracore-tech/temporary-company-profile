'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

const FIELD =
  'w-full bg-[var(--ac-surface)] text-[var(--ac-ink)] text-base sm:text-sm px-4 py-3.5 border border-[var(--ac-line-strong)] focus:border-[var(--ac-accent)] rounded-none focus-visible:outline-none'

export default function SignInForm() {
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (busy) return
    const data = new FormData(e.currentTarget)
    setBusy(true)
    setError('')
    const res = await signIn('credentials', {
      email: String(data.get('email') || ''),
      password: String(data.get('password') || ''),
      redirect: false,
    }).catch(() => null)
    if (res?.ok && !res.error) {
      // Full navigation so the server-rendered inbox sees the new session cookie.
      window.location.assign('/inbox/')
      return
    }
    setBusy(false)
    setError(
      res
        ? 'That email and password didn’t match, or there were too many attempts. Please wait a few minutes and try again.'
        : 'Couldn’t reach the server. Please try again.'
    )
  }

  return (
    <form method='post' onSubmit={submit} className='space-y-5'>
      <div>
        <label htmlFor='email' className='block text-sm font-semibold text-[var(--ac-ink-2)] mb-2'>
          Email
        </label>
        <input id='email' name='email' type='email' autoComplete='username' required className={FIELD} />
      </div>
      <div>
        <label htmlFor='password' className='block text-sm font-semibold text-[var(--ac-ink-2)] mb-2'>
          Password
        </label>
        <input
          id='password'
          name='password'
          type='password'
          autoComplete='current-password'
          required
          className={FIELD}
        />
      </div>
      {error && (
        <p role='alert' className='text-sm text-[#ff8a8a]'>
          {error}
        </p>
      )}
      <button type='submit' disabled={busy} className='ac-btn ac-btn-primary w-full min-h-[48px] disabled:opacity-60'>
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
