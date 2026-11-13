/**
 * Public copy that isn't a service description — the call to action, the
 * "how it works" steps and the FAQ. Edit freely; no workflow logic reads this.
 *
 * Kept in a plain module rather than a `'use client'` component: a server
 * component importing a value from a client module receives a client
 * reference, not the data, which breaks the FAQPage structured data.
 */

/** The primary call to action used across the site. */
export const PRIMARY_CTA = {
  label: 'Discuss your project',
  href: '/contact/#inquiry',
}

/** The only other action offered on the home page. */
export const WORK_CTA = {
  label: 'View our work',
  href: '/portfolio/',
}

/** Home page opening: one headline, one plain sentence, two actions. */
export const HERO = {
  headline: 'Custom software for the way your business works',
  sentence:
    'We build internal systems, customer portals and automations for businesses in Kenya and abroad, from a team in Nairobi.',
}

/** Heading above the inquiry form, wherever it appears. */
export const INQUIRY_HEADING = 'Tell us what you want to build'

export const howItWorks = [
  {
    title: 'Describe the problem',
    body: 'Use the short form. Plain language is fine — you don’t need to know which service you need or what the technical solution is.',
  },
  {
    title: 'We follow up',
    body: 'The founder reads every inquiry and replies on the email or phone number you give, to ask questions and arrange a conversation.',
  },
  {
    title: 'Discovery',
    body: 'We talk through how the work is done today, what is getting in the way and what a useful first version would look like.',
  },
  {
    title: 'Proposal',
    body: 'You get a written proposal with scope and cost to review. Nothing starts until you have agreed to it.',
  },
]

export const faqData = [
  {
    question: 'I’m not sure which service I need. Should I still get in touch?',
    answer:
      'Yes. Describe what is going wrong or what you want to be able to do, and leave the service field on “Not sure yet”. Working out the right approach is part of the first conversation.',
  },
  {
    question: 'Do you work with businesses outside Kenya?',
    answer:
      'Yes. The process is the same wherever you are: send an inquiry, we reply on the email or phone number you give us, and we arrange a call at a time that works across time zones.',
  },
  {
    question: 'What happens after I send the form?',
    answer:
      'Your inquiry goes straight to the founder’s inbox. We reply to ask any questions we need, then arrange a discovery conversation if it looks like we can help.',
  },
  {
    question: 'How much will it cost?',
    answer:
      'It depends on the scope, so we don’t publish fixed prices. After discovery you receive a written proposal with the scope and cost for you to review before anything starts.',
  },
  {
    question: 'Can you add M-Pesa payments to a system we already have?',
    answer:
      'Often, yes — it depends on how your existing system is built and hosted. Tell us what you use today and we will look at the options during discovery.',
  },
]
