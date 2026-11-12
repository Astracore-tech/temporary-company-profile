import { redirect } from 'next/navigation'
import { getStaff } from '@/server/auth'
import SignInForm from '@/components/Inbox/SignInForm'

export const dynamic = 'force-dynamic'

export default async function SignInPage() {
  if (await getStaff().catch(() => null)) redirect('/inbox/')
  return (
    <div className='max-w-sm mx-auto pt-6 sm:pt-12'>
      <h1 className='ac-h2 mb-2'>Sign in</h1>
      <p className='ac-small mb-8'>Staff only. Accounts are created by the founder.</p>
      <SignInForm />
    </div>
  )
}
