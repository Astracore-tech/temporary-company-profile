import { getServerSession, type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { redirect } from 'next/navigation'
import { db } from './db'
import { verifyPassword } from './password.mjs'
import { clientFingerprint, rateLimit } from './request'
import { SIGN_IN_PATH } from '@/lib/inquiryForm'

/**
 * Staff sign-in for the founder inbox, using the project's existing next-auth.
 * Accounts live in the staff_users table and are created with
 * `npm run staff:add` — there is no public sign-up.
 */

export { SIGN_IN_PATH }

async function findStaff(email: string) {
  const res = await (await db()).execute({
    sql: 'SELECT email, name, password_hash FROM staff_users WHERE email = ?',
    args: [email.trim().toLowerCase()],
  })
  return res.rows[0] ?? null
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt', maxAge: 12 * 60 * 60 },
  pages: { signIn: SIGN_IN_PATH, error: SIGN_IN_PATH },
  providers: [
    CredentialsProvider({
      name: 'Staff account',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const email = credentials?.email?.trim().toLowerCase() ?? ''
        const password = credentials?.password ?? ''
        if (!email || !password) return null

        // Slow down password guessing per client and per account.
        const ip = clientFingerprint((req?.headers ?? {}) as Record<string, unknown>)
        const allowed =
          (await rateLimit(`signin:ip:${ip}`, 10, 15 * 60)) &&
          (await rateLimit(`signin:acct:${email}`, 10, 15 * 60))
        if (!allowed) return null

        const staff = await findStaff(email)
        if (!staff || !(await verifyPassword(password, String(staff.password_hash)))) return null
        return { id: String(staff.email), email: String(staff.email), name: String(staff.name) }
      },
    }),
  ],
}

export type Staff = { email: string; name: string }

/**
 * The signed-in staff member, or null. Re-checks the account on every call so
 * removing a row from staff_users revokes access immediately.
 */
export async function getStaff(): Promise<Staff | null> {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if (!email) return null
  const staff = await findStaff(email)
  return staff ? { email: String(staff.email), name: String(staff.name) } : null
}

/** For server-rendered inbox pages. */
export async function requireStaffPage(): Promise<Staff> {
  const staff = await getStaff()
  if (!staff) redirect(SIGN_IN_PATH)
  return staff
}
