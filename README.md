# AstraCore Technologies — website and founder inbox

The public site for astracoretech.org, plus a private inbox where the founder
follows up inquiries and tracks each opportunity through to first payment and
onboarding.

Built with Next.js 15 (App Router), next-auth and libsql. It was originally a
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

- Public site: `/`, `/services/`, `/about/`, `/contact/`
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
| Service descriptions shown on the site | `src/content/services.ts` |
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
- On Vercel, the rate limit trusts Vercel's `x-forwarded-for`. On any other
  host, put the app behind a proxy that sets that header.

## Redirects

These routes held template content: fictional client case studies and Lorem
Ipsum blog posts. They now redirect permanently (308), configured in
`next.config.mjs`:

| Old URL | Now goes to |
| --- | --- |
| `/portfolio/` | `/services/` |
| `/portfolio/<slug>/` | `/services/` |
| `/blog/` | `/` |
| `/blog/<slug>/` | `/` |

`/#contact` still works, because the home page's inquiry section keeps that
id. `/contact/#inquiry` is the target of the primary call to action.

## Deployment

Production publication isn't automated by this repository.
`.github/workflows/ci.yml` only type-checks and builds. Before deploying to
Vercel:

1. Provision a hosted libsql database and set `DATABASE_URL` and
   `DATABASE_AUTH_TOKEN`.
2. Set `NEXTAUTH_URL` (the public origin) and a fresh `NEXTAUTH_SECRET`.
3. Create the founder's account against the production database with
   `npm run staff:add`.

The app refuses a `file:` database on Vercel, so it can't silently lose
inquiries.
