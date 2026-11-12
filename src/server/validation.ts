import { serviceInterestOptions } from '@/content/services'
import { isManualSource, type SourceId } from '@/lib/pipeline'

export const LIMITS = {
  name: 100,
  replyTo: 160,
  company: 120,
  problem: 4000,
  problemMin: 10,
  sourceDetail: 200,
  note: 4000,
  nextAction: 300,
} as const

export type FieldErrors = Partial<Record<string, string>>

export type InquiryInput = {
  name: string
  replyTo: string
  company: string | null
  serviceInterest: string | null
  problem: string
}

const text = (v: unknown) => (typeof v === 'string' ? v.replace(/\r\n/g, '\n').trim() : '')
const oneLine = (v: unknown) => text(v).replace(/\s+/g, ' ')

const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i

/** An email address, or a phone/WhatsApp number in local or international form. */
export function isReplyTo(v: string): boolean {
  if (EMAIL.test(v)) return true
  if (!/^\+?[\d\s().-]+$/.test(v)) return false
  const digits = v.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15
}

/** Shared by the public form and manual entry. */
export function parseInquiry(raw: Record<string, unknown>): { data?: InquiryInput; errors: FieldErrors } {
  const errors: FieldErrors = {}
  const name = oneLine(raw.name)
  const replyTo = oneLine(raw.replyTo)
  const company = oneLine(raw.company)
  const serviceInterest = oneLine(raw.serviceInterest)
  const problem = text(raw.problem)

  if (!name) errors.name = 'Please tell us your name.'
  else if (name.length > LIMITS.name) errors.name = `Please keep this under ${LIMITS.name} characters.`

  if (!replyTo) errors.replyTo = 'Please give us an email address or phone number to reply to.'
  else if (replyTo.length > LIMITS.replyTo || !isReplyTo(replyTo))
    errors.replyTo = 'Please enter a valid email address or phone number (include the country code if outside Kenya).'

  if (company.length > LIMITS.company) errors.company = `Please keep this under ${LIMITS.company} characters.`

  if (serviceInterest && !serviceInterestOptions.some((s) => s.id === serviceInterest))
    errors.serviceInterest = 'Please choose one of the options.'

  if (problem.length < LIMITS.problemMin)
    errors.problem = 'Please describe what you want to build or fix in a sentence or two.'
  else if (problem.length > LIMITS.problem)
    errors.problem = `Please keep this under ${LIMITS.problem} characters.`

  if (Object.keys(errors).length) return { errors }
  return {
    errors,
    data: {
      name,
      replyTo,
      company: company || null,
      serviceInterest: serviceInterest || null,
      problem,
    },
  }
}

export function parseManualInquiry(raw: Record<string, unknown>) {
  const result = parseInquiry(raw)
  const source = oneLine(raw.source)
  const sourceDetail = oneLine(raw.sourceDetail)
  if (!isManualSource(source)) result.errors.source = 'Please choose where this came from.'
  if (sourceDetail.length > LIMITS.sourceDetail)
    result.errors.sourceDetail = `Please keep this under ${LIMITS.sourceDetail} characters.`
  if (Object.keys(result.errors).length) return { errors: result.errors }
  return {
    errors: result.errors,
    data: { ...result.data!, source: source as SourceId, sourceDetail: sourceDetail || null },
  }
}

/** Client-generated idempotency key: a UUID, or nothing. */
export function parseSubmissionKey(v: unknown): string | null {
  return typeof v === 'string' && /^[0-9a-f-]{32,36}$/i.test(v) ? v.toLowerCase() : null
}

export const cleanText = text
export const cleanLine = oneLine
