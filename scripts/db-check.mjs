#!/usr/bin/env node
/**
 * Connect to the configured database, create any missing tables, and report
 * what is there. Safe to run repeatedly; it never deletes or changes rows.
 *
 *   npm run db:check                                  # uses .env.local
 *   node --env-file=.env.prod.local scripts/db-check.mjs   # production
 *
 * Prints the database host and row counts only — never the auth token or any
 * inquiry content.
 */
import { createClient } from '@libsql/client'
import { SCHEMA, DEFAULT_DATABASE_URL } from '../src/server/schema.mjs'

const url = process.env.DATABASE_URL || DEFAULT_DATABASE_URL
const token = process.env.DATABASE_AUTH_TOKEN || undefined
const where = url.startsWith('file:') ? url : new URL(url.replace(/^libsql:/, 'https:')).host

console.log(`Database: ${where}`)
if (!url.startsWith('file:') && !token) {
  console.error('DATABASE_AUTH_TOKEN is empty — a hosted database needs it.')
  process.exit(1)
}

try {
  const db = createClient({ url, authToken: token })
  await db.batch(SCHEMA, 'write')
  const tables = await db.execute(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
  )
  for (const { name } of tables.rows) {
    const { rows } = await db.execute(`SELECT count(*) AS n FROM "${name}"`)
    console.log(`  ${String(name).padEnd(16)} ${rows[0].n} rows`)
  }
  console.log('Connected; schema is in place.')
} catch (err) {
  // Class and code only: libsql errors can echo the URL.
  console.error(`Could not use the database: ${err?.constructor?.name ?? 'Error'} ${err?.code ?? ''}`.trim())
  process.exit(1)
}
