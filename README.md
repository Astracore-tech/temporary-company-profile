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

- Public site: `/`, `/services/`, one page per department under
  `/services/<department>/`, `/solutions/`, `/portfolio/` (and one page per
  project), `/insights/`, `/about/`, `/contact/`
- Founder inbox: `/inbox/` (sign in at `/inbox/sign-in/`)

Local data lives in `.data/` (git-ignored). Use synthetic records only.

## Checks

```bash
npm run typecheck
npm run build
# Against a running preview, with a preview staff account. It creates synthetic inquiries.
BASE_URL=http://localhost:3100 STAFF_EMAIL=... STAFF_PASSWORD=... npm run verify:journey
```

`verify:journey` goes through the same HTTP entry points a browser uses. It
checks:

- the public pages, the retired-route redirects, and server-side validation;
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

## Where things live

| What | Where |
| --- | --- |
| Five departments and their service lists | `src/content/services.ts` |
| Department pages (`/services/<slug>/`) | `src/app/(site)/services/[slug]/page.tsx` |
| Solutions by symptom (`/solutions/`) | `src/content/solutions.ts` |
| Insights notes (`/insights/`) | `src/content/insights.ts` |
| Portfolio projects (`/portfolio/`) | `src/content/portfolio.ts` |
| Privacy notice (`/privacy/`) | `src/content/privacy.ts` |
| Call to action, "how it works", FAQ, about facts and tools | `src/content/site-copy.ts` |
| Interactive hero console | `src/components/Home/Hero/SystemPreview.tsx` |
| Motion primitives (count-up, reveal, flow line) | `src/components/Common/`, `src/components/Portfolio/FlowRail.tsx` |
| Pipeline stages and sources | `src/lib/pipeline.ts` |
| Inquiry storage and rules | `src/server/inquiries.ts` |
| Public form endpoint | `src/app/api/inquiries/route.ts` |
| Inbox endpoints (staff only) | `src/app/api/inbox/` |
| Inbox pages | `src/app/inbox/` |
| Staff sign-in | `src/server/auth.ts` (next-auth credentials, `staff_users` table) |

You can edit the public copy without touching the workflow code. The workflow
reads only each department's `id` and `title`, for the optional "closest
department" field. Don't rename an `id` once inquiries reference it; change
the title and copy instead. The `slug` is the public URL.

The portfolio lists only AstraCore's own work, each entry with an honest
`status`. Unfinished scope goes in `planned`, never in `built`. Use
`in-development` for active work and `explored` for earlier product
exploration; both are left out of the proof sections on `/portfolio/` and the
department pages. Each entry also states what the work proves (`proof`) and
what it replaces (`replaces`), so `/portfolio/` reads as evidence rather than a
gallery. The page maps every department to the projects that can honestly
prove it; a department with no shipped work says so instead of borrowing an
unfinished project. Don't add client names, figures or screenshots of real data
without the founder's approval. A project's `slug` is its URL, so don't rename
it once published.

## SEO and security

- Every page has a unique title, description, canonical URL and Open Graph
  metadata. `pageMetadata` adds the trailing slash that `next.config` uses.
- `/sitemap.xml` includes the home, services, departments, solutions, work,
  insights, about, contact and privacy pages.
- `/robots.txt` allows public pages and blocks `/api/` and `/inbox/`.
- Structured data covers the organization, local business, website, service
  catalog, each department and its visible services, each project and the
  insights notes. It is only added where the content is visible.
- `/llms.txt` is a short public summary for AI crawlers. It is not a ranking
  guarantee and does not replace the HTML pages.
- `next.config.mjs` sends `X-Content-Type-Options`, `X-Frame-Options`,
  `Permissions-Policy` and HSTS. The inbox adds `noindex`, `no-store` and
  `no-referrer`.
- `NEXT_PUBLIC_SITE_URL` drives canonicals, Open Graph URLs and the sitemap, so
  set it to `https://www.astracoretech.org` in production.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and
  `NEXT_PUBLIC_BING_SITE_VERIFICATION` add the verification meta tags when set.
- Syne, Inter and IBM Plex Mono are self-hosted through `next/font`. The Tabler
  icon webfont still comes from jsDelivr; a local subset is the next performance
  improvement.
- `/our-work/` redirects to `/portfolio/`; `/portfolio/` stays the single
  canonical work index.

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
| `/our-work/` | `/portfolio/` |

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
