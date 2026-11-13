import { createHash } from 'node:crypto'
import { db } from './db'

/**
 * The client IP is only ever used hashed, as a rate-limit bucket. It is never
 * stored with an inquiry or logged.
 */
export function clientFingerprint(headers: Headers | Record<string, unknown>): string {
  const get = (name: string) =>
    headers instanceof Headers ? headers.get(name) : (headers?.[name] as string | undefined)
  const ip = (get('x-forwarded-for') || '').split(',')[0].trim() || get('x-real-ip') || 'local'
  return createHash('sha256')
    .update(`${process.env.NEXTAUTH_SECRET || 'dev'}:${ip}`)
    .digest('hex')
    .slice(0, 32)
}

/**
 * Rejects cross-site form posts. Browsers send Origin on POST; a missing
 * header (curl, server-to-server) is allowed because the session cookie is
 * SameSite=Lax and staff routes also require it.
 *
 * A browser sends `Origin: null` instead of the real origin when the page's
 * referrer policy is no-referrer (or the user's browser forces it). That is
 * accepted only when the browser itself vouches that the request came from
 * this site via Sec-Fetch-Site, which page scripts cannot set.
 */
export function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin')
  if (!origin) return true
  if (origin === 'null') return req.headers.get('sec-fetch-site') === 'same-origin'
  try {
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host')
    return new URL(origin).host === host
  } catch {
    return false
  }
}

/**
 * Fixed-window counter stored in the database, so it holds across restarts
 * and across serverless instances. Returns true if the call is allowed.
 */
export async function rateLimit(bucket: string, limit: number, windowSeconds: number) {
  const client = await db()
  const now = Math.floor(Date.now() / 1000)
  const windowStart = now - (now % windowSeconds)
  const res = await client.execute({
    sql: `INSERT INTO rate_limits (bucket, window_start, count) VALUES (?, ?, 1)
          ON CONFLICT (bucket, window_start) DO UPDATE SET count = count + 1
          RETURNING count`,
    args: [bucket, windowStart],
  })
  // Opportunistic cleanup of windows older than a day.
  if (Math.random() < 0.02) {
    await client.execute({ sql: 'DELETE FROM rate_limits WHERE window_start < ?', args: [now - 86400] })
  }
  return Number(res.rows[0]?.count ?? 0) <= limit
}
