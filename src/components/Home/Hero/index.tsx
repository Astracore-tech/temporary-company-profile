import Link from 'next/link'
import { HERO, PRIMARY_CTA, WORK_CTA } from '@/content/site-copy'

/** Home page opening: one headline, one sentence, two actions. Copy lives in content/site-copy.ts. */
const Hero = () => (
  <section className='!pt-12 sm:!pt-20 lg:!pt-28 !pb-14 sm:!pb-20 border-b border-[var(--ac-line)]'>
    <div className='ac-container'>
      <h1 className='ac-display max-w-[17ch]'>{HERO.headline}</h1>
      <p className='ac-lead mt-6'>{HERO.sentence}</p>
      <div className='mt-9 flex flex-col sm:flex-row gap-3'>
        <Link href={PRIMARY_CTA.href} className='ac-btn ac-btn-primary'>
          {PRIMARY_CTA.label}
        </Link>
        <Link href={WORK_CTA.href} className='ac-btn ac-btn-ghost'>
          {WORK_CTA.label}
        </Link>
      </div>
    </div>
  </section>
)

export default Hero
