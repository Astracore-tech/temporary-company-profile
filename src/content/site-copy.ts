/**
 * Public copy that isn't a service description — the call to action, the
 * "how it works" steps, the FAQ and the about page. Edit freely; no workflow
 * logic reads this.
 *
 * Kept in a plain module rather than a `'use client'` component: a server
 * component importing a value from a client module receives a client
 * reference, not the data, which breaks the FAQPage structured data.
 */

/** The one primary call to action used across the site. */
export const PRIMARY_CTA = {
  label: 'Request a consultation',
  href: '/contact/#inquiry',
}

/** The same direct action in the navigation. */
export const HEADER_CTA = {
  label: 'Request a consultation',
  href: '/contact/#inquiry',
}

/** The form heading, so it does not repeat the button label. */
export const INQUIRY_HEADING = 'Tell us what is getting in the way'

export const howItWorks = [
  {
    title: 'Describe the problem',
    body: 'Use the short form. Plain language is fine — you don’t need to know which service you need or what the technical solution is.',
  },
  {
    title: 'We follow up',
    body: 'Mark reads every inquiry and replies on the email or phone number you give, to ask questions and arrange a conversation.',
  },
  {
    title: 'Discovery',
    body: 'We talk through how the work is done today, what is getting in the way and what a useful first version would look like.',
  },
  {
    title: 'Proposal',
    body: 'You get a written proposal with scope and cost to review. It says what we build, what we run and what you take over. Nothing starts until you have agreed to it.',
  },
]

export const faqData = [
  {
    question: 'I’m not sure which department I need. Should I still get in touch?',
    answer:
      'Yes. Describe what is going wrong or what you want to be able to do, and leave the department field on “Not sure yet”. Working out the right approach is part of the first conversation.',
  },
  {
    question: 'Can I see the systems you have built?',
    answer:
      'Yes. The work page describes each system, what exists today and what is still in development. Because some are internal tools, we show how they are built rather than screenshots of real data.',
  },
  {
    question: 'Do you only work on new systems?',
    answer:
      'No. Some work starts by fixing or replacing part of a system that already exists. We look at what you use today before proposing a rebuild.',
  },
  {
    question: 'Do you build it and leave, or do you run it too?',
    answer:
      'Either can work. You can take the system over, or we can keep running and maintaining it with you. The proposal says which parts we operate and what we report on.',
  },
  {
    question: 'Do you work with businesses outside Kenya?',
    answer:
      'Yes. We work with businesses in Kenya first, then across East Africa and the wider African market. The process is the same: send an inquiry, we reply on the email or phone number you give us, and we arrange a call at a time that works.',
  },
  {
    question: 'What happens after I send the form?',
    answer:
      'Your inquiry goes straight to Mark’s inbox. He replies to ask any questions we need, then arranges a discovery conversation if it looks like we can help.',
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

/** The plain facts in the about page sidebar. */
export const aboutFacts = [
  { label: 'Based in', value: 'Nairobi, Kenya' },
  { label: 'Founded', value: '2023' },
  { label: 'Structure', value: 'Two equal co-founders' },
  { label: 'Engineering and operations', value: 'Mark' },
]

/** What the company commits to, in the order it happens. */
export const principles = [
  {
    title: 'Start from the problem',
    body: 'We describe how the work happens today before naming a technology or a feature.',
  },
  {
    title: 'Put the scope in writing',
    body: 'You get the scope and cost in a proposal to review. Nothing starts until you agree to it.',
  },
  {
    title: 'Build it, then run it',
    body: 'Custom software is one option. We can also operate and maintain the workflow where that helps, and report on the result.',
  },
  {
    title: 'Say what is finished',
    body: 'Work in progress is labelled as such. We do not dress a plan up as a shipped feature.',
  },
]

/** Tools that actually appear in the projects, not a wish list. */
export const toolGroups = [
  { label: 'Web', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
  { label: 'Server and data', items: ['Node.js', 'PostgreSQL', 'Python', 'libSQL'] },
  { label: 'Operations', items: ['Docker', 'Cloudflare R2', 'M-Pesa APIs', 'ClickUp API'] },
]
