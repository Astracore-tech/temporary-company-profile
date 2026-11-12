import { NextResponse } from 'next/server'

const MAX_BODY_BYTES = 16 * 1024

export const wantsJson = (req: Request) =>
  (req.headers.get('content-type') || '').includes('application/json')

/**
 * Reads a JSON or urlencoded form body into a plain object. Returns null for
 * oversized or malformed bodies.
 */
export async function readFields(req: Request): Promise<Record<string, unknown> | null> {
  const declared = Number(req.headers.get('content-length') || 0)
  if (declared > MAX_BODY_BYTES) return null
  const raw = await req.text()
  if (raw.length > MAX_BODY_BYTES) return null
  try {
    if (wantsJson(req)) {
      const parsed = JSON.parse(raw)
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null
    }
    return Object.fromEntries(new URLSearchParams(raw))
  } catch {
    return null
  }
}

/** 303 so the browser follows with a GET. Paths carry status codes, never inquiry content. */
export const seeOther = (req: Request, path: string) =>
  NextResponse.redirect(new URL(path, req.url), 303)

/**
 * Error identity for logs — the class and driver code only. Never log the
 * request body or error messages that might echo values back.
 */
export const errorCode = (err: unknown) =>
  err instanceof Error
    ? [err.constructor.name, (err as { code?: string }).code].filter(Boolean).join(':')
    : 'unknown'
