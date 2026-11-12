import { NextResponse } from 'next/server'
import { getStaff, SIGN_IN_PATH } from '@/server/auth'
import {
  ActionError,
  addNote,
  changeStage,
  completeNextAction,
  getInquiry,
  recordFirstPayment,
  recordOnboardingStarted,
  setNextAction,
} from '@/server/inquiries'
import { cleanLine, cleanText, LIMITS } from '@/server/validation'
import { isSameOrigin } from '@/server/request'
import { isIsoDate, today } from '@/server/time'
import { errorCode, readFields, seeOther, wantsJson } from '@/server/http'
import { isStage } from '@/lib/pipeline'

/**
 * Staff only: read one inquiry, or change it. The inbox posts plain HTML forms
 * here with an `intent`; JSON bodies get JSON answers instead of redirects.
 */

export const dynamic = 'force-dynamic'

type Ctx = { params: Promise<{ id: string }> }

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function GET(_req: Request, { params }: Ctx) {
  if (!(await getStaff())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  const { id } = await params
  const found = UUID.test(id) ? await getInquiry(id) : null
  if (!found) return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 })
  return NextResponse.json({ ok: true, ...found })
}

export async function POST(req: Request, { params }: Ctx) {
  const { id } = await params
  const json = wantsJson(req)
  const STATUS: Record<string, number> = { not_found: 404, unavailable: 503 }
  const back = (query: string) => {
    if (!json) return seeOther(req, `/inbox/${id}/?${query}`)
    const [kind, code] = query.split('=')
    return kind === 'ok'
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ ok: false, error: code }, { status: STATUS[code] ?? 400 })
  }

  if (!isSameOrigin(req)) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 })
  const staff = await getStaff()
  if (!staff) {
    return json
      ? NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
      : seeOther(req, SIGN_IN_PATH)
  }
  if (!UUID.test(id)) return back('error=not_found')

  const f = await readFields(req)
  if (!f) return back('error=invalid')
  const actor = staff.email

  try {
    switch (f.intent) {
      case 'stage': {
        if (!isStage(f.stage)) return back('error=invalid')
        await changeStage(id, f.stage, actor)
        return back('ok=stage')
      }
      case 'note': {
        const text = cleanText(f.note)
        if (!text || text.length > LIMITS.note) return back('error=invalid')
        await addNote(id, text, actor)
        return back('ok=note')
      }
      case 'next_action': {
        const action = cleanLine(f.action)
        if (!action || action.length > LIMITS.nextAction || !isIsoDate(f.due)) return back('error=invalid')
        await setNextAction(id, action, f.due, actor)
        return back('ok=next_action')
      }
      case 'next_action_done': {
        await completeNextAction(id, actor)
        return back('ok=next_action_done')
      }
      case 'first_payment':
      case 'onboarding': {
        const note = cleanLine(f.note).slice(0, 300) || null
        // Business dates can be back-dated but not set in the future.
        if (!isIsoDate(f.on) || f.on > today()) return back('error=invalid_date')
        if (f.intent === 'first_payment') await recordFirstPayment(id, f.on, note, actor)
        else await recordOnboardingStarted(id, f.on, note, actor)
        return back(`ok=${f.intent}`)
      }
      default:
        return back('error=invalid')
    }
  } catch (err) {
    if (err instanceof ActionError) return back(`error=${err.code}`)
    console.error('[inbox] update failed', errorCode(err))
    return back('error=unavailable')
  }
}
