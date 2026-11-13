import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireStaffPage } from '@/server/auth'
import { getInquiry, isAwaitingFirstPayment, isOverdue, type InquiryEvent } from '@/server/inquiries'
import { today } from '@/server/time'
import { EVENT_LABELS, STAGES, sourceLabel, stageLabel } from '@/lib/pipeline'
import { serviceTitle } from '@/content/services'
import OnceForm from '@/components/Inbox/OnceForm'
import { formatDate, formatDateTime } from '@/components/Inbox/format'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ ok?: string; error?: string }>
}

const OK: Record<string, string> = {
  created: 'Opportunity saved.',
  stage: 'Stage updated.',
  note: 'Note added.',
  next_action: 'Next action set.',
  next_action_done: 'Next action marked done.',
  first_payment: 'First payment recorded.',
  onboarding: 'Onboarding start recorded.',
}
const ERRORS: Record<string, string> = {
  invalid: 'Something was missing or invalid — nothing was changed.',
  invalid_date: 'Please use a valid date that isn’t in the future.',
  stage_unchanged: 'It was already at that stage.',
  not_accepted: 'Mark the proposal as Accepted before recording payment or onboarding.',
  payment_already_recorded: 'First payment is already recorded.',
  onboarding_already_recorded: 'Onboarding start is already recorded.',
  no_next_action: 'There is no next action to complete.',
  unavailable: 'Couldn’t save just now — please try again.',
}

const FIELD =
  'w-full bg-[var(--ac-bg)] text-[var(--ac-ink)] text-base sm:text-sm px-3.5 py-3 border border-[var(--ac-line-strong)] focus:border-[var(--ac-accent)] focus:shadow-[0_0_0_3px_var(--ac-accent-line)] rounded-md focus-visible:outline-none'
const LABEL = 'block text-sm font-semibold text-[var(--ac-ink-2)] mb-1.5'
const PANEL = 'ac-card p-5 sm:p-6'
const BUTTON = 'ac-btn ac-btn-primary min-h-[44px]'

function describe(e: InquiryEvent) {
  const d = e.detail
  switch (e.type) {
    case 'created':
      return `Source: ${sourceLabel(d.source ?? '')}${d.sourceDetail ? ` — ${d.sourceDetail}` : ''}`
    case 'stage_changed':
      return `${stageLabel(d.from ?? '')} → ${stageLabel(d.to ?? '')}`
    case 'note':
      return d.text
    case 'next_action_set':
      return `${d.action} — due ${formatDate(d.due!)}`
    case 'next_action_done':
      return d.action
    case 'first_payment_received':
    case 'onboarding_started':
      return `On ${formatDate(e.occurredOn!)}${d.note ? ` — ${d.note}` : ''}`
    default:
      return null
  }
}

function contactHref(replyTo: string) {
  if (replyTo.includes('@')) return `mailto:${replyTo}`
  return `tel:${replyTo.replace(/[^\d+]/g, '')}`
}

export default async function InquiryPage({ params, searchParams }: Props) {
  await requireStaffPage()
  const { id } = await params
  const { ok, error } = await searchParams
  const found = /^[0-9a-f-]{36}$/i.test(id) ? await getInquiry(id) : null
  if (!found) notFound()

  const { inquiry: i, events } = found
  const todayIso = today()
  const action = `/api/inbox/inquiries/${i.id}/`
  const overdue = isOverdue(i, todayIso)
  const service = serviceTitle(i.serviceInterest)

  return (
    <div className='max-w-4xl'>
      <Link href='/inbox/' className='ac-small hover:text-[var(--ac-accent)]'>
        ← Inbox
      </Link>

      {ok && OK[ok] && (
        <p role='status' className='mt-4 border border-[var(--ac-accent-line)] bg-[var(--ac-accent-dim)] px-4 py-3 text-sm text-[var(--ac-ink)]'>
          {OK[ok]}
        </p>
      )}
      {error && (
        <p role='alert' className='mt-4 rounded-md border border-[var(--ac-danger-line)] bg-[var(--ac-danger-dim)] px-4 py-3 text-sm text-[var(--ac-ink)]'>
          {ERRORS[error] ?? ERRORS.invalid}
        </p>
      )}

      {/* ── Who and what ─────────────────────────────────────────────── */}
      <header className='mt-6 mb-8'>
        <div className='flex flex-wrap items-center gap-2 mb-3'>
          <span className='ac-tag ac-tag-accent'>{stageLabel(i.stage)}</span>
          {isAwaitingFirstPayment(i) && <span className='ac-tag text-[var(--ac-warn)]'>Awaiting first payment</span>}
          {i.firstPaymentOn && <span className='ac-tag'>Paid {formatDate(i.firstPaymentOn)}</span>}
          {i.onboardingStartedOn && <span className='ac-tag'>Onboarding {formatDate(i.onboardingStartedOn)}</span>}
        </div>
        <h1 className='ac-h2'>
          {i.name}
          {i.company && <span className='ac-muted-line'> · {i.company}</span>}
        </h1>
        <p className='ac-small mt-3'>
          {sourceLabel(i.source)}
          {i.sourceDetail ? ` — ${i.sourceDetail}` : ''} · received {formatDateTime(i.createdAt)}
        </p>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-6'>
        <div className='space-y-6 min-w-0'>
          <div className={PANEL}>
            <p className={LABEL}>Reply to</p>
            <a href={contactHref(i.replyTo)} className='ac-h4 hover:text-[var(--ac-accent)] break-all'>
              {i.replyTo}
            </a>
            <p className={`${LABEL} mt-5`}>What they want to build or fix</p>
            <p className='ac-body whitespace-pre-wrap break-words'>{i.problem}</p>
            <p className={`${LABEL} mt-5`}>Service interest</p>
            <p className='ac-body'>{service ?? 'Not given'}</p>
          </div>

          {/* ── History ──────────────────────────────────────────────── */}
          <div className={PANEL}>
            <h2 className='ac-h4 mb-4'>History</h2>
            <ol className='space-y-4'>
              {[...events].reverse().map((e) => (
                <li key={e.id} data-event={e.type} className='border-l-2 border-[var(--ac-line-strong)] pl-4'>
                  <p className='text-sm font-semibold text-[var(--ac-ink)]'>{EVENT_LABELS[e.type] ?? e.type}</p>
                  {describe(e) && <p className='ac-small whitespace-pre-wrap break-words mt-0.5'>{describe(e)}</p>}
                  <p className='text-[11px] text-[var(--ac-ink-4)] mt-1'>
                    {formatDateTime(e.createdAt)} · {e.actor === 'visitor' ? 'Website visitor' : e.actor}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className='space-y-6 min-w-0'>
          {/* ── Next action ─────────────────────────────────────────── */}
          <div className={PANEL}>
            <h2 className='ac-h4 mb-3'>Next action</h2>
            {i.nextAction ? (
              <div className='mb-5'>
                <p className={overdue ? 'text-[var(--ac-danger)] font-semibold' : 'text-[var(--ac-ink)]'}>
                  {overdue ? 'Overdue — ' : ''}due {formatDate(i.nextActionDue!)}
                </p>
                <p className='ac-body mt-1'>{i.nextAction}</p>
                <OnceForm action={action} className='mt-3'>
                  <input type='hidden' name='intent' value='next_action_done' />
                  <button type='submit' className='ac-link cursor-pointer'>
                    Mark done
                  </button>
                </OnceForm>
              </div>
            ) : (
              <p className='ac-small mb-4'>None set.</p>
            )}
            <OnceForm action={action} className='space-y-3'>
              <input type='hidden' name='intent' value='next_action' />
              <div>
                <label htmlFor='na-action' className={LABEL}>
                  {i.nextAction ? 'Replace with' : 'What happens next'}
                </label>
                <input id='na-action' name='action' required maxLength={300} className={FIELD} placeholder='e.g. Call to arrange discovery' />
              </div>
              <div>
                <label htmlFor='na-due' className={LABEL}>
                  Due
                </label>
                <input id='na-due' name='due' type='date' required defaultValue={todayIso} className={FIELD} />
              </div>
              <button type='submit' className={BUTTON}>
                Set next action
              </button>
            </OnceForm>
          </div>

          {/* ── Stage ───────────────────────────────────────────────── */}
          <div className={PANEL}>
            <h2 className='ac-h4 mb-3'>Stage</h2>
            <OnceForm action={action} className='flex flex-col sm:flex-row gap-3'>
              <input type='hidden' name='intent' value='stage' />
              <label htmlFor='stage' className='sr-only'>
                Stage
              </label>
              <select id='stage' name='stage' defaultValue={i.stage} className={`${FIELD} cursor-pointer`}>
                {STAGES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <button type='submit' className={`${BUTTON} shrink-0`}>
                Update
              </button>
            </OnceForm>
          </div>

          {/* ── Payment & onboarding: two separate dated events ─────── */}
          <div className={PANEL}>
            <h2 className='ac-h4 mb-1'>After acceptance</h2>
            <p className='ac-small mb-4'>Proposals, invoicing and onboarding happen outside this tool; record the dates here.</p>
            {i.stage !== 'accepted' ? (
              <p className='ac-small'>Available once the stage is Accepted.</p>
            ) : (
              <div className='space-y-6'>
                {i.firstPaymentOn ? (
                  <p className='text-[var(--ac-ink)]'>First payment received {formatDate(i.firstPaymentOn)}.</p>
                ) : (
                  <OnceForm action={action} className='space-y-3'>
                    <input type='hidden' name='intent' value='first_payment' />
                    <label htmlFor='pay-on' className={LABEL}>
                      First payment received on
                    </label>
                    <input id='pay-on' name='on' type='date' required max={todayIso} defaultValue={todayIso} className={FIELD} />
                    <label htmlFor='pay-note' className={LABEL}>
                      Reference <span className='font-normal text-[var(--ac-ink-4)]'>(optional)</span>
                    </label>
                    <input id='pay-note' name='note' maxLength={300} className={FIELD} />
                    <button type='submit' className={BUTTON}>
                      Record first payment
                    </button>
                  </OnceForm>
                )}
                <hr className='border-[var(--ac-line)]' />
                {i.onboardingStartedOn ? (
                  <p className='text-[var(--ac-ink)]'>Onboarding started {formatDate(i.onboardingStartedOn)}.</p>
                ) : (
                  <OnceForm action={action} className='space-y-3'>
                    <input type='hidden' name='intent' value='onboarding' />
                    <label htmlFor='onb-on' className={LABEL}>
                      Onboarding started on
                    </label>
                    <input id='onb-on' name='on' type='date' required max={todayIso} defaultValue={todayIso} className={FIELD} />
                    <label htmlFor='onb-note' className={LABEL}>
                      Note <span className='font-normal text-[var(--ac-ink-4)]'>(optional)</span>
                    </label>
                    <input id='onb-note' name='note' maxLength={300} className={FIELD} />
                    <button type='submit' className={BUTTON}>
                      Record onboarding start
                    </button>
                  </OnceForm>
                )}
              </div>
            )}
          </div>

          {/* ── Note ────────────────────────────────────────────────── */}
          <div className={PANEL}>
            <h2 className='ac-h4 mb-3'>Add a note</h2>
            <OnceForm action={action} className='space-y-3'>
              <input type='hidden' name='intent' value='note' />
              <label htmlFor='note' className='sr-only'>
                Note
              </label>
              <textarea id='note' name='note' required rows={4} maxLength={4000} className={`${FIELD} resize-y`} />
              <button type='submit' className={BUTTON}>
                Add note
              </button>
            </OnceForm>
          </div>
        </div>
      </div>
    </div>
  )
}
