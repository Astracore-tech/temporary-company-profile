#!/usr/bin/env node
// Creates or resets a founder-inbox staff account.
//
//   npm run staff:add -- founder@astracoretech.org "Founder Name"
//
// Prompts for the password (hidden). For non-interactive use set
// STAFF_PASSWORD instead. Uses DATABASE_URL / DATABASE_AUTH_TOKEN from the
// environment or .env.local, exactly like the app.
//
// To revoke access, delete the row:  npm run staff:remove -- someone@example.com

import { createClient } from '@libsql/client'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { SCHEMA, DEFAULT_DATABASE_URL } from '../src/server/schema.mjs'
import { hashPassword } from '../src/server/password.mjs'

const [command, emailArg, ...nameParts] = process.argv.slice(2)
const email = (emailArg || '').trim().toLowerCase()
const name = nameParts.join(' ').trim()

function usage(msg) {
  if (msg) console.error(msg)
  console.error('Usage: staff:add -- <email> "<name>"   |   staff:remove -- <email>')
  process.exit(1)
}

function promptHidden(question) {
  return new Promise((resolve) => {
    const stdin = process.stdin
    if (!stdin.isTTY) usage('No terminal for a password prompt — set STAFF_PASSWORD.')
    process.stdout.write(question)
    stdin.setRawMode(true)
    stdin.resume()
    let value = ''
    const onData = (buf) => {
      for (const ch of buf.toString('utf8')) {
        if (ch === '\r' || ch === '\n') {
          stdin.setRawMode(false)
          stdin.pause()
          stdin.off('data', onData)
          process.stdout.write('\n')
          return resolve(value)
        }
        if (ch === '\u0003') process.exit(130)
        if (ch === '\u007f' || ch === '\b') value = value.slice(0, -1)
        else value += ch
      }
    }
    stdin.on('data', onData)
  })
}

const url = process.env.DATABASE_URL || DEFAULT_DATABASE_URL
if (url.startsWith('file:')) mkdirSync(path.dirname(path.resolve(url.slice(5))), { recursive: true })
const db = createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN || undefined })
await db.batch(SCHEMA, 'write')

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) usage('A valid email is required.')

if (command === 'remove') {
  const res = await db.execute({ sql: 'DELETE FROM staff_users WHERE email = ?', args: [email] })
  console.log(res.rowsAffected ? `Removed ${email}.` : `No account for ${email}.`)
  process.exit(0)
}

if (!name) usage('A name is required.')
const password = process.env.STAFF_PASSWORD || (await promptHidden(`Password for ${email}: `))
if (password.length < 12) usage('Use a password of at least 12 characters.')

await db.execute({
  sql: `INSERT INTO staff_users (email, name, password_hash, created_at) VALUES (?, ?, ?, ?)
        ON CONFLICT (email) DO UPDATE SET name = excluded.name, password_hash = excluded.password_hash`,
  args: [email, name, await hashPassword(password), new Date().toISOString()],
})
console.log(`Staff account ready: ${email} (${url.startsWith('file:') ? url : 'hosted database'})`)
