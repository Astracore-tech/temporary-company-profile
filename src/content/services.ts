/**
 * The five departments. `id` is the stable key stored with inquiries; do not
 * rename it. `slug` is the public URL and can be changed only with a redirect.
 *
 * House rules: no client names, testimonials, prices or results unless real
 * and approved. Unfinished or internal work is labelled as such.
 */

export type Service = {
  /** Stable key stored with an inquiry. Do not rename once live. */
  id: string
  /** Public URL segment under /services/. */
  slug: string
  title: string
  /** Tabler icon class. */
  icon: string
  /** Signal colour: accent for action, ok for running, warn for money/operations. */
  tone: string
  /** One line for cards and metadata. */
  summary: string
  /** The business problem the department solves. */
  problem: string
  /** Who the department is for. */
  whoFor: string
  /** How AstraCore approaches the work. */
  approach: string
  /** The detailed services inside the department. */
  includes: string[]
  /** The engagement, in order. */
  engagement: string[]
  /** The business benefits, without guarantees. */
  benefits: string[]
  /** What ongoing management looks like. */
  ongoing: string
  /** The operational result the department is aimed at. */
  outcome: string
  /** A related product or honest note shown on the department page. */
  productNote?: string
  /** Used only when no finished project can honestly be shown for the department. */
  proofNote?: string
}

export const services: Service[] = [
  {
    id: 'marketing-growth',
    slug: 'marketing-growth',
    title: 'Marketing and growth',
    icon: 'ti-speakerphone',
    tone: 'var(--ac-accent)',
    summary:
      'Managed marketing: strategy, campaigns, SEO, content, email and reporting — planned, executed and reported for you.',
    problem:
      'Marketing is either not running, or it is spread across a freelancer, a scheduler and a spreadsheet. Nobody can say which channel produces enquiries, and campaigns stop when the month gets busy.',
    whoFor:
      'Businesses that need consistent marketing execution but do not have an in-house marketing team.',
    approach:
      'We plan the work, run the campaigns, manage the content and report on what happened. Amplifyr supports this department; its development remains separate unless integration is explicitly approved.',
    includes: [
      'Digital marketing strategy and execution',
      'Social media management',
      'Social media advertising campaigns',
      'Search engine optimization (SEO)',
      'Content marketing and content creation',
      'Short-form video marketing',
      'Creator and influencer marketing',
      'Email marketing campaigns',
      'Lead generation campaigns',
      'Marketing automation',
      'Conversion optimization',
      'Marketing analytics and performance reporting',
      'Campaign management and optimization',
      'Brand positioning and digital strategy',
    ],
    engagement: [
      'Assessment: channels, offer, audience and what has been tried.',
      'Plan: priorities, content and a campaign calendar.',
      'Execution: campaigns, content, SEO, email and reporting.',
      'Review: a monthly performance review and the next actions.',
    ],
    benefits: [
      'Consistent marketing instead of stop-start campaigns.',
      'Clear reporting on what ran and what it produced.',
      'One team responsible for execution.',
      'A content and campaign rhythm the business can keep.',
    ],
    ongoing: 'Managed monthly, with agreed channels, deliverables and reporting.',
    outcome: 'Consistent execution and clearer reporting.',
    productNote:
      'Amplifyr is our marketing product. Its development remains separate unless integration is explicitly approved.',
  },
  {
    id: 'workflow-automation',
    slug: 'ai-automation',
    title: 'AI and business automation',
    icon: 'ti-robot',
    tone: 'var(--ac-ok)',
    summary:
      'AI assistants and workflow automation for leads, email, WhatsApp, CRM, scheduling, documents and finance.',
    problem:
      'The team retypes the same information between email, WhatsApp, spreadsheets and the CRM. Follow-ups depend on memory, and the work piles up when someone is away.',
    whoFor:
      'Businesses with repetitive admin, slow follow-up, or tools that do not talk to each other.',
    approach:
      'We assess the process, build or configure the automation, test it with the people who use it, then monitor and maintain it. AI output is reviewed by a person where the decision matters.',
    includes: [
      'Business process automation',
      'AI assistants and agents',
      'Customer service automation',
      'Email response automation',
      'WhatsApp business automation',
      'CRM automation',
      'Lead qualification and follow-up automation',
      'Appointment and scheduling automation',
      'Document processing automation',
      'AI-powered reporting',
      'Data extraction and processing',
      'Internal workflow automation',
      'Finance and invoicing automation',
      'Application and API integrations',
      'Custom AI workflow development',
    ],
    engagement: [
      'Assessment: map the current process and the exceptions.',
      'Build: configure the automation and the integrations.',
      'Test: run it with the team and a human review step.',
      'Manage: monitor, maintain and improve it.',
    ],
    benefits: [
      'Less repetitive copy-paste and chasing.',
      'Faster follow-up and fewer dropped handoffs.',
      'Clear ownership and an audit trail.',
      'A person still reviews the decisions that matter.',
    ],
    ongoing: 'Monitoring, maintenance and optimisation, monthly where agreed.',
    outcome: 'Less repetitive work and faster follow-up.',
  },
  {
    id: 'operational-systems',
    slug: 'software-development',
    title: 'Software development',
    icon: 'ti-code',
    tone: 'var(--ac-accent)',
    summary:
      'Custom business software, CRMs, inventory, job tracking, dashboards, portals, databases and integrations.',
    problem:
      'Records live across spreadsheets, notebooks and chat threads. Nobody is sure which copy is current, reports take days to assemble, and the business depends on one person remembering everything.',
    whoFor:
      'Businesses that have outgrown spreadsheets or need a system built around how they actually work.',
    approach:
      'We assess requirements, design the data and permissions, build and test the system, deploy it, then support it. Existing systems can be modernised rather than replaced outright.',
    includes: [
      'Custom business software',
      'Enterprise and internal applications',
      'CRM systems',
      'Inventory management systems',
      'Job and project tracking systems',
      'Business dashboards',
      'Customer and employee portals',
      'Database development',
      'API development',
      'Software integrations',
      'Business management platforms',
      'Existing software modernization',
      'Software maintenance and support',
    ],
    engagement: [
      'Requirements: map the workflow, records and exceptions.',
      'Build: the application, database, roles and integrations.',
      'Test and deploy: real workflows, access checks and handover.',
      'Support: maintenance and changes after launch.',
    ],
    benefits: [
      'One place for the records.',
      'Clear roles and permissions.',
      'Reports without rebuilding a spreadsheet.',
      'A system that matches the work, not a template.',
    ],
    ongoing: 'Maintenance and support, or ongoing development where agreed.',
    outcome: 'One place for the records and clearer reporting.',
  },
  {
    id: 'websites-portals',
    slug: 'website-development',
    title: 'Website development and management',
    icon: 'ti-world',
    tone: 'var(--ac-accent)',
    summary:
      'Business websites, e-commerce, web applications, landing pages, maintenance, performance and technical SEO.',
    problem:
      'The website is hard to update, slow on a phone, or does not explain what the business does. Maintenance is whoever built it last, if anyone.',
    whoFor:
      'Businesses that need a credible website, or a site that is actively maintained rather than left to decay.',
    approach:
      'We design and build the site, make it fast and accessible, set up technical SEO and analytics, then maintain it. Existing sites can be redesigned without losing working content.',
    includes: [
      'Business website development',
      'Corporate websites',
      'E-commerce websites',
      'Web applications',
      'Landing page development',
      'Website redesign',
      'Website maintenance',
      'Website performance optimization',
      'Technical SEO implementation',
      'Website security maintenance',
      'Hosting and domain management',
      'Website analytics integration',
      'Website content updates',
      'Website accessibility improvements',
    ],
    engagement: [
      'Scope: pages, content, integrations and the commercial goal.',
      'Build: design, development and content.',
      'Launch: performance, SEO, analytics and checks.',
      'Manage: updates, security, performance and reporting.',
    ],
    benefits: [
      'A site that explains the business clearly.',
      'Faster mobile pages and cleaner technical SEO.',
      'A site that can be updated without a rebuild.',
      'One team responsible for maintenance.',
    ],
    ongoing: 'Hosting, maintenance, content updates and monitoring where agreed.',
    outcome: 'A credible site that stays current.',
  },
  {
    id: 'mpesa-integration',
    slug: 'managed-operations',
    title: 'Managed business operations',
    icon: 'ti-settings',
    tone: 'var(--ac-warn)',
    summary:
      'Ongoing management of agreed workflows: communications, CRM admin, follow-up, reporting, monitoring and finance administration.',
    problem:
      'The systems exist, but nobody owns the daily operation. Inquiries wait, follow-ups slip, reports are late, and the team is pulled back into admin.',
    whoFor:
      'Businesses that want the workflow run for them, not another tool to manage.',
    approach:
      'We agree the responsibilities, service levels and reporting, then run the agreed workflows and monitor the systems. This can include finance and administration, including M-Pesa reconciliation where appropriate.',
    includes: [
      'Managed customer communication workflows',
      'Email and inquiry management',
      'Customer support operations',
      'CRM administration',
      'Lead follow-up management',
      'Appointment coordination',
      'Business workflow monitoring',
      'Administrative process management',
      'Operational reporting',
      'Automation monitoring and maintenance',
      'Business systems management',
      'Continuous process improvement',
    ],
    engagement: [
      'Agree: responsibilities, service levels and reporting.',
      'Set up: access, checklists and monitoring.',
      'Run: the agreed daily and weekly work.',
      'Report: a regular operating review.',
    ],
    benefits: [
      'The workflow has an owner.',
      'Fewer missed follow-ups and late reports.',
      'Clear service levels and reporting.',
      'The team stays on the work, not the admin.',
    ],
    ongoing:
      'A monthly contract with defined responsibilities, service levels and reporting.',
    outcome: 'An operating rhythm that does not depend on memory.',
    proofNote:
      'Managed operations are delivered around the systems we build. No standalone client case study is shown yet.',
  },
]

/** Option shown when the visitor isn't sure which department fits. */
export const UNSURE_SERVICE = { id: 'unsure', title: 'Not sure yet' } as const

export const serviceInterestOptions = [
  ...services.map(({ id, title }) => ({ id, title })),
  UNSURE_SERVICE,
]

export const serviceTitle = (id: string | null | undefined) =>
  serviceInterestOptions.find((s) => s.id === id)?.title ?? null

/** The signal colour for a department, falling back to the main accent. */
export const serviceTone = (id: string | null | undefined) =>
  services.find((s) => s.id === id)?.tone ?? 'var(--ac-accent)'

export const departmentBySlug = (slug: string) => services.find((s) => s.slug === slug)

export const departmentPath = (department: Pick<Service, 'slug'>) =>
  `/services/${department.slug}`
