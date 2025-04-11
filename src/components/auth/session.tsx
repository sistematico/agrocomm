import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import AccountUI from '@/components/navbar/account'

export default async function SessionCheck() {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  const isLogged = !!session?.userId
  // return !!session?.userId
  
  return <AccountUI isLogged={isLogged} />
}