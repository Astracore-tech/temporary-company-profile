/**
 * Shared FAQ content.
 *
 * Kept in a plain module rather than inside the `'use client'` FAQ component:
 * a server component importing a value from a client module receives a client
 * reference, not the data, which breaks the FAQPage structured data.
 */
export const faqData = [
  {
    question: "What types of software solutions do you offer?",
    answer:
      "We specialize in Android application development, premium responsive websites, complex backend systems, and intelligent bot creation to streamline your business operations.",
  },
  {
    question: "How do you ensure the quality and security of your systems?",
    answer:
      "We follow industry best practices, conduct rigorous testing at every development stage, and implement robust security protocols to protect your data and ensure high performance.",
  },
  {
    question: "Can you scale your solutions as my business grows?",
    answer:
      "Absolutely. Our systems are built with scalability in mind from day one. We use modern, flexible architectures that can easily handle increased loads and new feature integrations.",
  },
  {
    question: "Do you provide ongoing support after deployment?",
    answer:
      "Yes, we offer comprehensive post-launch support and maintenance packages to ensure your software remains up-to-date, secure, and fully optimized.",
  },
]
