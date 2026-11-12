import { NextResponse } from 'next/server'
import { findExistingWebsiteInquiry, submitWebsiteInquiry } from '@/server/inquiries'
import { parseInquiry, parseSubmissionKey } from '@/server/validation'
import { clientFingerprint, isSameOrigin, rateLimit } from '@/server/request'
import { errorCode, readFields, seeOther, wantsJson } from '@/server/http'
import { HONEYPOT_FIELD } from '@/lib/inquiryForm'

/**
 * Public inquiry endpoint. The site's form posts JSON via fetch; a plain form
 * post (JavaScript unavailable) is also accepted and answered with a redirect,
 * so inquiry text never ends up in a URL.
 */

export const dynamic = 'force-dynamic'

const reference = (id: string) => id.slice(0, 8).toUpperCase()

export async function POST(req: Request) {
  const json = wantsJson(req)
  const fail = (status: number, error: string, extra: object = {}) =>
    json
      ? NextResponse.json({ ok: false, error, ...extra }, { status })
      : seeOther(req, `/contact/?inquiry=${status === 503 ? 'error' : 'invalid'}#inquiry`)
  const success = (id: string) =>
    json
      ? NextResponse.json({ ok: true, reference: reference(id) }, { status: 201 })
      : seeOther(req, '/contact/?inquiry=sent#inquiry')

  if (!isSameOrigin(req)) return fail(403, 'forbidden')

  const fields = await readFields(req)
  if (!fields) return fail(400, 'bad_request')
  if (fields[HONEYPOT_FIELD]) return fail(400, 'rejected')

  const { data, errors } = parseInquiry(fields)
  if (!data) return fail(400, 'invalid', { fieldErrors: errors })
  const key = parseSubmissionKey(fields.submissionKey)

  try {
    // A repeat of something already saved succeeds without counting against limits.
    const existing = await findExistingWebsiteInquiry(data, key)
    if (existing) return success(existing)

    const who = clientFingerprint(req.headers)
    const allowed =
      (await rateLimit(`inquiry:ip:${who}`, 5, 10 * 60)) &&
      (await rateLimit(`inquiry:ip-day:${who}`, 20, 24 * 60 * 60)) &&
      (await rateLimit('inquiry:all', 100, 60 * 60))
    if (!allowed) return fail(429, 'rate_limited')

    const { id } = await submitWebsiteInquiry(data, key)
    return success(id)
  } catch (err) {
    console.error('[inquiries] save failed', errorCode(err))
    return fail(503, 'unavailable')
  }
}
