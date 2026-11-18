import Link from 'next/link'
import { PRIMARY_CTA } from '@/content/site-copy'
import { projectBySlug } from '@/content/portfolio'
import { SITE } from '@/utils/site'
import SystemPreview from './SystemPreview'

const Hero = () => {
  const os = projectBySlug('astracore-os')
  const capabilityCount = os?.built.length ?? 0

  return (
    <section
      id='home'
      className='relative border-b border-[var(--ac-line)] pt-28 pb-16 lg:pt-32 lg:pb-20'>
      <div className='ac-container'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16'>
          <div className='ac-enter lg:col-span-6'>
            <span className='ac-eyebrow'>AstraCore · Nairobi</span>

            <h1 className='ac-display mt-5'>
              We build, automate and manage the{' '}
              <span className='text-[var(--ac-accent)]'>systems</span> your business runs on
            </h1>

            <p className='ac-lead mt-6'>
              A full-service business technology and growth company. Marketing, AI, software,
              websites and managed operations — for businesses in Kenya and across Africa.
            </p>

            <div className='mt-8 flex flex-wrap items-center gap-3'>
              <Link href={PRIMARY_CTA.href} className='ac-btn ac-btn-primary'>
                {PRIMARY_CTA.label}
              </Link>
              <Link href='/portfolio/' className='ac-btn ac-btn-ghost'>
                See the work
              </Link>
            </div>

            <dl className='mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--ac-line)] pt-5'>
              <div>
                <dt className='ac-meta'>Based in</dt>
                <dd className='mt-0.5 text-[13px] text-[var(--ac-ink-2)]'>Nairobi, Kenya</dd>
              </div>
              <div>
                <dt className='ac-meta'>Email</dt>
                <dd className='mt-0.5 text-[13px]'>
                  <a
                    href={`mailto:${SITE.email}`}
                    className='text-[var(--ac-ink-2)] transition-colors hover:text-[var(--ac-ink)]'>
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className='ac-meta'>Phone</dt>
                <dd className='mt-0.5 text-[13px]'>
                  <a
                    href={`tel:${SITE.telephone}`}
                    className='text-[var(--ac-ink-2)] transition-colors hover:text-[var(--ac-ink)]'>
                    {SITE.telephoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className='ac-enter ac-enter-delay lg:col-span-6'>
            <SystemPreview capabilityCount={capabilityCount} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
