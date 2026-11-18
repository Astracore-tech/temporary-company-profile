/**
 * Portfolio — the systems AstraCore has built. Edit this file to change what
 * /portfolio/ shows. Nothing in the inquiry workflow reads it.
 *
 * House rules (same as services.ts): every entry is AstraCore's own work and
 * every statement must be true of what exists today. No client names, invented
 * results, usage figures or screenshots of real data. Use `status` to say
 * honestly where a project stands; anything planned goes in `planned`, never
 * in `built`.
 *
 * Don't rename a `slug` once published — it is the page URL.
 */

export type ProjectStatus = 'in-use' | 'internal-tool' | 'in-development' | 'live' | 'explored'

export type Project = {
  slug: string
  name: string
  /** What kind of thing it is, e.g. "Internal operations platform". */
  kind: string
  status: ProjectStatus
  /** One line for cards. */
  summary: string
  /** Who it is for and what was going wrong. */
  problem: string
  /** What the work demonstrates to a buyer, in one or two sentences. */
  proof: string
  /** The tools or process this replaces, in plain words. */
  replaces: string
  /** What exists today. */
  built: string[]
  /** Scope that is designed or explored but not built. */
  planned?: string[]
  /** How the pieces fit, in order. Rendered as a flow. */
  flow: { step: string; detail: string }[]
  /** Decisions worth explaining to a buyer, with the reason. */
  decisions: { title: string; body: string }[]
  stack: string[]
  /** Service ids from services.ts this work demonstrates — only for work that exists. */
  services: string[]
  /** Tabler icon class for the card. */
  icon: string
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  'in-use': 'In daily use by our team',
  'internal-tool': 'Built for our own sales work',
  'in-development': 'In development',
  live: 'Live on this site',
  explored: 'Earlier exploration',
}

/** Work that actually runs today. Explored and in-development work is not proof. */
export const isRunning = (status: ProjectStatus) =>
  status === 'in-use' || status === 'internal-tool' || status === 'live'

export const projects: Project[] = [
  {
    slug: 'astracore-os',
    name: 'AstraCore OS',
    kind: 'Internal operations platform',
    status: 'in-use',
    icon: 'ti-layout-dashboard',
    summary:
      'The system our own remote team runs the company on: projects and tasks, HR and leave, finance, compliance deadlines and documents, behind one sign-in.',
    problem:
      'A remote team working across several projects had its work spread over a task tool, spreadsheets, chat threads and shared folders. Approvals waited on whoever remembered them, nobody could see workload at a glance, and legal and tax deadlines depended on someone keeping a calendar up to date.',
    proof:
      'That we can build and run a multi-module system, with permissions checked on the server and a migration path from the tools a team already uses — not a front end with a database behind it.',
    replaces: 'A task tool, spreadsheets, chat threads and shared folders.',
    built: [
      'Projects and tasks with kanban boards, checklists, comments, attachments and an activity trail',
      'Two-way task sync with ClickUp, so the team could move over without a hard cut-off',
      'Role hierarchy from founder to staff, with each screen and API action checked against the role',
      'Leave requests, balances and approvals; performance reviews and bonuses',
      'Invoices with automatic numbering, and a finance summary',
      'Clients and deals pipeline',
      'Daily stand-ups, KPIs per department, and SOPs with read tracking',
      'Compliance tracker for legal and tax deadlines',
      'Guided onboarding checklist for new team members',
      'Document storage, notifications and an audit log of major actions',
      'Google sign-in alongside email and password, with password reset',
    ],
    flow: [
      { step: 'Sign in', detail: 'Short-lived access token plus a refresh cookie; Google or email.' },
      { step: 'Role check', detail: 'Every request is authorised on the server against the user’s role.' },
      { step: 'Module', detail: 'Tasks, HR, finance, compliance and the rest share one database.' },
      { step: 'Audit', detail: 'Major actions are written to an audit log as they happen.' },
      { step: 'Notify', detail: 'The people who need to act see it in their notifications.' },
    ],
    decisions: [
      {
        title: 'Sync with the old tool instead of a hard switch',
        body: 'Tasks sync both ways with ClickUp, so people could keep working while the team moved across. Replacing a tool everyone depends on in one day is how adoption fails.',
      },
      {
        title: 'Permissions enforced on the server',
        body: 'Hiding a button is not access control. Each API route checks the role itself, so finance and HR data stay with the people allowed to see them.',
      },
      {
        title: 'Built around Kenyan rules',
        body: 'Leave and compliance were set up for how a Kenyan company actually has to operate, rather than adapted from a generic HR template.',
      },
    ],
    stack: ['React 19', 'Vite', 'Node.js', 'Express 5', 'Prisma', 'PostgreSQL', 'Cloudflare R2', 'ClickUp API'],
    services: ['operational-systems', 'workflow-automation'],
  },
  {
    slug: 'market-intelligence-agent',
    name: 'Market intelligence agent',
    kind: 'Always-on automation service',
    status: 'internal-tool',
    icon: 'ti-radar',
    summary:
      'A service that watches public social posts around the clock, picks out businesses asking for help we offer, and sends a short daily list for a person to follow up.',
    problem:
      'Finding businesses that are publicly asking for a website, a system or automation meant scrolling social feeds by hand. Most posts were noise or spam, good ones were found days late, and nothing was recorded, so the same post could be looked at twice or missed entirely.',
    proof:
      'That we can run an always-on service rather than a demo: a durable queue, retries, monitoring and a person reviewing the output before anything is sent.',
    replaces: 'Manual scrolling of social feeds and notes kept in chat.',
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
    services: ['workflow-automation', 'marketing-growth'],
  },
  {
    slug: 'skillpath-academy',
    name: 'SkillPath Academy',
    kind: 'Product exploration — our own',
    status: 'explored',
    icon: 'ti-school',
    summary:
      'An earlier product exploration: an African-first platform for practical digital skills, designed around phones, slow connections, M-Pesa payment and live classes. Not a current priority.',
    problem:
      'Learners find short courses through WhatsApp, posters and referrals, then have to message someone to ask about schedules and prices, pay by M-Pesa, and wait for a person to confirm and send joining details. Every step is manual, and people drop off between them.',
    proof:
      'That we can think through a market’s real constraints — phones, slow connections and M-Pesa — and write a phased plan before committing to code.',
    replaces: 'WhatsApp questions, manual payment confirmation and hand-sent joining details.',
    built: [
      'Product specification, user roles and a phased build plan',
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
    // M-Pesa checkout is planned, not built, so it is not tagged as finance work.
    // (Explored projects are also left out of the "see it in our work" links.)
    services: ['websites-portals'],
  },
  {
    slug: 'inquiry-inbox',
    name: 'This website & founder inbox',
    kind: 'Website with a private sales pipeline',
    status: 'live',
    icon: 'ti-inbox',
    summary:
      'The site you are on, and the private inbox behind its inquiry form, where every lead is tracked from first message to first payment and onboarding.',
    problem:
      'Leads arrived through the website, WhatsApp, referrals and meetings, and lived in whichever app they came through. Follow-ups depended on memory, and nobody could see which accepted proposals were still waiting on a first payment.',
    proof:
      'That we can ship a public site and a private workflow together, with data handling designed in rather than added afterwards.',
    replaces: 'Leads scattered across the website, WhatsApp, referrals and meeting notes.',
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
        body: 'Inquiry text and contact details are never placed in a URL, analytics or an application log, only in the database Mark controls.',
      },
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'NextAuth', 'libSQL', 'Tailwind CSS'],
    services: ['websites-portals', 'operational-systems', 'workflow-automation'],
  },
]

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)

/** Running work that shows a service in practice — explored or unfinished projects don't count. */
export const projectsForService = (serviceId: string) =>
  projects.filter((p) => isRunning(p.status) && p.services.includes(serviceId))

/** Counts shown in the portfolio index. Every number is derived from the entries. */
export const portfolioStats = {
  total: projects.length,
  running: projects.filter((p) => isRunning(p.status)).length,
  inDevelopment: projects.filter((p) => p.status === 'in-development').length,
  explored: projects.filter((p) => p.status === 'explored').length,
  shipped: projects.reduce((total, p) => total + p.built.length, 0),
  planned: projects.reduce((total, p) => total + (p.planned?.length ?? 0), 0),
}
