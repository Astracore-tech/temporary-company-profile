import { createHash, randomUUID } from 'node:crypto'
import type { Client, Row, Transaction } from '@libsql/client'
import { db } from './db'
import type { InquiryInput } from './validation'
import type { SourceId, StageId } from '@/lib/pipeline'

/**
 * Inquiry and opportunity records. Every change to an inquiry is written
 * together with a history event in the same transaction, so the history is
 * never out of step with the record.
 */

export type Inquiry = {
  id: string
  source: string
  sourceDetail: string | null
  name: string
  replyTo: string
  company: string | null
  serviceInterest: string | null
  problem: string
  stage: StageId
  nextAction: string | null
  nextActionDue: string | null
  firstPaymentOn: string | null
  onboardingStartedOn: string | null
  createdBy: string
  createdAt: string
  updatedAt: string
}

export type InquiryEvent = {
  id: number
  type: string
  detail: Record<string, string | null>
  occurredOn: string | null
  actor: string
  createdAt: string
}

/** A rule the founder's action broke; the message is safe to show. */
export class ActionError extends Error {
  constructor(public code: string) {
    super(code)
  }
}

const str = (v: unknown) => (v === null || v === undefined ? null : String(v))

const toInquiry = (r: Row): Inquiry => ({
  id: String(r.id),
  source: String(r.source),
  sourceDetail: str(r.source_detail),
  name: String(r.name),
  replyTo: String(r.reply_to),
  company: str(r.company),
  serviceInterest: str(r.service_interest),
  problem: String(r.problem),
  stage: String(r.stage) as StageId,
  nextAction: str(r.next_action),
  nextActionDue: str(r.next_action_due),
  firstPaymentOn: str(r.first_payment_on),
  onboardingStartedOn: str(r.onboarding_started_on),
  createdBy: String(r.created_by),
  createdAt: String(r.created_at),
  updatedAt: String(r.updated_at),
})

const toEvent = (r: Row): InquiryEvent => ({
  id: Number(r.id),
  type: String(r.type),
  detail: r.detail ? JSON.parse(String(r.detail)) : {},
  occurredOn: str(r.occurred_on),
  actor: String(r.actor),
  createdAt: String(r.created_at),
})

const now = () => new Date().toISOString()

const eventStatement = (
  inquiryId: string,
  type: string,
  actor: string,
  detail: Record<string, unknown> = {},
  occurredOn: string | null = null
) => ({
  sql: `INSERT INTO inquiry_events (inquiry_id, type, detail, occurred_on, actor, created_at)
        VALUES (?, ?, ?, ?, ?, ?)`,
  args: [inquiryId, type, JSON.stringify(detail), occurredOn, actor, now()],
})

const insertStatement = (
  id: string,
  input: InquiryInput,
  meta: { source: SourceId; sourceDetail: string | null; submissionKey: string | null; fingerprint: string | null; actor: string }
) => {
  const ts = now()
  return {
    sql: `INSERT INTO inquiries
            (id, submission_key, fingerprint, source, source_detail, name, reply_to, company,
             service_interest, problem, stage, created_by, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?, ?)`,
    args: [
      id, meta.submissionKey, meta.fingerprint, meta.source, meta.sourceDetail, input.name,
      input.replyTo, input.company, input.serviceInterest, input.problem, meta.actor, ts, ts,
    ],
  }
}

/**
 * Same person + same problem text. Phone numbers compare on their last nine
 * digits so 0712… and +254 712… match.
 */
function fingerprintOf(input: InquiryInput) {
  const contact = input.replyTo.includes('@')
    ? input.replyTo.toLowerCase()
    : input.replyTo.replace(/\D/g, '').slice(-9)
  const problem = input.problem.toLowerCase().replace(/\s+/g, ' ')
  return createHash('sha256').update(`${contact}|${problem}`).digest('hex')
}

const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000

// ── Public form ────────────────────────────────────────────────────────────

export async function findBySubmissionKey(key: string): Promise<string | null> {
  const res = await (await db()).execute({
    sql: 'SELECT id FROM inquiries WHERE submission_key = ?',
    args: [key],
  })
  return res.rows[0] ? String(res.rows[0].id) : null
}

/**
 * An inquiry this submission repeats: the same form fill (same key), or the
 * same message from the same contact within a day.
 */
export async function findExistingWebsiteInquiry(
  input: InquiryInput,
  submissionKey: string | null
): Promise<string | null> {
  if (submissionKey) {
    const byKey = await findBySubmissionKey(submissionKey)
    if (byKey) return byKey
  }
  const recent = await (await db()).execute({
    sql: 'SELECT id FROM inquiries WHERE fingerprint = ? AND created_at > ? ORDER BY created_at DESC LIMIT 1',
    args: [fingerprintOf(input), new Date(Date.now() - DUPLICATE_WINDOW_MS).toISOString()],
  })
  return recent.rows[0] ? String(recent.rows[0].id) : null
}

/**
 * Saves a website inquiry exactly once. Callers check
 * findExistingWebsiteInquiry first; the unique submission key settles any
 * race between two copies that both got past that check.
 */
export const submitWebsiteInquiry = (input: InquiryInput, submissionKey: string | null) =>
  insertOnce(input, {
    source: 'website',
    sourceDetail: null,
    submissionKey,
    fingerprint: fingerprintOf(input),
    actor: 'visitor',
  })

async function insertOnce(
  input: InquiryInput,
  meta: { source: SourceId; sourceDetail: string | null; submissionKey: string | null; fingerprint: string | null; actor: string }
): Promise<{ id: string; duplicate: boolean }> {
  const id = randomUUID()
  try {
    await (await db()).batch(
      [
        insertStatement(id, input, meta),
        eventStatement(id, 'created', meta.actor, { source: meta.source, sourceDetail: meta.sourceDetail }),
      ],
      'write'
    )
  } catch (err) {
    // Two copies of one submission raced (e.g. a double-click): the unique
    // key let only one in, so hand back that one.
    if (meta.submissionKey) {
      const existing = await findBySubmissionKey(meta.submissionKey)
      if (existing) return { id: existing, duplicate: true }
    }
    throw err
  }
  return { id, duplicate: false }
}

// ── Founder inbox ──────────────────────────────────────────────────────────

export async function listInquiries(): Promise<Inquiry[]> {
  const res = await (await db()).execute('SELECT * FROM inquiries ORDER BY created_at DESC')
  return res.rows.map(toInquiry)
}

export async function getInquiry(id: string) {
  const client = await db()
  const [row, events] = await Promise.all([
    client.execute({ sql: 'SELECT * FROM inquiries WHERE id = ?', args: [id] }),
    client.execute({ sql: 'SELECT * FROM inquiry_events WHERE inquiry_id = ? ORDER BY id', args: [id] }),
  ])
  if (!row.rows[0]) return null
  return { inquiry: toInquiry(row.rows[0]), events: events.rows.map(toEvent) }
}

/** An opportunity from a referral, meeting, WhatsApp chat etc., entered by staff. */
export async function createManualInquiry(
  input: InquiryInput & { source: SourceId; sourceDetail: string | null },
  submissionKey: string | null,
  actor: string
) {
  if (submissionKey) {
    const existing = await findBySubmissionKey(submissionKey)
    if (existing) return { id: existing, duplicate: true }
  }
  return insertOnce(input, {
    source: input.source,
    sourceDetail: input.sourceDetail,
    submissionKey,
    fingerprint: null,
    actor,
  })
}

/** Runs read-check-write for one inquiry inside a write transaction. */
async function mutate(id: string, apply: (row: Inquiry, tx: Transaction) => Promise<void>) {
  const client: Client = await db()
  const tx = await client.transaction('write')
  try {
    const res = await tx.execute({ sql: 'SELECT * FROM inquiries WHERE id = ?', args: [id] })
    if (!res.rows[0]) throw new ActionError('not_found')
    await apply(toInquiry(res.rows[0]), tx)
    await tx.execute({ sql: 'UPDATE inquiries SET updated_at = ? WHERE id = ?', args: [now(), id] })
    await tx.commit()
  } catch (err) {
    await tx.rollback().catch(() => {})
    throw err
  } finally {
    tx.close()
  }
}

export const changeStage = (id: string, to: StageId, actor: string) =>
  mutate(id, async (row, tx) => {
    if (row.stage === to) throw new ActionError('stage_unchanged')
    await tx.execute({ sql: 'UPDATE inquiries SET stage = ? WHERE id = ?', args: [to, id] })
    await tx.execute(eventStatement(id, 'stage_changed', actor, { from: row.stage, to }))
  })

export const addNote = (id: string, text: string, actor: string) =>
  mutate(id, async (_row, tx) => {
    await tx.execute(eventStatement(id, 'note', actor, { text }))
  })

export const setNextAction = (id: string, action: string, due: string, actor: string) =>
  mutate(id, async (_row, tx) => {
    await tx.execute({
      sql: 'UPDATE inquiries SET next_action = ?, next_action_due = ? WHERE id = ?',
      args: [action, due, id],
    })
    await tx.execute(eventStatement(id, 'next_action_set', actor, { action, due }, due))
  })

export const completeNextAction = (id: string, actor: string) =>
  mutate(id, async (row, tx) => {
    if (!row.nextAction) throw new ActionError('no_next_action')
    await tx.execute({
      sql: 'UPDATE inquiries SET next_action = NULL, next_action_due = NULL WHERE id = ?',
      args: [id],
    })
    await tx.execute(
      eventStatement(id, 'next_action_done', actor, { action: row.nextAction, due: row.nextActionDue })
    )
  })

/** First payment and onboarding are separate dated events on an accepted opportunity. */
export const recordFirstPayment = (id: string, on: string, note: string | null, actor: string) =>
  mutate(id, async (row, tx) => {
    if (row.stage !== 'accepted') throw new ActionError('not_accepted')
    if (row.firstPaymentOn) throw new ActionError('payment_already_recorded')
    await tx.execute({ sql: 'UPDATE inquiries SET first_payment_on = ? WHERE id = ?', args: [on, id] })
    await tx.execute(eventStatement(id, 'first_payment_received', actor, { note }, on))
  })

export const recordOnboardingStarted = (id: string, on: string, note: string | null, actor: string) =>
  mutate(id, async (row, tx) => {
    if (row.stage !== 'accepted') throw new ActionError('not_accepted')
    if (row.onboardingStartedOn) throw new ActionError('onboarding_already_recorded')
    await tx.execute({ sql: 'UPDATE inquiries SET onboarding_started_on = ? WHERE id = ?', args: [on, id] })
    await tx.execute(eventStatement(id, 'onboarding_started', actor, { note }, on))
  })

// ── Inbox views ────────────────────────────────────────────────────────────

export const isOverdue = (i: Inquiry, todayIso: string) =>
  i.stage !== 'closed_lost' && !!i.nextActionDue && i.nextActionDue < todayIso

export const isAwaitingFirstPayment = (i: Inquiry) => i.stage === 'accepted' && !i.firstPaymentOn
