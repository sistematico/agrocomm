'use server'

import { cookies } from 'next/headers'
import { cache } from 'react'
import { decrypt } from '@/app/lib/session'

export const verifySessionAction = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  if (!cookie) return { isAuth: false }
  
  try {
    const session = await decrypt(cookie);
    if (!session?.sessionId) return { isAuth: false }

    return { isAuth: true, userId: session.sessionId }
  } catch (error) {
    return { isAuth: false }
  }
})