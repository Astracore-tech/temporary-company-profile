# AstraCore Technologies — website and founder inbox

The public site for astracoretech.org, plus a private inbox where the founder
follows up inquiries and tracks each opportunity through to first payment and
onboarding.

Built with Next.js 16 (App Router), React 19, next-auth and libsql. It was originally a
static export of the Venus Next.js template. It now runs as a Next.js server
app, because the inquiry form and inbox need server routes.

## Run it locally

Requires Node 22.9 or newer.

```bash
npm ci
cp .env.example .env.local      # then set NEXTAUTH_SECRET (command in the file)
npm run staff:add -- you@example.com "Your Name"   # prompts for a password
npm run dev                     # http://localhost:3000
```

For a production-like preview, use `npm run build && npm start -- -p 3100` and
set `NEXTAUTH_URL=http://localhost:3100`.

- Public site: `/`, `/services/`, `/portfolio/` (and one page per project),
  `/about/`, `/contact/`
- Founder inbox: `/inbox/` (sign in at `/inbox/sign-in/`)

Local data lives in `.data/` (git-ignored). Use synthetic records only.

## Checks

```bash
npm run typecheck
npm run build
# Against a running preview, with a preview staff account. Both create synthetic inquiries.
BASE_URL=http://localhost:3100 STAFF_EMAIL=... STAFF_PASSWORD=... npm run verify:journey
BASE_URL=http://localhost:3100 STAFF_EMAIL=... STAFF_PASSWORD=... npm run verify:phone
```

`verify:phone` runs the three phone checks in a real Chrome at phone size
(390×844). It submits an inquiry from the phone, confirms an anonymous visitor
can't reach the inbox or its API, then signs in, accepts that inquiry and
records its first payment through the inbox screens. It needs Chrome installed;
set `CHROME_PATH` if it isn't in the standard place.

`verify:journey` goes through the same HTTP entry points a browser uses. It
checks:

- the public pages, the retired-route redirects, and server-side validation;
- the home page's headline and its two actions, and that no third-party font
  or icon service is loaded;
- that the invoicing case study states up front what AstraCore OS is, labels
  its screenshots as demo data, and ends on "Discuss your invoicing workflow";
- that the honeypot and the cross-site and size limits reject bad posts;
- that a double-click or retry saves one record only;
- that anonymous visitors are refused;
- staff sign-in;
- the flow from manual referral through next action, Accepted, first payment
  and onboarding, with the history;
- the rate limit;
- optionally (`SERVER_LOG=<file>`), that the server log holds no inquiry
  content.

The script refuses to run against astracoretech.org.

## Design

- **Colours:** warm white (`#faf8f4`), near-black ink (`#17160f`) and one deep
  teal accent (`#0b5e57`), defined once as `--ac-*` variables in
  `src/app/globals.css`. The founder inbox uses the same classes.
- **Font:** Instrument Sans. `next/font` downloads it at build time and the
  site serves it itself, so visitors' browsers never contact Google.
- **Imagery:** none is decorative. No gradients, stock photos or generic
  illustrations; the only pictures are real screenshots of our own software.
- **Brand mark:** the "AstraCore Technologies" text wordmark
  (`src/components/Layout/Header/Logo`), plus a teal "A" for the browser icons
  and a matching share image. These are **placeholders**. The icon at
  `public/images/logo/logo-icon.png` has never been confirmed as approved, so
  it isn't used. Replace both once official artwork exists.

### Case-study screenshots

The AstraCore OS images in `public/images/work/` are the real AstraCore OS
screens. They were run locally against a stand-in API that served only made-up
demo records, and the browser blocked every request to `astracoretech.org`
while they were captured. No real client or financial data was involved. To
retake them, use the same approach. Never photograph the live system. Keep
the captions saying the data is demo data.

## Where things live

| What | Where |
| --- | --- |
| Service descriptions shown on the site | `src/content/services.ts` |
| Portfolio projects (`/portfolio/`) | `src/content/portfolio.ts` |
| Privacy notice (`/privacy/`) | `src/content/privacy.ts` |
| Call to action, "how it works", FAQ | `src/content/site-copy.ts` |
| Pipeline stages and sources | `src/lib/pipeline.ts` |
| Inquiry storage and rules | `src/server/inquiries.ts` |
| Public form endpoint | `src/app/api/inquiries/route.ts` |
| Inbox endpoints (staff only) | `src/app/api/inbox/` |
| Inbox pages | `src/app/inbox/` |
| Staff sign-in | `src/server/auth.ts` (next-auth credentials, `staff_users` table) |

You can edit the public copy without touching the workflow code. The workflow
reads only each service's `id` and `title`, for the optional "closest service"
field. Don't rename an `id` once inquiries reference it.

The portfolio lists only AstraCore's own work, each entry with an honest
`status`. Unfinished scope goes in `planned`, never in `built`, and unfinished
projects are left out of the "see it in our work" links on `/services/`. Don't
add client names, figures or screenshots of real data without the founder's
approval. A project's `slug` is its URL, so don't rename it once published.

## Staff accounts

```bash
npm run staff:add -- person@example.com "Name"     # create, or reset the password
npm run staff:remove -- person@example.com         # revoke access immediately
```

There is no public sign-up. Every inbox page and endpoint checks the session
on the server, and checks that the account still exists.

## Data handling

- Inquiries are stored only in AstraCore's own database (`DATABASE_URL`). That
  database isn't shared with any other system.
- Inquiry text and contact details never go into URLs, analytics or logs. The
  form only ever POSTs. The inbox's status messages in the URL are codes such
  as `?ok=note`. Errors are logged by class and code only.
- Visitor IP addresses aren't stored. A salted hash of the IP serves as the
  rate-limit key and expires after a day.
- `/privacy/` describes all of the above to visitors. Keep it true: if you add
  analytics, a form field, notifications or a new provider, update
  `src/content/privacy.ts` (and its date) first.
- The notice promises to delete inquiries that didn't lead to work within 24
  months of last contact. Nothing does this automatically, so review old
  inquiries in the inbox periodically.
- On Vercel, the rate limit trusts Vercel's `x-forwarded-for`. On any other
  host, put the app behind a proxy that sets that header.

## Redirects

These routes held template content: fictional client case studies and Lorem
Ipsum blog posts. They now redirect permanently (308), configured in
`next.config.mjs`:

| Old URL | Now goes to |
| --- | --- |
| `/portfolio/<old case-study slug>/` (13 slugs, e.g. `cozycasa`) | `/portfolio/` |
| `/blog/` | `/` |
| `/blog/<slug>/` | `/` |

`/portfolio/` itself is live again, now showing real work. The old case-study
slugs are listed one by one, because a wildcard would also redirect the new
project pages. Any other unknown `/portfolio/<slug>/` returns 404.

`/#contact` still works, because the home page's inquiry section keeps that
id. `/contact/#inquiry` is the target of the primary call to action.

## Deployment

Production publication isn't automated by this repository.
`.github/workflows/ci.yml` only type-checks and builds. The live site is
`https://www.astracoretech.org`; the bare domain redirects to it.

Production is set up as follows (done in November 2026):

1. **Database:** Turso, database `astracore-inquiries`, region AWS us-east-1.
2. **Vercel environment variables (Production only):** `DATABASE_URL`,
   `DATABASE_AUTH_TOKEN`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`,
   `NEXT_PUBLIC_SITE_URL` (all `https://www.astracoretech.org` where they're an
   address) and `APP_TIMEZONE`. The token, the secret and the database URL are
   marked Sensitive. Previews get none of them, so a preview can never write to
   the real inbox.
3. **Founder account:** created against the production database.

The same values live in a git-ignored `.env.prod.local` on the
founder's machine. That file drives these commands:

```bash
npm run db:check:prod                                    # connect, create tables, show row counts
npm run staff:add:prod -- person@example.com "Name"      # create or reset a production account
```

To rotate the sign-in secret, replace `NEXTAUTH_SECRET` in Vercel and redeploy.
Everyone is signed out.

The app refuses a `file:` database on Vercel, so it can't silently lose
inquiries.
