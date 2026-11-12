/**
 * Public service offer — edit this file to change what the site says AstraCore
 * does. Nothing here is read by the inquiry workflow except `id` and `title`
 * (the optional "what are you interested in" field on the form).
 *
 * House rules for this copy: no client names, testimonials, results, prices or
 * delivery promises unless they are real and approved by the founder.
 */

export type Service = {
  /** Stable key stored with an inquiry. Do not rename once live. */
  id: string
  title: string
  /** Tabler icon class, e.g. `ti-world` */
  icon: string
  /** One line for cards. */
  summary: string
  /** The situation a buyer recognises themselves in. */
  problem: string
  /** What AstraCore would build to fix it. */
  approach: string
  /** Typical pieces of work — illustrative, not a fixed package. */
  examples: string[]
}

export const services: Service[] = [
  {
    id: 'websites-portals',
    title: 'Business websites & portals',
    icon: 'ti-world',
    summary: 'A site that explains what you do, and portals where customers or staff log in to get things done.',
    problem:
      'Customers ask the same questions on the phone every day, your website is out of date or hard to update, and anything a client needs from you — a quote, a document, an order status — means someone has to reply by hand.',
    approach:
      'We build a fast, mobile-first website you can keep current, and where it helps, a logged-in portal so customers, members or staff can submit requests, track progress and download what they need themselves.',
    examples: [
      'Company website with clear service pages and an inquiry form',
      'Customer or member portal with sign-in',
      'Online request, booking or application forms that feed your team',
    ],
  },
  {
    id: 'operational-systems',
    title: 'Custom operational systems',
    icon: 'ti-layout-dashboard',
    summary: 'Replace the spreadsheets, notebooks and WhatsApp threads that run your day-to-day operations.',
    problem:
      'Stock, orders, jobs or client records live across spreadsheets, notebooks and group chats. Nobody is sure which copy is current, reports take days to put together, and the business depends on one person remembering everything.',
    approach:
      'We map how work actually moves through your business, then build a system around it — one place for the records, clear statuses, the right access for each role, and reports you can pull without rebuilding a spreadsheet.',
    examples: [
      'Inventory, orders or job tracking',
      'Client, member or case records with role-based access',
      'Dashboards and exports for management reporting',
    ],
  },
  {
    id: 'mpesa-integration',
    title: 'M-Pesa integration',
    icon: 'ti-cash',
    summary: 'Take M-Pesa payments in your website or system and match them to the right customer automatically.',
    problem:
      'Customers pay by M-Pesa, then someone checks the statement, matches each payment to an invoice or order by hand and chases the ones that don’t line up. Mistakes are easy and slow to find.',
    approach:
      'We connect your website or system to Safaricom’s M-Pesa APIs so payments can be requested from the checkout or invoice, confirmed automatically and recorded against the right customer — with a clear trail when something needs checking.',
    examples: [
      'STK Push (Lipa na M-Pesa) checkout on a site or app',
      'Paybill / Till confirmations recorded against orders or invoices',
      'Reconciliation views for payments that need attention',
    ],
  },
  {
    id: 'workflow-automation',
    title: 'Workflow automation',
    icon: 'ti-arrows-shuffle',
    summary: 'Hand the repetitive copy-paste, reminders and follow-ups to software.',
    problem:
      'Your team spends hours re-typing the same information between forms, email, spreadsheets and other tools, sending the same reminders, and chasing approvals — and things slip when someone is busy or away.',
    approach:
      'We find the repeated steps worth automating and connect the tools you already use, so data moves once, reminders go out on time and people are only pulled in when a decision is needed.',
    examples: [
      'Form submissions routed into the right system and person',
      'Scheduled reminders and follow-ups by email or SMS',
      'Approval steps and status notifications between tools',
    ],
  },
]

/** Option shown when the visitor isn't sure which service fits. */
export const UNSURE_SERVICE = { id: 'unsure', title: 'Not sure yet' } as const

export const serviceInterestOptions = [
  ...services.map(({ id, title }) => ({ id, title })),
  UNSURE_SERVICE,
]

export const serviceTitle = (id: string | null | undefined) =>
  serviceInterestOptions.find((s) => s.id === id)?.title ?? null
