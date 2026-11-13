import Link from 'next/link'
import { requireStaffPage } from '@/server/auth'
import { isAwaitingFirstPayment, isOverdue, listInquiries, type Inquiry } from '@/server/inquiries'
import { today } from '@/server/time'
import { STAGES, isStage, sourceLabel, stageLabel } from '@/lib/pipeline'
import { formatDate, formatDateTime } from '@/components/Inbox/format'

export const dynamic = 'force-dynamic'

type Props = { searchParams: Promise<{ stage?: string }> }

function Row({ inquiry: i, todayIso }: { inquiry: Inquiry; todayIso: string }) {
  const overdue = isOverdue(i, todayIso)
  return (
    <li>
      <Link
        href={`/inbox/${i.id}/`}
        className='grid grid-cols-1 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.4fr)] gap-x-6 gap-y-1.5 px-4 sm:px-5 py-4 bg-[var(--ac-surface)] hover:bg-[var(--ac-surface-2)] transition-colors'>
        <div className='min-w-0'>
          <p className='text-[var(--ac-ink)] font-semibold truncate'>
            {i.stage === 'new' && (
              <span className='inline-block w-2 h-2 rounded-full bg-[var(--ac-accent)] mr-2 align-middle' aria-label='New' />
            )}
            {i.name}
            {i.company ? <span className='text-[var(--ac-ink-3)] font-normal'> · {i.company}</span> : null}
          </p>
          <p className='ac-small truncate'>{i.problem}</p>
        </div>
        <div className='ac-small'>
          <span className='text-[var(--ac-ink-2)]'>{stageLabel(i.stage)}</span>
          <span> · {sourceLabel(i.source)}</span>
          <br className='hidden sm:block' />
          <span className='sm:hidden'> · </span>
          <span>{formatDateTime(i.createdAt)}</span>
        </div>
        <div className='ac-small min-w-0'>
          {i.nextAction ? (
            <span className={overdue ? 'text-[var(--ac-danger)]' : ''}>
              {overdue ? 'Overdue · ' : ''}
              {formatDate(i.nextActionDue!)} — {i.nextAction}
            </span>
          ) : (
            <span className='text-[var(--ac-ink-4)]'>No next action set</span>
          )}
          {isAwaitingFirstPayment(i) && <span className='block text-[var(--ac-warn)]'>Awaiting first payment</span>}
        </div>
      </Link>
    </li>
  )
}

function Section({
  slug,
  title,
  items,
  todayIso,
  empty,
  tone,
}: {
  slug: string
  title: string
  items: Inquiry[]
  todayIso: string
  empty?: string
  tone?: 'alert' | 'accent' | 'warn'
}) {
  if (!items.length && !empty) return null
  const color =
    tone === 'alert' ? 'text-[var(--ac-danger)]' : tone === 'warn' ? 'text-[var(--ac-warn)]' : tone === 'accent' ? 'text-[var(--ac-accent)]' : 'text-[var(--ac-ink)]'
  return (
    <section className='ac-flush mb-10' aria-labelledby={`h-${slug}`} data-section={slug}>
      <h2 id={`h-${slug}`} className={`ac-h4 mb-3 ${color}`}>
        {title} <span className='text-[var(--ac-ink-4)] font-normal'>({items.length})</span>
      </h2>
      {items.length ? (
        <ul className='flex flex-col gap-px bg-[var(--ac-line)] border border-[var(--ac-line)]'>
          {items.map((i) => (
            <Row key={i.id} inquiry={i} todayIso={todayIso} />
          ))}
        </ul>
      ) : (
        <p className='ac-small'>{empty}</p>
      )}
    </section>
  )
}

export default async function InboxPage({ searchParams }: Props) {
  await requireStaffPage()
  const { stage } = await searchParams
  const filter = isStage(stage) ? stage : 'open'
  const all = await listInquiries()
  const todayIso = today()

  const overdue = all
    .filter((i) => isOverdue(i, todayIso))
    .sort((a, b) => a.nextActionDue!.localeCompare(b.nextActionDue!))
  const fresh = all.filter((i) => i.stage === 'new')
  const awaitingPayment = all.filter(isAwaitingFirstPayment)
  const listed = filter === 'open' ? all.filter((i) => i.stage !== 'closed_lost') : all.filter((i) => i.stage === filter)

  const tabs = [{ id: 'open', label: 'All open' }, ...STAGES]

  return (
    <>
      <div className='flex flex-wrap items-end justify-between gap-4 mb-8'>
        <div>
          <h1 className='ac-h2'>Opportunities</h1>
          <p className='ac-small mt-2'>Today is {formatDate(todayIso)}.</p>
        </div>
        <Link href='/inbox/new/' className='ac-btn ac-btn-primary'>
          Add opportunity
        </Link>
      </div>

      <Section slug='overdue' title='Overdue next actions' items={overdue} todayIso={todayIso} tone='alert' />
      <Section slug='new' title='New inquiries' items={fresh} todayIso={todayIso} tone='accent' empty='No new inquiries.' />
      <Section slug='awaiting-payment' title='Accepted — awaiting first payment' items={awaitingPayment} todayIso={todayIso} tone='warn' />

      <section className='ac-flush' aria-labelledby='h-all' data-section='all'>
        <h2 id='h-all' className='ac-h4 mb-3'>
          By stage
        </h2>
        <nav className='flex flex-wrap gap-2 mb-4' aria-label='Filter by stage'>
          {tabs.map((t) => (
            <Link
              key={t.id}
              href={t.id === 'open' ? '/inbox/' : `/inbox/?stage=${t.id}`}
              aria-current={filter === t.id ? 'page' : undefined}
              className={`px-3.5 py-2 text-xs font-semibold border transition-colors ${
                filter === t.id
                  ? 'bg-[var(--ac-accent)] text-[var(--ac-on-accent)] border-[var(--ac-accent)]'
                  : 'text-[var(--ac-ink-3)] border-[var(--ac-line)] hover:text-[var(--ac-ink)]'
              }`}>
              {t.label}
              {t.id !== 'open' && (
                <span className='opacity-70'> {all.filter((i) => i.stage === t.id).length}</span>
              )}
            </Link>
          ))}
        </nav>
        {listed.length ? (
          <ul className='flex flex-col gap-px bg-[var(--ac-line)] border border-[var(--ac-line)]'>
            {listed.map((i) => (
              <Row key={i.id} inquiry={i} todayIso={todayIso} />
            ))}
          </ul>
        ) : (
          <p className='ac-small'>Nothing here yet.</p>
        )}
      </section>
    </>
  )
}
