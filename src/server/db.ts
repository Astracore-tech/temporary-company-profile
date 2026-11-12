import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { createClient, type Client } from '@libsql/client'
import { SCHEMA, DEFAULT_DATABASE_URL } from './schema.mjs'

/**
 * One libsql client per server process.
 *
 * DATABASE_URL is a local SQLite file (`file:...`) for development and
 * previews, or a hosted libsql URL (`libsql://...`) where the filesystem is not
 * persistent — which includes Vercel, the current production host.
 */

export class StorageConfigError extends Error {}

let client: Client | null = null
let ready: Promise<void> | null = null

function connect(): Client {
  const url = process.env.DATABASE_URL || DEFAULT_DATABASE_URL

  if (url.startsWith('file:')) {
    // A file database on a serverless host would silently lose inquiries.
    if (process.env.VERCEL) {
      throw new StorageConfigError('DATABASE_URL must point at a hosted libsql database on Vercel')
    }
    mkdirSync(path.dirname(path.resolve(url.slice('file:'.length))), { recursive: true })
  }

  return createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN || undefined })
}

/** Returns a connected client with the schema in place. */
export async function db(): Promise<Client> {
  if (!client) client = connect()
  if (!ready) {
    const c = client
    ready = c.batch(SCHEMA, 'write').then(() => undefined)
    // Let the next request try again instead of caching a failure forever.
    ready.catch(() => {
      ready = null
    })
  }
  await ready
  return client
}
