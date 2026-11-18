import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import HeroSub from '@/components/SharedComponent/HeroSub'
import SectionHeading from '@/components/SharedComponent/SectionHeading'
import InquirySection from '@/components/Inquiry/InquirySection'
import FinancePreview from '@/components/Home/Services/FinancePreview'
import JsonLd from '@/components/SEO/JsonLd'
import { services, departmentBySlug } from '@/content/services'
import { projectsForService, STATUS_LABEL } from '@/content/portfolio'
import { pageMetadata } from '@/utils/pageMeta'
import { jsonLdGraph, breadcrumbSchema, departmentSchema } from '@/utils/structuredData'

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => services.map(({ slug }) => ({ slug }))

export async function generateMetadata({ params }: Params) {
  const department = departmentBySlug((await params).slug)
  if (!department) return {}
  return pageMetadata({
    title: department.title,
    description: department.summary,
    path: `/services/${department.slug}`,
  })
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <h3 className='ac-label mb-3'>{children}</h3>
)

export default async function DepartmentPage({ params }: Params) {
  const department = departmentBySlug((await params).slug)
  if (!department) notFound()
  const d = department
  const proof = projectsForService(d.id)

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: d.title, path: `/services/${d.slug}` },
          ]),
          departmentSchema(d)
        )}
      />
      <HeroSub
        eyebrow='Department'
        title={d.title}
        description={d.summary}
        breadcrumbLinks={[
          { href: '/', text: 'Home' },
          { href: '/services', text: 'Services' },
          { href: `/services/${d.slug}`, text: d.title },
        ]}
        aside={
          <div className='border-t border-[var(--ac-line)] pt-5'>
            <dl className='space-y-3'>
              <div className='flex items-baseline justify-between gap-6 border-b border-[var(--ac-line)] pb-3'>
                <dt className='ac-meta'>Includes</dt>
                <dd className='text-[13px] text-[var(--ac-ink-2)]'>{d.includes.length} services</dd>
              </div>
              <div className='flex items-baseline justify-between gap-6'>
                <dt className='ac-meta'>Ongoing</dt>
                <dd className='text-[13px] text-[var(--ac-ink-2)]'>By agreement</dd>
              </div>
            </dl>
          </div>
        }
      />

      <section>
        <div className='ac-container grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16'>
          <div className='lg:col-span-5'>
            <span className='ac-eyebrow'>The problem</span>
            <p className='ac-lead mt-5'>{d.problem}</p>
            <div className='mt-8 border-t border-[var(--ac-line)] pt-5'>
              <Label>Who it is for</Label>
              <p className='ac-body'>{d.whoFor}</p>
            </div>
          </div>
          <div className='lg:col-span-7'>
            <Label>What we deliver</Label>
            <ul className='grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2'>
              {d.includes.map((item) => (
                <li key={item} className='ac-small flex gap-2.5'>
                  <span
                    className='mt-2 h-1 w-1 shrink-0 rounded-[1px]'
                    style={{ background: d.tone }}
                    aria-hidden='true'
                  />
                  <span className='text-[var(--ac-ink-2)]'>{item}</span>
                </li>
              ))}
            </ul>
            <p className='ac-small mt-6 max-w-xl'>{d.approach}</p>
          </div>
        </div>
      </section>

      <section className='border-t border-[var(--ac-line)]'>
        <div className='ac-container'>
          <SectionHeading
            eyebrow='How it works'
            title={
              <>
                From assessment
                <br />
                <span className='ac-muted-line'>to a managed outcome</span>
              </>
            }
            description='The engagement is written down before work starts. The scope says what we build and what we run.'
          />
          <ol className='grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4'>
            {d.engagement.map((step, index) => (
              <li key={step} className='border-t border-[var(--ac-line)] pt-5'>
                <span className='ac-index' style={{ color: d.tone }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className='ac-body mt-3'>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className='border-t border-[var(--ac-line)]'>
        <div className='ac-container grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16'>
          <div className='lg:col-span-4'>
            <span className='ac-eyebrow'>What changes</span>
            <h2 className='ac-h2 mt-4'>{d.outcome}</h2>
            <div className='mt-8 border-t border-[var(--ac-line)] pt-5'>
              <Label>Ongoing management</Label>
              <p className='ac-body'>{d.ongoing}</p>
            </div>
          </div>
          <div className='border-t border-[var(--ac-line)] lg:col-span-8'>
            {d.benefits.map((benefit, index) => (
              <div
                key={benefit}
                className='grid grid-cols-[24px_minmax(0,1fr)] gap-4 border-b border-[var(--ac-line)] py-4'>
                <span className='ac-index pt-0.5' style={{ color: d.tone }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className='ac-body'>{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='border-t border-[var(--ac-line)]'>
        <div className='ac-container grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16'>
          <div className='lg:col-span-4'>
            <span className='ac-eyebrow'>Proof</span>
            <h2 className='ac-h2 mt-4'>What we can show</h2>
            <p className='ac-small mt-5 max-w-xs'>
              Internal tools count as proof of capability, not as client results. We label the
              difference.
            </p>
          </div>

          <div className='lg:col-span-8'>
            {proof.length > 0 ? (
              <div className='border-t border-[var(--ac-line)]'>
                {proof.map((p) => (
                  <div key={p.slug} className='border-b border-[var(--ac-line)] py-5'>
                    <div className='flex flex-wrap items-baseline gap-x-3 gap-y-1'>
                      <Link
                        href={`/portfolio/${p.slug}/`}
                        className='text-[15px] font-medium text-[var(--ac-ink)] transition-colors hover:text-[var(--ac-accent)]'>
                        {p.name}
                      </Link>
                      <span className='ac-meta'>{STATUS_LABEL[p.status]}</span>
                    </div>
                    <p className='ac-small mt-1 max-w-2xl'>{p.proof}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className='ac-small max-w-2xl border-t border-[var(--ac-line)] pt-5'>
                {d.proofNote ?? 'No finished project to show yet.'}
              </p>
            )}

            {d.id === 'mpesa-integration' && (
              <div className='mt-8 max-w-md'>
                <FinancePreview />
                <p className='ac-meta mt-3'>
                  Concept view. The amount is an example, not a price.
                </p>
              </div>
            )}

            {d.productNote && (
              <div className='mt-6 max-w-2xl border-l border-[var(--ac-line-strong)] pl-3'>
                <p className='ac-small'>{d.productNote}</p>
                {d.productHref && (
                  <Link href={d.productHref} className='ac-link mt-3 inline-flex'>
                    Explore Amplifyr
                  </Link>
                )}
              </div>
            )}

            <div className='flex flex-wrap gap-x-6 gap-y-3 pt-8'>
              <Link href='/portfolio/' className='ac-link'>
                See the work
              </Link>
              <Link href='/solutions/' className='ac-link'>
                Find this by problem
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InquirySection defaultService={d.id} />
    </>
  )
}
