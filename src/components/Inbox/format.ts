import { BUSINESS_TZ } from '@/server/time'

/** Display helpers for the inbox — all times shown in the business time zone. */

export const formatDateTime = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: BUSINESS_TZ,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))

/** For YYYY-MM-DD business dates, which have no time zone of their own. */
export const formatDate = (ymd: string) =>
  new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(`${ymd}T00:00:00Z`)
  )
