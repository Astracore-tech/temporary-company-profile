/**
 * Opportunity pipeline vocabulary — shared by the public form, the founder
 * inbox and the server. No server-only imports here.
 */

export const STAGES = [
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'discovery', label: 'Discovery' },
  { id: 'proposal_sent', label: 'Proposal sent' },
  { id: 'accepted', label: 'Accepted' },
  { id: 'closed_lost', label: 'Closed lost' },
] as const

export type StageId = (typeof STAGES)[number]['id']

export const isStage = (v: unknown): v is StageId =>
  typeof v === 'string' && STAGES.some((s) => s.id === v)

export const stageLabel = (id: string) => STAGES.find((s) => s.id === id)?.label ?? id

/** Where an opportunity came from. `website` is only set by the public form. */
export const SOURCES = [
  { id: 'website', label: 'Website form' },
  { id: 'referral', label: 'Referral' },
  { id: 'meeting', label: 'Meeting' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'phone', label: 'Phone call' },
  { id: 'email', label: 'Email' },
  { id: 'other', label: 'Other' },
] as const

export type SourceId = (typeof SOURCES)[number]['id']

export const MANUAL_SOURCES = SOURCES.filter((s) => s.id !== 'website')

export const isManualSource = (v: unknown): v is SourceId =>
  typeof v === 'string' && MANUAL_SOURCES.some((s) => s.id === v)

export const sourceLabel = (id: string) => SOURCES.find((s) => s.id === id)?.label ?? id

/** History entry types. Payment and onboarding are deliberately separate. */
export const EVENT_LABELS: Record<string, string> = {
  created: 'Inquiry created',
  stage_changed: 'Stage changed',
  note: 'Note',
  next_action_set: 'Next action set',
  next_action_done: 'Next action completed',
  first_payment_received: 'First payment received',
  onboarding_started: 'Onboarding started',
}
