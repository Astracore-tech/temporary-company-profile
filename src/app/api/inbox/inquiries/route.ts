import { NextResponse } from 'next/server'
import { getStaff } from '@/server/auth'
import { createManualInquiry, listInquiries } from '@/server/inquiries'
import { parseManualInquiry, parseSubmissionKey } from '@/server/validation'
import { isSameOrigin } from '@/server/request'
import { errorCode, readFields } from '@/server/http'

/** Staff only: list inquiries, or add one from a referral, meeting or chat. */

export const dynamic = 'force-dynamic'

const unauthorized = () => NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })

export async function GET() {
  if (!(await getStaff())) return unauthorized()
  return NextResponse.json({ ok: true, inquiries: await listInquiries() })
}

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 })
  const staff = await getStaff()
  if (!staff) return unauthorized()

  const fields = await readFields(req)
  if (!fields) return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 })

  const { data, errors } = parseManualInquiry(fields)
  if (!data) return NextResponse.json({ ok: false, error: 'invalid', fieldErrors: errors }, { status: 400 })

  try {
    const { id } = await createManualInquiry(data, parseSubmissionKey(fields.submissionKey), staff.email)
    return NextResponse.json({ ok: true, id }, { status: 201 })
  } catch (err) {
    console.error('[inbox] manual create failed', errorCode(err))
    return NextResponse.json({ ok: false, error: 'unavailable' }, { status: 503 })
  }
}
