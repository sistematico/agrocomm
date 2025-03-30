import 'server-only'

import { cookies } from 'next/headers'
import crypto from 'crypto'
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { roles } from "@/db/schema"
import { z } from 'zod'

// import { SessionPayload } from '@/app/lib/definitions'

// export interface SessionPayload {
//   userId: string;
//   expiresAt: Date;
// }


const sessionSchema = z.object({
  id: z.number(),
  role: z.enum(roles),
})

type UserSession = z.infer<typeof sessionSchema>

export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean
      httpOnly?: boolean
      sameSite?: "strict" | "lax"
      expires?: number
    }
  ) => void
  get: (key: string) => { name: string; value: string } | undefined
  delete: (key: string) => void
}

// const secretKey = process.env.SESSION_SECRET
const secretKey = 'secret'
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

export async function createSession(
  user: UserSession,
  cookies: Pick<Cookies, "set">
) {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize()

  // setCookie(sessionId, cookies)

  cookies.set('session', sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + 60 * 1000,
  })
}

// export async function createSession(userId: string, username: string, role: string) {
//   const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//   const session = await encrypt({ userId, username, role, expiresAt })
//   const cookieStore = await cookies()
 
//   cookieStore.set('session', session, {
//     httpOnly: true,
//     secure: true,
//     expires: expiresAt,
//     sameSite: 'lax',
//     path: '/',
//   })
// }

// export async function deleteSession() {
//   const cookieStore = await cookies()
//   cookieStore.delete('session')
// }

export async function deleteSession(
  cookies: Pick<Cookies, "get" | "delete">
) {
  const sessionId = cookies.get('session')?.value
  if (sessionId == null) return null

  cookies.delete('session')
}


export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId) {
    redirect('/entrar')
  }
 
  return { isAuth: true, userId: session.userId, username: session.username, role: session.role }
})