'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { serviceInterestOptions } from '@/content/services'
import { MANUAL_SOURCES } from '@/lib/pipeline'
import {
  HONEYPOT_FIELD,
  MANUAL_INQUIRY_ENDPOINT,
  PUBLIC_INQUIRY_ENDPOINT,
} from '@/lib/inquiryForm'
import { SITE } from '@/utils/site'

/**
 * The inquiry form. `public` is the website journey; `manual` is the founder
 * adding an opportunity from a referral, meeting or chat.
 *
 * One form fill carries one submission key, reused on retry, so a double-click
 * or a retry after a dropped connection can only ever create one inquiry.
 */

type Variant = 'public' | 'manual'

const EMPTY = {
  name: '',
  replyTo: '',
  company: '',
  serviceInterest: '',
  problem: '',
  source: '',
  sourceDetail: '',
}
type Values = typeof EMPTY
type FieldErrors = Partial<Record<keyof Values, string>>

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'sent'; reference: string }
  | { kind: 'failed'; message: string }

/** UUID v4 from getRandomValues — randomUUID is missing on plain-http previews. */
function newSubmissionKey() {
  const b = crypto.getRandomValues(new Uint8Array(16))
  b[6] = (b[6] & 0x0f) | 0x40
  b[8] = (b[8] & 0x3f) | 0x80
  const h = Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`
}

const LABEL = 'block text-[var(--ac-ink-2)] text-sm font-semibold mb-2'
const HINT = 'block text-[var(--ac-ink-4)] text-xs font-normal mt-1'
// 16px text on small screens stops iOS zooming into the field on focus.
const FIELD =
  'w-full bg-[var(--ac-bg)] text-[var(--ac-ink)] text-base sm:text-sm px-4 py-3.5 border border-[var(--ac-line-strong)] focus:border-[var(--ac-accent)] focus:shadow-[0_0_0_3px_var(--ac-accent-line)] placeholder:text-[var(--ac-ink-4)] rounded-md focus-visible:outline-none transition-colors aria-[invalid=true]:border-[var(--ac-danger)]'
const ERROR = 'mt-2 text-sm text-[var(--ac-danger)]'

const MESSAGES: Record<string, string> = {
  sent: '',
  invalid: 'Some details were missing or invalid. Please check the form and send it again.',
  error: 'We couldn’t save your inquiry just now. Please try again.',
}

export default function InquiryForm({ variant = 'public' }: { variant?: Variant }) {
  const router = useRouter()
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const keyRef = useRef<string | null>(null)
  const inFlight = useRef(false)
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    keyRef.current = newSubmissionKey()
    // Result of a no-JavaScript form post, reported back via a status code in the URL.
    if (variant === 'public') {
      const result = new URLSearchParams(window.location.search).get('inquiry')
      if (result === 'sent') setStatus({ kind: 'sent', reference: '' })
      else if (result && MESSAGES[result]) setStatus({ kind: 'failed', message: MESSAGES[result] })
    }
  }, [variant])

  useEffect(() => {
    if (status.kind === 'sent' || status.kind === 'failed') statusRef.current?.focus()
  }, [status.kind])

  const set = (field: keyof Values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }))
  }

  async function submit(e?: React.FormEvent) {
    e?.preventDefault()
    // Guards the double-click: one request at a time per form fill.
    if (inFlight.current) return
    inFlight.current = true
    setStatus({ kind: 'submitting' })

    const form = e?.currentTarget as HTMLFormElement | undefined
    const honeypot = form ? (new FormData(form).get(HONEYPOT_FIELD) as string) || '' : ''

    try {
      const res = await fetch(variant === 'public' ? PUBLIC_INQUIRY_ENDPOINT : MANUAL_INQUIRY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          submissionKey: keyRef.current ?? (keyRef.current = newSubmissionKey()),
          [HONEYPOT_FIELD]: honeypot,
        }),
      })
      const body = await res.json().catch(() => ({}))

      if (res.ok && body.ok) {
        if (variant === 'manual') {
          router.push(`/inbox/${body.id}/?ok=created`)
          return
        }
        setStatus({ kind: 'sent', reference: body.reference })
        return
      }

      if (res.status === 400 && body.fieldErrors) {
        setErrors(body.fieldErrors)
        setStatus({ kind: 'failed', message: 'Please check the highlighted fields.' })
      } else if (res.status === 429) {
        setStatus({
          kind: 'failed',
          message: 'We’ve received several messages from your connection in a short time. Please wait a few minutes and try again.',
        })
      } else if (res.status === 401) {
        setStatus({
          kind: 'failed',
          message: 'Your session has expired. Sign in again in a new tab, then come back and retry — your entry is kept here.',
        })
      } else {
        setStatus({ kind: 'failed', message: MESSAGES.error })
      }
    } catch {
      setStatus({ kind: 'failed', message: 'We couldn’t reach the server. Check your connection and try again.' })
    } finally {
      inFlight.current = false
    }
  }

  function startAnother() {
    keyRef.current = newSubmissionKey()
    setValues(EMPTY)
    setErrors({})
    setStatus({ kind: 'idle' })
    if (window.location.search) window.history.replaceState(null, '', window.location.pathname + '#inquiry')
  }

  if (status.kind === 'sent') {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role='status'
        className='border border-[var(--ac-accent-line)] bg-[var(--ac-accent-dim)] p-6 sm:p-8 focus:outline-none'>
        <p className='ac-h3 mb-3'>Thank you — your inquiry is saved.</p>
        <p className='ac-body'>
          {values.name ? `${values.name}, we` : 'We'} will reply
          {values.replyTo ? <> on <strong className='text-[var(--ac-ink)]'>{values.replyTo}</strong></> : null}.
          {status.reference ? (
            <>
              {' '}Your reference is{' '}
              <strong className='text-[var(--ac-ink)] tracking-wider'>{status.reference}</strong>.
            </>
          ) : null}
        </p>
        <button type='button' onClick={startAnother} className='ac-link mt-6 cursor-pointer'>
          Send another inquiry →
        </button>
      </div>
    )
  }

  const submitting = status.kind === 'submitting'
  const fieldProps = (field: keyof Values) => ({
    id: `inq-${field}`,
    name: field,
    value: values[field],
    onChange: set(field),
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `inq-${field}-error` : undefined,
  })
  const fieldError = (field: keyof Values) =>
    errors[field] ? (
      <p id={`inq-${field}-error`} className={ERROR}>
        {errors[field]}
      </p>
    ) : null

  return (
    <form
      // Without JavaScript this still posts (never GETs), so nothing typed lands in a URL.
      method='post'
      action={variant === 'public' ? PUBLIC_INQUIRY_ENDPOINT : undefined}
      onSubmit={submit}
      noValidate
      className='space-y-5'>
      {variant === 'manual' && (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          <div>
            <label htmlFor='inq-source' className={LABEL}>
              Where did this come from?
            </label>
            <select {...fieldProps('source')} required className={`${FIELD} cursor-pointer`}>
              <option value=''>Choose a source</option>
              {MANUAL_SOURCES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            {fieldError('source')}
          </div>
          <div>
            <label htmlFor='inq-sourceDetail' className={LABEL}>
              Source detail <span className={HINT}>Optional — e.g. who referred them</span>
            </label>
            <input {...fieldProps('sourceDetail')} type='text' maxLength={200} className={FIELD} />
            {fieldError('sourceDetail')}
          </div>
        </div>
      )}

      <div>
        <label htmlFor='inq-name' className={LABEL}>
          {variant === 'public' ? 'Your name' : 'Contact name'}
        </label>
        <input {...fieldProps('name')} type='text' autoComplete='name' required maxLength={100} className={FIELD} />
        {fieldError('name')}
      </div>

      <div>
        <label htmlFor='inq-replyTo' className={LABEL}>
          {variant === 'public' ? 'How should we reply?' : 'Email or phone'}
          <span className={HINT}>Email address, or phone / WhatsApp number with country code</span>
        </label>
        <input
          {...fieldProps('replyTo')}
          type='text'
          autoComplete='email'
          required
          maxLength={160}
          className={FIELD}
        />
        {fieldError('replyTo')}
      </div>

      <div>
        <label htmlFor='inq-problem' className={LABEL}>
          {variant === 'public' ? 'What do you want to build or fix?' : 'What do they want to build or fix?'}
          <span className={HINT}>
            Describe the problem in your own words — what happens today and what you’d like to change.
          </span>
        </label>
        <textarea
          {...fieldProps('problem')}
          required
          rows={5}
          maxLength={4000}
          className={`${FIELD} min-h-[140px] resize-y`}
        />
        {fieldError('problem')}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
        <div>
          <label htmlFor='inq-company' className={LABEL}>
            Company <span className={HINT}>Optional</span>
          </label>
          <input
            {...fieldProps('company')}
            type='text'
            autoComplete='organization'
            maxLength={120}
            className={FIELD}
          />
          {fieldError('company')}
        </div>
        <div>
          <label htmlFor='inq-serviceInterest' className={LABEL}>
            Closest service <span className={HINT}>Optional — skip it if you’re not sure</span>
          </label>
          <select {...fieldProps('serviceInterest')} className={`${FIELD} cursor-pointer`}>
            <option value=''>Choose one (optional)</option>
            {serviceInterestOptions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
          {fieldError('serviceInterest')}
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden='true' className='absolute left-[-10000px] w-px h-px overflow-hidden'>
        <label htmlFor={`inq-${HONEYPOT_FIELD}`}>Leave this empty</label>
        <input id={`inq-${HONEYPOT_FIELD}`} name={HONEYPOT_FIELD} type='text' tabIndex={-1} autoComplete='off' />
      </div>

      {status.kind === 'failed' && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role='alert'
          className='rounded-md border border-[var(--ac-danger-line)] bg-[var(--ac-danger-dim)] p-4 text-sm text-[var(--ac-ink)] focus:outline-none'>
          <p>{status.message}</p>
          {variant === 'public' && (
            <p className='mt-2 text-[var(--ac-ink-3)]'>
              You can also email{' '}
              <a href={`mailto:${SITE.email}`} className='underline hover:text-[var(--ac-accent)]'>
                {SITE.email}
              </a>{' '}
              or call{' '}
              <a href={`tel:${SITE.telephone}`} className='underline hover:text-[var(--ac-accent)]'>
                {SITE.telephoneDisplay}
              </a>
              .
            </p>
          )}
        </div>
      )}

      <div className='flex flex-col sm:flex-row sm:items-center gap-4 pt-1'>
        <button
          type='submit'
          disabled={submitting}
          aria-busy={submitting}
          className='ac-btn ac-btn-primary w-full sm:w-auto min-h-[48px] disabled:opacity-60 disabled:cursor-wait'>
          {submitting
            ? 'Sending…'
            : status.kind === 'failed'
              ? 'Try again'
              : variant === 'public'
                ? 'Send inquiry'
                : 'Save opportunity'}
        </button>
        {variant === 'public' && (
          <p className='ac-small'>
            We use these details only to reply to you and, if we work together, to manage that
            work.{' '}
            <Link href='/privacy/' className='underline underline-offset-2 hover:text-[var(--ac-accent)]'>
              Privacy notice
            </Link>
          </p>
        )}
      </div>
    </form>
  )
}
