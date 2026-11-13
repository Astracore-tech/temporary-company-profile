/**
 * Portfolio — the systems AstraCore has built. Edit this file to change what
 * /portfolio/ and each case study show. Nothing in the inquiry workflow reads it.
 *
 * House rules: every entry is AstraCore's own work and every statement must be
 * true of what exists today. No client names, invented results or usage
 * figures. Screenshots must be real software showing made-up demo data only —
 * never real client or financial records — and say so in their caption.
 * Unfinished scope goes in `planned`, never in `built`.
 *
 * Don't rename a `slug` once published: it is the page URL people share.
 */

export type ProjectStatus = 'in-use' | 'internal-tool' | 'in-development' | 'live'

export type Evidence = {
  /** Path under /public. */
  src: string
  width: number
  height: number
  alt: string
  /** Shown under the image. Must say whether the data is real or demo. */
  caption: string
}

export type Project = {
  slug: string
  name: string
  /** What kind of thing it is, e.g. "Internal operations platform". */
  kind: string
  status: ProjectStatus
  /** Shown first on the home page and at the top of /portfolio/. */
  featured?: boolean
  /** One line for cards. */
  summary: string
  /** Case-study title; defaults to `name`. */
  headline?: string
  /** First-screen paragraph on the case study; defaults to `summary`. */
  lede?: string
  /** Up to four short facts shown on the first screen of the case study. */
  highlights?: string[]
  /** The situation this kind of system fixes. */
  problem: string
  /** What exists today. */
  built: string[]
  /** Designed but not finished — only for in-development work. */
  planned?: string[]
  /** How the pieces fit, in order. */
  flow: { step: string; detail: string }[]
  /** Decisions worth explaining to a buyer, with the reason. */
  decisions: { title: string; body: string }[]
  /** Real screenshots, demo data only. Leave empty rather than fake one. */
  evidence?: Evidence[]
  stack: string[]
  /** Service ids from services.ts this work demonstrates — only for work that exists. */
  services: string[]
  /** Closing call to action on the case study; links to the inquiry form. */
  ctaLabel?: string
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  'in-use': 'In daily use by our team',
  'internal-tool': 'Built for our own sales work',
  'in-development': 'In development',
  live: 'Live on this site',
}

export const projects: Project[] = [
  {
    slug: 'astracore-os',
    name: 'AstraCore OS',
    kind: 'Internal operations platform',
    status: 'in-use',
    featured: true,
    summary:
      'Our own internal tool, with automatically numbered invoices and a finance summary alongside projects, HR, compliance and documents.',
    headline: 'Invoicing and finance inside AstraCore OS',
    lede:
      'AstraCore OS is our own internal tool: the system our team runs the company on. It numbers every invoice automatically and rolls invoices up into a finance summary, so what has been billed, collected and is overdue is visible at a glance.',
    highlights: [
      'Invoice numbers assigned automatically, in sequence: INV-2026-0001, 0002…',
      'Draft, sent, paid, overdue and cancelled, with totals for each',
      'Finance summary of paid revenue and totals by invoice status',
      'Visible only to the founder and COO, checked on the server',
    ],
    problem:
      'A business needs one trustworthy record of what it has billed and what it is owed. When invoices live in separate documents and a spreadsheet, numbers get skipped or repeated, statuses go stale, and answering “what is overdue?” means going through every file by hand.',
    built: [
      'Invoices with client, services, amount, currency, issue and due dates, and notes',
      'Automatic invoice numbering, with duplicates rejected by the database',
      'Status filters and running totals: total value, collected, outstanding and overdue',
      'Finance summary: paid revenue and totals by invoice status',
      'Invoice and finance screens restricted to the founder and COO',
      'Projects and tasks with kanban boards, checklists, comments and attachments',
      'Leave, performance reviews, KPIs, stand-ups and SOPs with read tracking',
      'Compliance tracker for legal and tax deadlines',
      'Document storage, notifications and an audit log of major actions',
      'Google sign-in alongside email and password, with password reset',
    ],
    flow: [
      { step: 'Create', detail: 'Enter the client, services, amount and due date.' },
      { step: 'Number', detail: 'The system assigns the next invoice number.' },
      { step: 'Track', detail: 'Move it from draft to sent, then paid or overdue.' },
      { step: 'Summarise', detail: 'Totals by status update as invoices change.' },
      { step: 'Restrict', detail: 'Only the founder and COO can open these screens.' },
    ],
    decisions: [
      {
        title: 'Numbers are generated, never typed',
        body: 'The system assigns each invoice number when the invoice is created, and the database refuses a duplicate. Nobody has to remember the last number used.',
      },
      {
        title: 'Status drives the totals',
        body: 'Collected, outstanding and overdue are calculated from each invoice’s status, so the summary can’t drift away from the invoices themselves.',
      },
      {
        title: 'Permissions enforced on the server',
        body: 'Hiding a menu item is not access control. The invoice and finance endpoints check the role on every request, so financial data stays with the people allowed to see it.',
      },
    ],
    evidence: [
      {
        src: '/images/work/astracore-os-invoices.webp',
        width: 2120,
        height: 1520,
        alt: 'AstraCore OS invoices screen: totals for total value, collected, outstanding and overdue, status filters, and a table of six invoices numbered INV-2026-0001 to INV-2026-0006.',
        caption:
          'The real AstraCore OS invoices screen, run on our own machine with made-up demo data. The clients and amounts are not real.',
      },
      {
        src: '/images/work/astracore-os-revenue-by-status.webp',
        width: 1036,
        height: 480,
        alt: 'AstraCore OS finance summary: revenue by status — draft, sent, overdue and paid.',
        caption: 'Finance summary from the same demo data: totals by invoice status.',
      },
    ],
    stack: ['React 19', 'Vite', 'Node.js', 'Express 5', 'Prisma', 'PostgreSQL', 'Cloudflare R2'],
    services: ['operational-systems', 'workflow-automation'],
    ctaLabel: 'Discuss your invoicing workflow',
  },
  {
    slug: 'inquiry-inbox',
    name: 'This website & founder inbox',
    kind: 'Website with a private sales pipeline',
    status: 'live',
    summary:
      'The site you are on, and the private inbox behind its inquiry form, where every lead is tracked from first message to first payment and onboarding.',
    problem:
      'Leads arrive through a website, WhatsApp, referrals and meetings, and end up in whichever app they came through. Follow-ups depend on memory, and nobody can see which accepted proposals are still waiting on a first payment.',
    built: [
      'A short, mobile-friendly inquiry form with checks done on the server',
      'Protection against double-clicks, retries and resubmits, so one inquiry is saved once',
      'Rate limits and spam filtering, without storing visitors’ IP addresses',
      'Success shown only after the inquiry is saved; on failure the visitor keeps what they typed and can retry',
      'A private inbox with sign-in checked on the server for every page and action',
      'Leads added by hand from referrals, meetings or WhatsApp, with their source',
      'Pipeline stages, next actions with due dates, and overdue items shown first',
      'First payment and onboarding recorded as separate dated events, with a full history',
    ],
    flow: [
      { step: 'Inquiry', detail: 'A visitor describes the problem; the form posts to the server only.' },
      { step: 'Checks', detail: 'Validation, duplicate detection and abuse limits.' },
      { step: 'Saved', detail: 'Stored first; only then does the visitor see a reference.' },
      { step: 'Follow up', detail: 'Next action and due date; overdue items rise to the top.' },
      { step: 'Accepted', detail: 'First payment and onboarding tracked as dated events.' },
    ],
    decisions: [
      {
        title: 'Never show success before the save',
        body: 'A visitor who sees “sent” assumes someone has it. The confirmation appears only after the database confirms the write.',
      },
      {
        title: 'Personal details stay out of URLs and logs',
        body: 'Inquiry text and contact details are never placed in a URL, analytics or an application log, only in the database the founder controls.',
      },
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'NextAuth', 'libSQL', 'Tailwind CSS'],
    services: ['websites-portals', 'operational-systems'],
  },
  {
    slug: 'market-intelligence-agent',
    name: 'Market intelligence agent',
    kind: 'Always-on automation service',
    status: 'internal-tool',
    summary:
      'A service that watches public social posts around the clock, picks out businesses asking for help we offer, and sends a short daily list for a person to follow up.',
    problem:
      'Finding businesses that are publicly asking for a website, a system or automation means scrolling social feeds by hand. Most posts are noise or spam, good ones are found days late, and nothing is recorded, so the same post can be looked at twice or missed entirely.',
    built: [
      'A 24/7 listener on the public Bluesky feed, with a cheap pre-filter in front of the expensive steps',
      'A persistent work queue, so nothing is lost on a restart and every post is processed once',
      'Classification for spam, self-promotion, duplicates, buying intent, region, industry, technology and which of our services fits',
      'A dead-letter queue: posts that keep failing are kept for inspection, never silently dropped',
      'Telegram alerts for the strongest matches, capped per day so they stay worth reading',
      'A daily report of the top five, draft replies for a person to review, and a spreadsheet export',
      'Health, metrics and stats endpoints, so an outside monitor can raise an alert if the service stops',
      'Packaged with Docker, with a scheduled daily job and automatic restarts',
    ],
    flow: [
      { step: 'Listen', detail: 'Public posts arrive from the feed connector.' },
      { step: 'Pre-filter', detail: 'Obvious noise is dropped before any heavier processing.' },
      { step: 'Queue', detail: 'Accepted posts are stored before work starts, so a crash loses nothing.' },
      { step: 'Classify', detail: 'Spam, duplicates, intent, region, industry and service fit.' },
      { step: 'Report', detail: 'Capped alerts during the day; a top-five list each morning.' },
    ],
    decisions: [
      {
        title: 'A person stays in the loop',
        body: 'The agent drafts replies but never posts them. Someone reads the shortlist and decides who to contact and how.',
      },
      {
        title: 'Built to be left running',
        body: 'Structured logs, a health check, graceful shutdown and versioned database migrations: the dull parts that let a service run for months without anyone watching it.',
      },
      {
        title: 'One connector interface',
        body: 'The feed sits behind a small connector interface, so other public sources can be added without touching the classification pipeline.',
      },
    ],
    stack: ['Python', 'SQLite', 'Docker', 'Prometheus metrics', 'Telegram Bot API', 'Activepieces'],
    services: ['workflow-automation'],
  },
  {
    slug: 'skillpath-academy',
    name: 'SkillPath Academy',
    kind: 'Learning platform — our own product',
    status: 'in-development',
    summary:
      'An African-first platform for practical digital skills that we are building: conversational onboarding, booking, M-Pesa payment and live classes, designed for phones on slow connections.',
    problem:
      'Learners find short courses through WhatsApp, posters and referrals, then have to message someone to ask about schedules and prices, pay by M-Pesa, and wait for a person to confirm and send joining details. Every step is manual, and people drop off between them.',
    built: [
      'Product specification, user roles and a phased 90-day build plan',
      'Project tracking for the build inside AstraCore OS',
    ],
    planned: [
      'Conversational onboarding that answers questions, recommends a course and books a session',
      'M-Pesa and PayPal checkout, with confirmation sent automatically',
      'Student dashboard with live classes, recordings, resources, certificates and progress',
      'Instructor tools for schedules, attendance and recordings, and an admin view with staff approval',
      'Reminders and confirmations over WhatsApp, Telegram and email',
      'Mobile-first pages kept light for low-bandwidth connections',
    ],
    flow: [
      { step: 'Discover', detail: 'A QR code, WhatsApp link, referral or post.' },
      { step: 'Ask', detail: 'Questions answered in conversation, with a hand-off to a person.' },
      { step: 'Book & pay', detail: 'Pick a session and pay by M-Pesa or card.' },
      { step: 'Confirm', detail: 'Account, confirmation and joining details sent automatically.' },
      { step: 'Learn', detail: 'Live classes, recordings, reminders and a certificate at the end.' },
    ],
    decisions: [
      {
        title: 'Phones and slow connections first',
        body: 'Most learners will arrive on a phone, often on mobile data. Pages are planned to stay light and keep working when the connection is poor.',
      },
      {
        title: 'Every manual step is a drop-off point',
        body: 'The plan targets the gaps between asking, paying and joining, because that is where people are lost today.',
      },
    ],
    stack: ['Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'M-Pesa', 'n8n'],
    // M-Pesa checkout is planned, not built, so it is not tagged as M-Pesa work yet.
    // (Unfinished projects are also left out of the "see it in our work" links.)
    services: ['websites-portals', 'workflow-automation'],
  },
]

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)

export const featuredProject = projects.find((p) => p.featured) ?? projects[0]

/** Finished work that shows a service in practice — unfinished projects don't count as proof. */
export const projectsForService = (serviceId: string) =>
  projects.filter((p) => p.status !== 'in-development' && p.services.includes(serviceId))
