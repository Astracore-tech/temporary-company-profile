/**
 * "Today" for overdue checks is a business date in the founder's time zone,
 * not UTC — an action due today must not turn overdue at 3am Nairobi time.
 */
export const BUSINESS_TZ = process.env.APP_TIMEZONE || 'Africa/Nairobi'

/** YYYY-MM-DD in the business time zone. */
export function today(now = new Date()): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: BUSINESS_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

/** Strict YYYY-MM-DD that is also a real calendar date. */
export function isIsoDate(v: unknown): v is string {
  if (typeof v !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false
  const d = new Date(`${v}T00:00:00Z`)
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v
}
