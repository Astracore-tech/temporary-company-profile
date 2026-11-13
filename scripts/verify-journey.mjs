#!/usr/bin/env node
// End-to-end check of the inquiry journey against a running preview, through
// the same HTTP entry points a browser uses. Creates synthetic records only.
//
//   BASE_URL=http://localhost:3100 STAFF_EMAIL=... STAFF_PASSWORD=... npm run verify:journey
//
// Never point this at production: it creates inquiries.

import { randomUUID } from 'node:crypto'
import { readFileSync } from 'node:fs'

const BASE = (process.env.BASE_URL || 'http://localhost:3100').replace(/\/$/, '')
const STAFF_EMAIL = process.env.STAFF_EMAIL
const STAFF_PASSWORD = process.env.STAFF_PASSWORD
const SERVER_LOG = process.env.SERVER_LOG // optional: check nothing personal was logged

if (/astracoretech\.org/i.test(BASE)) {
  console.error('Refusing to run against the production domain.')
  process.exit(2)
}
if (!STAFF_EMAIL || !STAFF_PASSWORD) {
  console.error('Set STAFF_EMAIL and STAFF_PASSWORD for a preview staff account.')
  process.exit(2)
}

const run = randomUUID().slice(0, 8)
// Each run gets its own client address so repeated runs don't trip the rate limit.
const clientIp = `10.${(Math.random() * 250) | 0}.${(Math.random() * 250) | 0}.${(Math.random() * 250) | 0}`
let failures = 0

function check(name, ok, detail = '') {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${!ok && detail ? `\n      ${detail}` : ''}`)
  if (!ok) failures++
}

// ── tiny cookie-aware fetch ───────────────────────────────────────────────
const jar = new Map()
async function http(path, { method = 'GET', json, form, cookies = false, headers = {} } = {}) {
  const h = { 'x-forwarded-for': clientIp, ...headers }
  let body
  if (json !== undefined) {
    h['content-type'] = 'application/json'
    body = JSON.stringify(json)
  } else if (form) {
    h['content-type'] = 'application/x-www-form-urlencoded'
    body = new URLSearchParams(form).toString()
  }
  if (cookies && jar.size) h.cookie = [...jar].map(([k, v]) => `${k}=${v}`).join('; ')
  const res = await fetch(BASE + path, { method, headers: h, body, redirect: 'manual' })
  if (cookies) {
    for (const c of res.headers.getSetCookie()) {
      const [pair] = c.split(';')
      const i = pair.indexOf('=')
      jar.set(pair.slice(0, i), pair.slice(i + 1))
    }
  }
  const text = await res.text()
  let data = null
  try {
    data = JSON.parse(text)
  } catch {}
  return { status: res.status, location: res.headers.get('location') || '', text, data }
}

/** The HTML of one inbox section, found by its data-section attribute. */
const section = (html, slug) => {
  const start = html.indexOf(`data-section="${slug}"`)
  return start < 0 ? '' : html.slice(start, html.indexOf('</section>', start))
}

const localDate = (offsetDays = 0) => {
  const d = new Date(Date.now() + offsetDays * 86400000)
  return new Intl.DateTimeFormat('en-CA', { timeZone: process.env.APP_TIMEZONE || 'Africa/Nairobi' }).format(d)
}

// ── 1. Public pages and preserved links ──────────────────────────────────
console.log(`\nVerifying ${BASE} (run ${run})\n`)
for (const p of ['/', '/services/', '/portfolio/', '/about/', '/contact/', '/privacy/', '/sitemap.xml', '/robots.txt']) {
  const r = await http(p)
  check(`GET ${p} → 200`, r.status === 200, `got ${r.status}`)
}
{
  const home = await http('/')
  check('Home shows the primary call to action', home.text.includes('Tell us what you want to build or fix'))
  check('Home keeps the #contact anchor', home.text.includes('id="contact"'))
  check('Home has no invented social proof', !/50\+ trusted|pravatar|Dr\. Joseph Kiprop/.test(home.text))
  const contact = await http('/contact/')
  check('Contact page has the inquiry form', contact.text.includes('id="inquiry"') && contact.text.includes('name="problem"'))
  check('Inquiry form links to the privacy notice', contact.text.includes('href="/privacy/"'))
  const privacy = await http('/privacy/')
  check('Privacy notice covers retention, storage abroad and the ODPC', /24 months/.test(privacy.text) && /United States/.test(privacy.text) && /Data Protection Commissioner/.test(privacy.text))
  const robots = await http('/robots.txt')
  check('robots.txt disallows /inbox/', robots.text.includes('Disallow: /inbox/'))
}
{
  const list = await http('/portfolio/')
  check('Portfolio page loads and lists real work', list.status === 200 && list.text.includes('AstraCore OS') && list.text.includes('/portfolio/inquiry-inbox/'), `${list.status}`)
  check('Portfolio has none of the old fictional case studies', !/CozyCasa|Mars Fintech|Nebula Holdings|Panda Logo/i.test(list.text))
  const detail = await http('/portfolio/skillpath-academy/')
  check('Unfinished project is labelled as in development', detail.status === 200 && detail.text.includes('In development') && detail.text.includes('Designed, not yet built'))
  const missing = await http('/portfolio/not-a-project/')
  check('Unknown portfolio slug is a 404', missing.status === 404, `${missing.status}`)
  const sitemap = await http('/sitemap.xml')
  check('Sitemap lists the portfolio pages', sitemap.text.includes('/portfolio/astracore-os/'))
}
for (const [from, to] of [
  ['/portfolio/cozycasa/', '/portfolio/'],
  ['/portfolio/mars-fintech/', '/portfolio/'],
  ['/blog/', '/'],
  ['/blog/Blog_1/', '/'],
]) {
  const r = await http(from)
  check(`Retired ${from} → permanent redirect to ${to}`, r.status === 308 && new URL(r.location, BASE).pathname === to, `got ${r.status} ${r.location}`)
}

// ── 2. Server-side validation and abuse guards ────────────────────────────
{
  const r = await http('/api/inquiries/', { method: 'POST', json: {} })
  check('Empty inquiry rejected with field errors', r.status === 400 && r.data?.fieldErrors?.name && r.data?.fieldErrors?.replyTo && r.data?.fieldErrors?.problem)
  const bad = await http('/api/inquiries/', { method: 'POST', json: { name: 'Synthetic', replyTo: 'not a contact', problem: 'A long enough problem description' } })
  check('Invalid reply-to rejected', bad.status === 400 && bad.data?.fieldErrors?.replyTo)
  const bot = await http('/api/inquiries/', { method: 'POST', json: { name: 'Bot', replyTo: 'bot@example.test', problem: 'Spam spam spam spam', faxOnly: 'x' } })
  check('Honeypot submission rejected', bot.status === 400)
  const xsite = await http('/api/inquiries/', { method: 'POST', json: {}, headers: { origin: 'https://evil.example' } })
  check('Cross-site post rejected', xsite.status === 403)
  const huge = await http('/api/inquiries/', { method: 'POST', json: { name: 'x', replyTo: 'a@b.co', problem: 'y'.repeat(20000) } })
  check('Oversized body rejected', huge.status === 400)
}

// ── 3. Submit once; double-click and retry don't duplicate ───────────────
const visitor = {
  name: `Synthetic Visitor ${run}`,
  replyTo: `visitor-${run}@example.test`,
  company: 'Synthetic Co',
  serviceInterest: 'unsure',
  problem: `[verify ${run}] Orders arrive on WhatsApp and we copy them into a spreadsheet by hand.`,
}
const key = randomUUID()
const [a, b] = await Promise.all([
  http('/api/inquiries/', { method: 'POST', json: { ...visitor, submissionKey: key } }),
  http('/api/inquiries/', { method: 'POST', json: { ...visitor, submissionKey: key } }),
])
check('Double-click: both requests succeed', a.status === 201 && b.status === 201, `${a.status}/${b.status} ${a.text} ${b.text}`)
check('Double-click: same reference returned', a.data?.reference && a.data.reference === b.data?.reference)
const retry = await http('/api/inquiries/', { method: 'POST', json: { ...visitor, submissionKey: key } })
check('Retry with same key returns the same inquiry', retry.status === 201 && retry.data?.reference === a.data?.reference)
const resend = await http('/api/inquiries/', { method: 'POST', json: { ...visitor, submissionKey: randomUUID() } })
check('Re-sending the same message (new key) returns the same inquiry', resend.status === 201 && resend.data?.reference === a.data?.reference)
const noJs = await http('/api/inquiries/', { method: 'POST', form: { ...visitor, name: `NoJS ${run}`, problem: `${visitor.problem} (no-JS)` } })
check('No-JavaScript form post saves and redirects without data in the URL', noJs.status === 303 && noJs.location.endsWith('/contact/?inquiry=sent#inquiry'), `${noJs.status} ${noJs.location}`)

// ── 4. Anonymous visitors can't read or change anything ──────────────────
const anyId = randomUUID()
{
  const list = await http('/api/inbox/inquiries/')
  check('Anonymous: list inquiries → 401', list.status === 401)
  const one = await http(`/api/inbox/inquiries/${anyId}/`)
  check('Anonymous: read inquiry → 401', one.status === 401)
  const stage = await http(`/api/inbox/inquiries/${anyId}/`, { method: 'POST', json: { intent: 'stage', stage: 'accepted' } })
  check('Anonymous: change stage (JSON) → 401', stage.status === 401)
  const stageForm = await http(`/api/inbox/inquiries/${anyId}/`, { method: 'POST', form: { intent: 'stage', stage: 'accepted' } })
  check('Anonymous: change stage (form) → sent to sign-in', stageForm.status === 303 && stageForm.location.includes('/inbox/sign-in/'))
  const create = await http('/api/inbox/inquiries/', { method: 'POST', json: { ...visitor, source: 'referral' } })
  check('Anonymous: add inquiry → 401', create.status === 401)
  const page = await http('/inbox/')
  check('Anonymous: /inbox/ redirects to sign-in', [302, 303, 307].includes(page.status) && page.location.includes('/inbox/sign-in/'), `${page.status} ${page.location}`)
  check('Anonymous: inbox HTML does not leak inquiry data', !page.text.includes(visitor.name))
}

// ── 5. Staff sign-in (next-auth credentials) ─────────────────────────────
{
  const csrf = await http('/api/auth/csrf/', { cookies: true })
  const wrong = await http('/api/auth/callback/credentials/', {
    method: 'POST',
    cookies: false,
    form: { csrfToken: csrf.data?.csrfToken, email: STAFF_EMAIL, password: 'wrong-password', json: 'true' },
    headers: { cookie: [...jar].map(([k, v]) => `${k}=${v}`).join('; ') },
  })
  check('Wrong password does not sign in', !/session-token/.test(JSON.stringify(wrong)) && (wrong.data?.url || wrong.location || '').includes('error'))
  await http('/api/auth/callback/credentials/', {
    method: 'POST',
    cookies: true,
    form: { csrfToken: csrf.data?.csrfToken, email: STAFF_EMAIL, password: STAFF_PASSWORD, json: 'true' },
  })
  check('Staff sign-in sets a session', [...jar.keys()].some((k) => k.includes('session-token')))
}
const staff = (path, opts = {}) => http(path, { ...opts, cookies: true })

// ── 6. The website inquiry is in the founder inbox, exactly once ─────────
let visitorId
{
  const list = await staff('/api/inbox/inquiries/')
  const mine = (list.data?.inquiries || []).filter((i) => i.problem.includes(`[verify ${run}]`) && !i.name.startsWith('NoJS'))
  check('Inbox lists the website inquiry exactly once', mine.length === 1, `found ${mine.length}`)
  visitorId = mine[0]?.id
  check('Inquiry saved as source=website, stage=new', mine[0]?.source === 'website' && mine[0]?.stage === 'new')
  const page = await staff('/inbox/')
  check('Inbox page shows it under New inquiries', page.status === 200 && section(page.text, 'new').includes(visitor.name))
}

// ── 7. Manual referral → next action → accepted → first payment ──────────
const referral = {
  source: 'referral',
  sourceDetail: `Synthetic referrer ${run}`,
  name: `Synthetic Referral ${run}`,
  replyTo: '+254 700 000 000',
  company: 'Referral Test Ltd',
  serviceInterest: 'mpesa-integration',
  problem: `[verify ${run}] Needs M-Pesa payments matched to invoices automatically.`,
}
const refKey = randomUUID()
const [r1, r2] = await Promise.all([
  staff('/api/inbox/inquiries/', { method: 'POST', json: { ...referral, submissionKey: refKey } }),
  staff('/api/inbox/inquiries/', { method: 'POST', json: { ...referral, submissionKey: refKey } }),
])
const refId = r1.data?.id
check('Manual referral saved', r1.status === 201 && !!refId, `${r1.status} ${r1.text}`)
check('Manual add double-click creates one record', r2.data?.id === refId)

const post = (form) => staff(`/api/inbox/inquiries/${refId}/`, { method: 'POST', form })
const outcome = (r) => new URL(r.location, BASE).searchParams

{
  const yesterday = localDate(-1)
  const r = await post({ intent: 'next_action', action: 'Call to arrange discovery', due: yesterday })
  check('Next action set', outcome(r).get('ok') === 'next_action', r.location)
  const page = await staff('/inbox/')
  check('Past-due next action shows as overdue in the inbox', section(page.text, 'overdue').includes(referral.name))

  const early = await post({ intent: 'first_payment', on: localDate(0) })
  check('Payment refused before the proposal is accepted', outcome(early).get('error') === 'not_accepted')

  for (const stage of ['contacted', 'discovery', 'proposal_sent', 'accepted']) {
    const s = await post({ intent: 'stage', stage })
    check(`Stage → ${stage}`, outcome(s).get('ok') === 'stage', s.location)
  }
  const awaiting = await staff('/inbox/')
  check('Accepted opportunity listed as awaiting first payment', section(awaiting.text, 'awaiting-payment').includes(referral.name))

  const future = await post({ intent: 'first_payment', on: localDate(3) })
  check('Future payment date refused', outcome(future).get('error') === 'invalid_date')
  const paid = await post({ intent: 'first_payment', on: localDate(0), note: 'Synthetic ref ABC123' })
  check('First payment recorded', outcome(paid).get('ok') === 'first_payment')
  const again = await post({ intent: 'first_payment', on: localDate(0) })
  check('First payment cannot be recorded twice', outcome(again).get('error') === 'payment_already_recorded')
  const onboard = await post({ intent: 'onboarding', on: localDate(0) })
  check('Onboarding start recorded', outcome(onboard).get('ok') === 'onboarding')
  const note = await post({ intent: 'note', note: 'Synthetic note: kickoff booked.' })
  check('Note added', outcome(note).get('ok') === 'note')

  const after = await staff('/inbox/')
  check('No longer awaiting first payment after it is recorded', !section(after.text, 'awaiting-payment').includes(referral.name))
}

{
  const d = await staff(`/api/inbox/inquiries/${refId}/`)
  const types = (d.data?.events || []).map((e) => e.type)
  check('History preserved in order', JSON.stringify(types) === JSON.stringify([
    'created', 'next_action_set', 'stage_changed', 'stage_changed', 'stage_changed', 'stage_changed',
    'first_payment_received', 'onboarding_started', 'note',
  ]), types.join(', '))
  const pay = d.data?.events.find((e) => e.type === 'first_payment_received')
  const onb = d.data?.events.find((e) => e.type === 'onboarding_started')
  const accepted = d.data?.events.filter((e) => e.type === 'stage_changed').pop()
  check('Accepted, first payment and onboarding are distinct events', accepted?.detail.to === 'accepted' && pay && onb && pay.id !== onb.id && pay.id !== accepted.id)
  check('Payment and onboarding carry their own dates', pay?.occurredOn === localDate(0) && onb?.occurredOn === localDate(0))
  check('Record shows source, stage, payment and onboarding', d.data?.inquiry.source === 'referral' && d.data?.inquiry.stage === 'accepted' && d.data?.inquiry.firstPaymentOn && d.data?.inquiry.onboardingStartedOn)
  check('Changes attributed to the signed-in staff member', d.data?.events.slice(1).every((e) => e.actor === STAFF_EMAIL.toLowerCase()))
  const detailPage = await staff(`/inbox/${refId}/`)
  check('Detail page renders the history', detailPage.status === 200 && detailPage.text.includes('First payment received') && detailPage.text.includes('Onboarding started'))
}

// ── 8. Rate limit (fresh client address so earlier steps don't interfere) ─
{
  const ip = `10.250.${(Math.random() * 250) | 0}.${(Math.random() * 250) | 0}`
  const statuses = []
  for (let n = 0; n < 6; n++) {
    const r = await http('/api/inquiries/', {
      method: 'POST',
      headers: { 'x-forwarded-for': ip },
      json: { name: `Rate ${run} ${n}`, replyTo: `rate-${run}-${n}@example.test`, problem: `[verify ${run}] rate limit probe ${n}` },
    })
    statuses.push(r.status)
  }
  check('Sixth inquiry in ten minutes from one client is rate limited', statuses.slice(0, 5).every((s) => s === 201) && statuses[5] === 429, statuses.join(','))
}

// ── 9. Nothing personal in the server log ─────────────────────────────────
if (SERVER_LOG) {
  const log = readFileSync(SERVER_LOG, 'utf8')
  const leaked = [visitor.name, visitor.replyTo, referral.name, 'Orders arrive on WhatsApp', '+254 700 000 000'].filter((s) => log.includes(s))
  check('Server log contains no inquiry text or contact details', leaked.length === 0, leaked.join(' | '))
}

console.log(`\n${failures ? `${failures} check(s) FAILED` : 'All checks passed'} — synthetic records tagged "verify ${run}".`)
console.log(`Website inquiry: /inbox/${visitorId}/   Referral: /inbox/${refId}/`)
process.exit(failures ? 1 : 0)
