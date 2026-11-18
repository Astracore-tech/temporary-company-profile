/**
 * Privacy notice shown at /privacy/. Edit this file to change it.
 *
 * It describes what THIS website actually does — keep it true. If the site
 * starts using analytics, a new form field, email notifications or another
 * provider, update the matching section and `updated` before that change
 * goes live. Based on the structure of the company's general privacy policy
 * (HR folder) and the Kenya Data Protection Act, 2019.
 *
 * The retention periods are AstraCore's commitment: the founder deletes old
 * inquiries from the inbox database by hand — nothing does it automatically.
 */

export const PRIVACY_UPDATED = '13 November 2026'

export type PrivacySection = {
  id: string
  heading: string
  paragraphs?: string[]
  list?: string[]
  /** Optional closing paragraph after the list. */
  after?: string
}

export const privacySections: PrivacySection[] = [
  {
    id: 'who-we-are',
    heading: 'Who we are',
    paragraphs: [
      'AstraCore Technologies (“AstraCore”, “we”) runs this website. We are the data controller for the personal data collected through it, under the Kenya Data Protection Act, 2019.',
      'This notice covers this website and its inquiry form. It explains what we collect, why, where it is kept, for how long, and the rights you have.',
    ],
  },
  {
    id: 'what-we-collect',
    heading: 'What we collect',
    paragraphs: ['When you send the inquiry form, we store:'],
    list: [
      'your name;',
      'the email address or phone number you give us to reply to;',
      'your company name, if you give it;',
      'the service you picked, if any;',
      'what you write about the problem you want to solve;',
      'the date and time you sent it.',
    ],
    after:
      'If the conversation continues, we add our own notes to the record: follow-up actions, the stage of any proposal and, if you become a client, the dates of first payment and onboarding. If you contact us another way (phone, WhatsApp, email, a referral or a meeting) and we follow up, we may record the same kind of details in the same place, noting where they came from.',
  },
  {
    id: 'what-we-do-not-collect',
    heading: 'What we don’t collect',
    list: [
      'We don’t use analytics, advertising or tracking tools on this website.',
      'We don’t set cookies for visitors. (Cookies are used only when our own staff sign in to the private inbox.)',
      'We don’t store your IP address. To stop abuse of the form, we keep a scrambled, one-way code derived from it, which cannot be turned back into the address, and delete it within a day.',
      'We never put what you write, or your contact details, in web addresses or in our application logs.',
    ],
    after:
      'If you switch between light and dark mode, your browser remembers the choice on your own device; it is not sent to us.',
  },
  {
    id: 'why',
    heading: 'Why we use it, and on what basis',
    paragraphs: [
      'We use your details to read and reply to your inquiry, arrange a conversation, prepare a proposal if you ask for one, and keep track of our follow-up. We do this because you asked us to get in touch, and to take the steps you request before any contract.',
      'If you become a client, we use them to manage that work under our agreement with you, and keep the records the law requires.',
      'We don’t use inquiry details for marketing mailings, and we don’t sell or rent them to anyone.',
    ],
  },
  {
    id: 'who-sees-it',
    heading: 'Who can see it',
    paragraphs: [
      'Only AstraCore staff with a sign-in to our private inquiry inbox, currently Mark, co-founder. Every page and action in the inbox checks the sign-in on our server.',
      'We use these service providers to run the site. They process data on our behalf and are not allowed to use it for their own purposes:',
    ],
    list: [
      'Vercel Inc. hosts the website, and receives your IP address and browser details when you visit, as any web host does.',
      'Turso hosts the database where inquiries are stored.',
      'Google Fonts and jsDelivr deliver the site’s fonts and icons. Your browser requests them directly, so those services receive your IP address. They don’t receive anything you type.',
    ],
    after:
      'We would disclose personal data to a government authority or court only where Kenyan law requires it.',
  },
  {
    id: 'transfers',
    heading: 'Storage outside Kenya',
    paragraphs: [
      'The website’s hosting and the inquiry database are run from data centres in the United States. By using these providers we transfer the details you send outside Kenya. We use them because they keep the data encrypted in transit, restrict access to it, and process it only on our instructions. The data stays in AstraCore’s own database: it isn’t shared with any other product or system of ours.',
    ],
  },
  {
    id: 'retention',
    heading: 'How long we keep it',
    list: [
      'Inquiries that don’t lead to work: deleted no later than 24 months after our last contact with you.',
      'Clients: kept for as long as we work together, then for as long as Kenyan tax and accounting law requires us to keep business records.',
      'The anti-abuse codes described above: deleted within a day.',
    ],
    after: 'You can ask us to delete your inquiry sooner at any time; see below.',
  },
  {
    id: 'security',
    heading: 'How we protect it',
    paragraphs: [
      'The site is served only over an encrypted (HTTPS) connection. The inbox requires a password-protected staff account, checked on the server for every request, and records who changed what. Staff passwords are stored only as secure one-way hashes. No method of storing or sending information is completely secure, but we take these steps to keep the risk low, and we will notify you and the Data Protection Commissioner of a breach where the law requires it.',
    ],
  },
  {
    id: 'rights',
    heading: 'Your rights',
    paragraphs: ['Under the Data Protection Act, 2019 you can ask us to:'],
    list: [
      'tell you whether we hold data about you, and give you a copy;',
      'correct anything inaccurate or incomplete;',
      'delete your data, or stop or restrict how we use it;',
      'move it to you in a common format, where that applies.',
    ],
    after:
      'Email info@astracoretech.org from the address you used, or tell us which phone number you gave, so we can confirm it’s you. We will reply within the time the law allows. If you are unhappy with how we handle your data, you can complain to the Office of the Data Protection Commissioner (odpc.go.ke).',
  },
  {
    id: 'children',
    heading: 'Children',
    paragraphs: [
      'This website is for businesses and is not meant for anyone under 18. If you believe a child has sent us their details, contact us and we will delete them.',
    ],
  },
  {
    id: 'changes',
    heading: 'Changes to this notice',
    paragraphs: [
      'If we change how the website handles personal data, we will update this page and the date at the top before the change takes effect.',
    ],
  },
]
