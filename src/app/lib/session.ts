// src/app/lib/session.ts
import 'server-only'

import { cookies } from 'next/headers'
// Remove crypto import
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { roles } from "@/db/schema"
import { z } from 'zod'

const sessionSchema = z.object({
  id: z.number(),
  role: z.enum(roles as [string, ...string[]]),
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

// Use Web Crypto API to generate a random string
async function generateRandomString(length: number): Promise<string> {
  const buffer = new Uint8Array(length)
  crypto.getRandomValues(buffer)
  return Array.from(buffer)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
}

export async function createSession(
  user: UserSession,
  cookies: Pick<Cookies, "set">
) {
  // Use Web Crypto API instead of Node.js crypto
  const sessionId = await generateRandomString(64)

  cookies.set('session', sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + 60 * 1000,
  })
}

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