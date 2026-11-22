export type Insight = {
  slug: string
  title: string
  date: string
  readingTime: string
  summary: string
  sections: { heading: string; body: string }[]
  related?: { label: string; href: string }[]
}

export const insights: Insight[] = [
  {
    slug: 'what-managed-means',
    title: 'What “managed” actually means',
    date: '2026-11-18',
    readingTime: '3 min',
    summary:
      'A managed service is not a support ticket and a monthly invoice. It is an agreed set of responsibilities, a service level and a report you can read.',
    sections: [
      {
        heading: 'The work has an owner',
        body: 'A managed workflow needs a named owner on our side and a named contact on yours. The agreement should say which enquiries, payments, reports or systems we are responsible for, the hours we cover, and what happens when something is urgent. “We will help where we can” is not a service level.',
      },
      {
        heading: 'Service levels are written down',
        body: 'The useful details are boring: how quickly an enquiry is acknowledged, how often payments are reconciled, when the report arrives, how exceptions are escalated and what is excluded. These are the parts that stop a recurring contract from becoming an argument about expectations.',
      },
      {
        heading: 'The report is the proof',
        body: 'Each period should produce a short record of what ran, what was missed, what changed and what needs a decision. The report is not a marketing deck. It is the evidence that the work happened, and it is where the next improvement should come from.',
      },
      {
        heading: 'What it is not',
        body: 'Managed does not mean unlimited. It does not replace the client’s decisions, and it does not come with a performance guarantee we cannot control. It means the agreed work has an owner, a service level and a review. The scope should be small enough to run well before it gets broad.',
      },
    ],
    related: [
      { label: 'Managed business operations', href: '/services/managed-operations/' },
      { label: 'Request a consultation', href: '/contact/#inquiry' },
    ],
  },
  {
    slug: 'why-we-show-internal-systems',
    title: 'Why we show internal systems instead of client logos',
    date: '2026-11-11',
    readingTime: '3 min',
    summary:
      'A wall of client logos is not evidence. We show the systems we actually run, label their status, and separate a prototype from a production system.',
    sections: [
      {
        heading: 'Status is part of the work',
        body: 'Every project on our work page carries a status: in daily use, built for our own sales work, live on this site, in development or earlier exploration. The label changes how much weight the work can carry. An internal tool can prove a capability. It cannot prove a client result.',
      },
      {
        heading: 'Internal proof is still proof',
        body: 'The operations platform, the lead-finding service and this website are ours. They show how we design permissions, handle a queue, write an audit trail and keep personal data out of URLs and logs. That is useful evidence for a buyer, as long as we do not dress it up as a client case study.',
      },
      {
        heading: 'A prototype is not production',
        body: 'A local data store, a mock sign-in or a seeded dashboard is a way to test an idea. It is not a shared backend, and it should not be presented as one. When a prototype becomes a product, the status and the claims change with it.',
      },
      {
        heading: 'What we add when it is real',
        body: 'When a client project is complete and approved, the page can carry the problem, the scope, the decisions and the verified outcome. Until then, the honest version is the one we can defend in a meeting without adding a footnote.',
      },
    ],
    related: [
      { label: 'Our work', href: '/portfolio/' },
      { label: 'Solutions by problem', href: '/solutions/' },
    ],
  },
  {
    slug: 'm-pesa-reconciliation',
    title: 'The M-Pesa reconciliation problem',
    date: '2026-11-04',
    readingTime: '4 min',
    summary:
      'M-Pesa makes payment easy. Matching each payment to the right invoice is the part that still lands on a person’s desk.',
    sections: [
      {
        heading: 'The matching problem',
        body: 'A payment arrives with a reference, an amount and a time. An invoice has a customer, a number and a balance. The system has to decide that this payment belongs to that invoice, and it has to do it without guessing. The hard part is not the STK Push. It is the unmatched payment, the partial payment, the wrong reference and the customer who pays from a different number.',
      },
      {
        heading: 'What a useful flow looks like',
        body: 'Request the payment from the invoice or checkout, record the confirmation, match it to the customer, and keep a list of everything that did not match cleanly. The list is not an error state. It is the working queue for a person who can call the customer or correct the record.',
      },
      {
        heading: 'The exceptions are the product',
        body: 'A reconciliation screen that only shows the successful matches hides the work. The useful screen shows the total received, the total matched, the amount waiting, the oldest unmatched item and the reason. That is what makes month-end shorter, not another dashboard that repeats the statement.',
      },
      {
        heading: 'What we have not shown yet',
        body: 'We have invoicing inside our own operations platform, but we do not have a live M-Pesa deployment to show. The finance concept on our Managed business operations page is labelled as a concept for that reason. When a live integration is approved, the evidence will say so and the page will change.',
      },
    ],
    related: [
      { label: 'Managed business operations', href: '/services/managed-operations/' },
      { label: 'AI and business automation', href: '/services/ai-automation/' },
    ],
  },
]
