export const amplifyr = {
  name: 'Amplifyr',
  eyebrow: 'Product · Amplifyr',
  tagline: 'Creator campaigns, tied to delivery.',
  summary:
    'A two-sided marketplace where brands run creator campaigns and creators get paid for work that can be checked.',
  status: 'In development',
  problem:
    'Creator campaigns are often run through DMs, screenshots and trust. Briefs are vague, submissions are hard to compare, and the money moves before anyone knows what was delivered.',
  audiences: [
    {
      title: 'Brands',
      body: 'Write a brief, set the deliverables, review applications and keep the budget tied to milestones.',
    },
    {
      title: 'Creators',
      body: 'Find campaigns that fit, apply, submit the work and keep the brief, messages and payment status in one place.',
    },
    {
      title: 'Managers and admins',
      body: 'See the pipeline, verify submissions, handle disputes and keep a record of what changed.',
    },
  ],
  loop: [
    {
      title: 'Brief',
      detail: 'A brand sets the campaign, deliverables, platforms and budget.',
    },
    {
      title: 'Match',
      detail: 'Creators discover the campaign, apply and are reviewed by the brand.',
    },
    {
      title: 'Submit',
      detail: 'The creator posts the work and submits the link for review.',
    },
    {
      title: 'Verify and release',
      detail: 'The submission is checked, the milestone is approved and the payment is released.',
    },
  ],
  features: [
    {
      title: 'Campaign workspace',
      body: 'Briefs, deliverables, budgets, applications, submissions and status in one record.',
    },
    {
      title: 'Discovery wall',
      body: 'A browseable view of creators and campaigns, with niches, platforms and filters.',
    },
    {
      title: 'Applications and submissions',
      body: 'Creators apply, brands review, and submissions carry the link and the decision.',
    },
    {
      title: 'Escrow and milestones',
      body: 'The product is designed around money held against delivery, not paid upfront.',
    },
    {
      title: 'Verification and disputes',
      body: 'A review step, a dispute path and an audit trail instead of a lost DM thread.',
    },
    {
      title: 'Roles and dashboards',
      body: 'Separate views for brands, creators, managers and admins, with permissions.',
    },
    {
      title: 'Messaging and notifications',
      body: 'Campaign messages, status changes and the next action in one place.',
    },
    {
      title: 'AI brief assistant',
      body: 'A rough idea can be expanded into a structured brief and creative direction.',
    },
    {
      title: 'Trend pulse',
      body: 'A view of content trends and campaign momentum for planning.',
    },
  ],
  built: [
    'Campaign workspace, briefs and deliverables',
    'Discovery wall, applications and submissions',
    'Brand, creator, manager and admin dashboards',
    'Messaging, notifications, disputes and audit logs',
    'Escrow and transaction records',
    'AI brief assistant and trend page',
  ],
  notClaimed: [
    'Live production payment processing is not claimed yet.',
    'Live platform API verification is not claimed yet.',
    'Public onboarding and production usage figures are not published.',
  ],
} as const
