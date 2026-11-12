// Plain ESM (not TypeScript) so scripts/add-staff.mjs can share it with the app.
//
// AstraCore's own database. It holds only AstraCore inquiries and staff
// accounts and is deliberately separate from any other system (e.g. Amplifyr).

/** Idempotent DDL — safe to run on every cold start. */
export const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS inquiries (
    id TEXT PRIMARY KEY,
    -- Client-generated key for one form fill; makes double-clicks and retries safe.
    submission_key TEXT UNIQUE,
    -- Hash of normalised contact + problem, for catching resubmits without a key.
    fingerprint TEXT,
    source TEXT NOT NULL,
    source_detail TEXT,
    name TEXT NOT NULL,
    reply_to TEXT NOT NULL,
    company TEXT,
    service_interest TEXT,
    problem TEXT NOT NULL,
    stage TEXT NOT NULL DEFAULT 'new',
    next_action TEXT,
    next_action_due TEXT,
    first_payment_on TEXT,
    onboarding_started_on TEXT,
    created_by TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS inquiries_fingerprint ON inquiries (fingerprint, created_at)`,
  `CREATE INDEX IF NOT EXISTS inquiries_stage ON inquiries (stage)`,
  `CREATE TABLE IF NOT EXISTS inquiry_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    inquiry_id TEXT NOT NULL REFERENCES inquiries(id),
    type TEXT NOT NULL,
    -- JSON payload, shape depends on type.
    detail TEXT,
    -- Business date for dated events (payment, onboarding), YYYY-MM-DD.
    occurred_on TEXT,
    actor TEXT NOT NULL,
    created_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS inquiry_events_inquiry ON inquiry_events (inquiry_id, id)`,
  `CREATE TABLE IF NOT EXISTS staff_users (
    email TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS rate_limits (
    bucket TEXT NOT NULL,
    window_start INTEGER NOT NULL,
    count INTEGER NOT NULL,
    PRIMARY KEY (bucket, window_start)
  )`,
]

/** Local default: a SQLite file outside the source tree's tracked files. */
export const DEFAULT_DATABASE_URL = 'file:.data/astracore.db'
