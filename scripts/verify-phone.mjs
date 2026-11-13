#!/usr/bin/env node
/**
 * The three phone checks, run in a real Chrome at phone size (390×844, touch):
 *
 *   1. Submit from a phone — the inquiry form on /contact/ saves and shows a reference.
 *   2. Block anonymous access — /inbox/ and the inbox API refuse a visitor who isn't signed in.
 *   3. Mark first payment — sign in, accept that inquiry and record its first payment
 *      through the inbox screens; the history shows it.
 *
 *   BASE_URL=http://localhost:3100 STAFF_EMAIL=... STAFF_PASSWORD=... npm run verify:phone
 *
 * Uses Chrome's DevTools protocol directly, so it needs no test framework.
 * Set CHROME_PATH if Chrome isn't in a standard location. It creates a
 * synthetic inquiry, so it refuses to run against the live site.
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

const BASE = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '')
const { STAFF_EMAIL, STAFF_PASSWORD } = process.env
if (/astracoretech\.org/.test(BASE)) {
  console.error('Refusing to create test records on the live site. Point BASE_URL at a local preview.')
  process.exit(1)
}
if (!STAFF_EMAIL || !STAFF_PASSWORD) {
  console.error('Set STAFF_EMAIL and STAFF_PASSWORD for a preview staff account.')
  process.exit(1)
}

const CHROME =
  process.env.CHROME_PATH ||
  [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].find((p) => existsSync(p))
if (!CHROME) {
  console.error('Chrome not found. Set CHROME_PATH.')
  process.exit(1)
}

let failures = 0
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${!ok && detail ? `\n      ${detail}` : ''}`)
  if (!ok) failures++
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

// ── A fresh Chrome profile, so no earlier session leaks in ─────────────────
const profile = mkdtempSync(path.join(tmpdir(), 'astracore-phone-'))
const PORT = 9400 + Math.floor(Math.random() * 400)
const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', 'about:blank',
], { stdio: 'ignore' })

let targets
for (let i = 0; i < 60 && !targets; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json() } catch { await wait(200) }
}
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl)
await new Promise((r) => ws.addEventListener('open', r, { once: true }))
let seq = 0
const pending = new Map()
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) }
})
const send = (method, params = {}) =>
  new Promise((resolve) => { const id = ++seq; pending.set(id, resolve); ws.send(JSON.stringify({ id, method, params })) })
const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
  return r.result?.result?.value
}
const until = async (expression, timeout = 20000) => {
  for (const end = Date.now() + timeout; Date.now() < end; await wait(150)) {
    if (await evaluate(expression).catch(() => false)) return true
  }
  return false
}
const go = async (url) => {
  await send('Page.navigate', { url })
  await until(`document.readyState === 'complete'`)
  await wait(500) // hydration
}
// Set a field the way typing does, so React sees the change.
const fill = (selector, value) =>
  evaluate(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)})
    const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : el instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, ${JSON.stringify(value)})
    el.dispatchEvent(new Event(el instanceof HTMLSelectElement ? 'change' : 'input', { bubbles: true }))
  })()`)
// Press a real point on the screen where a thumb would. Headless Chrome delivers
// touch events but never turns them into a click, so the press is sent as a
// pointer click at those coordinates. Chrome hit-tests it like a tap, so it
// still fails if the control is off-screen or covered by something else.
const tap = async (selector) => {
  // The site scrolls smoothly; jump instead, then measure once it has settled.
  await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({ block: 'center', behavior: 'instant' })`)
  await wait(200)
  const box = await evaluate(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)})
    const r = el.getBoundingClientRect()
    const x = r.left + r.width / 2, y = r.top + r.height / 2
    const hit = document.elementFromPoint(x, y)
    return { x, y, reachable: !!hit && (hit === el || el.contains(hit)) }
  })()`)
  if (!box?.reachable) throw new Error(`${selector} is not reachable by a tap at its centre`)
  for (const type of ['mousePressed', 'mouseReleased']) {
    await send('Input.dispatchMouseEvent', { type, x: box.x, y: box.y, button: 'left', clickCount: 1 })
  }
}
const formWith = (intent) => `form:has(input[name=intent][value=${intent}])`

try {
  await send('Page.enable')
  await send('Runtime.enable')
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 3, mobile: true })
  await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 })
  const marker = `phone-${Date.now().toString(36)}`
  const name = `Phone Test ${marker}`
  console.log(`\nPhone checks against ${BASE} (synthetic record "${name}")\n`)

  // ── 1. Submit from a phone ────────────────────────────────────────────────
  await go(`${BASE}/contact/`)
  check('Contact page fits a phone screen (no sideways scroll)', (await evaluate('document.documentElement.scrollWidth')) <= 390)
  await fill('#inq-name', name)
  await fill('#inq-replyTo', '+254 700 000 000')
  await fill('#inq-problem', `[${marker}] We issue invoices from Word and track payments in a spreadsheet.`)
  await tap('#inquiry button[type=submit]')
  const saved = await until(`document.querySelector('#inquiry [role=status]')?.textContent.includes('reference')`)
  check('1. Inquiry submitted from a phone is saved and shows a reference', saved,
    await evaluate(`document.querySelector('#inquiry [role=alert]')?.textContent || ''`))

  // ── 2. Block anonymous access ─────────────────────────────────────────────
  await go(`${BASE}/inbox/`)
  check('2a. Anonymous visitor to /inbox/ is sent to sign-in', (await evaluate('location.pathname')) === '/inbox/sign-in/')
  check('2b. Sign-in page shows no inquiry data', !(await evaluate(`document.body.innerText.includes(${JSON.stringify(marker)})`)))
  const api = await evaluate(`fetch('/api/inbox/inquiries/', { headers: { accept: 'application/json' } }).then(r => r.status)`)
  check('2c. Inbox API refuses an anonymous request', api === 401, `status ${api}`)

  // ── 3. Mark first payment ─────────────────────────────────────────────────
  await fill('#email', STAFF_EMAIL)
  await fill('#password', STAFF_PASSWORD)
  await tap('form button[type=submit]')
  check('Founder signs in on the phone', await until(`location.pathname === '/inbox/' && !!document.querySelector('[data-section=new]')`))
  const opened = await evaluate(`(() => {
    const a = [...document.querySelectorAll('[data-section=new] a')].find(a => a.innerText.includes(${JSON.stringify(name)}))
    if (a) { a.click(); return true } return false
  })()`)
  check('The phone inquiry is in the inbox under New', opened)
  await until(`!!document.querySelector(${JSON.stringify(formWith('stage'))})`)
  await fill(`${formWith('stage')} select[name=stage]`, 'accepted')
  await tap(`${formWith('stage')} button[type=submit]`)
  check('Stage set to Accepted', await until(`location.search.includes('ok=stage')`),
    await evaluate(`location.pathname + location.search + ' | body: ' + document.body.innerText.slice(0, 300)`))
  const payForm = await until(`!!document.querySelector(${JSON.stringify(formWith('first_payment'))})`)
  check('First-payment form appears once accepted', payForm)
  await tap(`${formWith('first_payment')} button[type=submit]`)
  check('3. First payment recorded from the phone', await until(`location.search.includes('ok=first_payment')`))
  check('History shows "First payment received"', await evaluate(`document.body.innerText.includes('First payment received')`))
  check('Inbox detail fits a phone screen', (await evaluate('document.documentElement.scrollWidth')) <= 390)
} catch (err) {
  check('Phone checks ran to completion', false, err?.message)
} finally {
  ws.close()
  chrome.kill()
  await wait(300)
  try { rmSync(profile, { recursive: true, force: true }) } catch {}
}

console.log(`\n${failures ? `${failures} FAILED` : 'All phone checks passed'}`)
process.exit(failures ? 1 : 0)
