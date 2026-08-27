import React from 'react'
import { Icon } from '@iconify/react'

const CHANNELS = [
  {
    icon: 'ph:envelope-simple-bold',
    title: 'Email Us',
    body: 'Have questions or want to request a quote? Drop us a message, and our technical team will respond within 24 hours.',
    cta: 'Leave a message →',
    href: 'mailto:info@astracoretech.org',
  },
  {
    icon: 'ph:briefcase-bold',
    title: 'Careers',
    body: 'We are always looking for talented software engineers, UI/UX designers, and systems architects to join our team in Nairobi.',
    cta: 'Send an application →',
    href: 'mailto:info@astracoretech.org?subject=Career Inquiry',
  },
]

const ContactInfo = () => {
  return (
    <section>
      <div className='ac-container'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--ac-line)] border border-[var(--ac-line)]'>
          {CHANNELS.map(({ icon, title, body, cta, href }, i) => (
            <div
              key={title}
              className='flex gap-6 items-start bg-[var(--ac-surface)] p-8 lg:p-10'
              data-aos='fade-up'
              data-aos-delay={`${i * 100}`}
              data-aos-duration='700'>
              <div
                className='w-12 h-12 flex items-center justify-center border shrink-0 text-[var(--ac-accent)]'
                style={{
                  background: 'var(--ac-accent-dim)',
                  borderColor: 'var(--ac-accent-line)',
                }}>
                <Icon icon={icon} width='22' height='22' />
              </div>
              <div>
                <h2 className='ac-h3'>{title}</h2>
                <p className='ac-body mt-3 mb-6 max-w-sm'>{body}</p>
                <a href={href} className='ac-link'>
                  {cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div
          className='mt-16 border border-[var(--ac-line)] p-2 bg-[var(--ac-surface)]'
          data-aos='fade-up'
          data-aos-duration='700'>
          <iframe
            title='AstraCore office location — Kilimani, Nairobi'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.162440160288!2d36.7865203309653!3d-1.290822699999988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173c3a1106e5%3A0xc6cb5514f7b6070a!2sKilimani%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1715676641521!5m2!1sen!2ske'
            width='100%'
            height='420'
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            className='border-0 grayscale invert opacity-75 block'
          />
        </div>
      </div>
    </section>
  )
}

export default ContactInfo
