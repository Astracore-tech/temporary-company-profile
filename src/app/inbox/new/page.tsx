import Link from 'next/link'
import { requireStaffPage } from '@/server/auth'
import InquiryForm from '@/components/Inquiry/InquiryForm'

export const dynamic = 'force-dynamic'

export default async function NewOpportunityPage() {
  await requireStaffPage()
  return (
    <div className='max-w-2xl'>
      <Link href='/inbox/' className='ac-small hover:text-[var(--ac-accent)]'>
        ← Inbox
      </Link>
      <h1 className='ac-h2 mt-4 mb-2'>Add an opportunity</h1>
      <p className='ac-small mb-8'>
        For prospects who reached you another way — a referral, a meeting or a WhatsApp conversation.
      </p>
      <div className='ac-card p-5 sm:p-8 relative'>
        <InquiryForm variant='manual' />
      </div>
    </div>
  )
}
