export type Solution = {
  title: string
  symptom: string
  approach: string
  departmentSlug: string
  departmentTitle: string
  tone: string
}

export const solutions: Solution[] = [
  {
    title: 'Enquiries go cold',
    symptom:
      'A lead arrives through the website, WhatsApp or a referral, then waits. Nobody is sure who replied, what was promised, or when to follow up.',
    approach:
      'We map the path from first enquiry to booked conversation, then automate the capture, routing, reminders and reporting around it.',
    departmentSlug: 'ai-automation',
    departmentTitle: 'AI and business automation',
    tone: 'var(--ac-ok)',
  },
  {
    title: 'Payments are matched by hand',
    symptom:
      'Invoices go out, M-Pesa and bank payments arrive, and someone spends hours matching each one to the right customer. The exceptions are found late.',
    approach:
      'We connect invoicing, reminders and reconciliation, list the exceptions for a person to check, and keep the summary current.',
    departmentSlug: 'managed-operations',
    departmentTitle: 'Managed business operations',
    tone: 'var(--ac-warn)',
  },
  {
    title: 'Work is spread across tools',
    symptom:
      'The same information lives in email, WhatsApp, a spreadsheet and someone’s notebook. Handoffs are dropped and reports take days.',
    approach:
      'We map the workflow, build or configure one system for the records, connect the tools that must stay, and put clear ownership around each step.',
    departmentSlug: 'software-development',
    departmentTitle: 'Software development',
    tone: 'var(--ac-accent)',
  },
  {
    title: 'The website does not earn trust',
    symptom:
      'The site is hard to update, slow on a phone, or does not explain what the business does. It is maintained by nobody in particular.',
    approach:
      'We rebuild or manage the site, fix performance and technical SEO, and keep the content current so it supports the sales conversation.',
    departmentSlug: 'website-development',
    departmentTitle: 'Website development and management',
    tone: 'var(--ac-accent)',
  },
  {
    title: 'Marketing runs in stops and starts',
    symptom:
      'A campaign runs when someone has time. Content, SEO, email and reporting are not connected, so nobody can say what produced the enquiries.',
    approach:
      'We plan the calendar, run the agreed channels, and report on what happened. Amplifyr supports the marketing department; its development remains separate.',
    departmentSlug: 'marketing-growth',
    departmentTitle: 'Marketing and growth',
    tone: 'var(--ac-accent)',
  },
]
