import 'server-only'

import { cookies } from 'next/headers'
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

// Chave secreta mais segura - em produção use uma variável de ambiente
const secretKey = 'minha_chave_secreta_supersegura_que_deve_ser_variavel_ambiente'
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = ''): Promise<JWTPayload | undefined> {
  if (!session) return undefined
  
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session:', error)
    return undefined
  }
}

export async function createSession(
  user: UserSession,
  cookieStore: Pick<Cookies, "set">
) {
  // Criar payload JWT com informações do usuário
  const token = await encrypt({
    userId: user.id,
    role: user.role
  })

  // Definir o cookie com o token JWT
  cookieStore.set('session', token, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    // 7 dias em milissegundos
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
  })
}

export async function deleteSession(
  cookieStore: Pick<Cookies, "get" | "delete">
) {
  cookieStore.delete('session')
}

export const verifySession = cache(async () => {
  const cookie = await cookies()
  const session = (await cookies()).get('session')?.value
  // const cookie = cookieStore.get('session')?.value
  
  if (!session) {
    redirect('/entrar')
  }
  
  const payload = await decrypt(session)
  
  if (!payload || !payload.userId) {
    cookie.delete('session')
    redirect('/entrar')
  }
  
  return {
    isAuth: true,
    userId: payload.userId as number,
    role: payload.role as string
  }
})