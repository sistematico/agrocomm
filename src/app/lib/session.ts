// import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import { SignJWT, jwtVerify } from 'jose'
// import { getUserFromDB } from './users'

const secretKey = 'secret'
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(key)
}

export async function decrypt(input: string): Promise<Record<string, unknown>> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256']
  })
  return payload
}

// export async function createSessionAction(id: number) {
//   const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

//   const user = await getUserFromDB(id)
//   if (!user) throw new Error('User not found')

//   const sessionId = user.id
//   const session = await encrypt({ sessionId, expiresAt })

//   const cookieStore = await cookies()
//   cookieStore.set('session', session, {
//     httpOnly: true,
//     secure: true,
//     expires: expiresAt,
//     sameSite: 'lax',
//     path: '/'
//   })
// }

// export async function logout() {
//   ;(await cookies()).set('session', '', { expires: new Date(0) })
// }

// export async function getSessionAction() {
//   const session = (await cookies()).get('session')?.value
//   if (!session) return null
//   return await decrypt(session)
// }

// export const verifySession = cache(async () => {
//   const cookie = (await cookies()).get('session')?.value
//   if (!cookie) return { isAuth: false }
  
//   const session = await decrypt(cookie)
//   if (!session?.userId) redirect('/login')

//   return { isAuth: true, userId: session.userId }
// })

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  if (!session) return

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session)
  parsed.expires = new Date(Date.now() + 10 * 1000)
  const res = NextResponse.next()

  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires as Date
  })

  return res
}
