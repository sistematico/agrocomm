// src/lib/server-session.ts
import 'server-only'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { cache } from 'react'
import { redirect } from 'next/navigation'

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
    if (!session) return undefined
    
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
    return undefined
  }
}

export async function createSession(user: { id: number, role: string }) {
  const token = await encrypt({
    userId: user.id,
    role: user.role
  })

  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export const verifySession = cache(async () => {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId) {
    redirect('/entrar')
  }
 
  return { 
    isAuth: true, 
    userId: session.userId as number, 
    role: session.role as string 
  }
})

export async function checkSession() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')?.value
  const session = await decrypt(cookie)
  return !!session?.userId
}