import { sign, verify } from 'hono/jwt'
import { add } from '@/models/token'
import { findId } from '@/models/user'

const accessSecret = Bun.env.ACCESS_TOKEN_SECRET!
const refreshSecret = Bun.env.REFRESH_TOKEN_SECRET!
const accessExpiry = Bun.env.ACCESS_TOKEN_EXPIRY!
const refreshExpiry = Bun.env.REFRESH_TOKEN_EXPIRY!

export async function createToken(sub: string, role = 'user') {
  const exp = Math.floor(Date.now() / 1000) + 60 * Number(refreshExpiry)
  const token = await sign({ sub, role, exp }, refreshSecret)
  const userId = await findId(sub)
  await add({ userId, token, expiry: String(exp) })
  console.log(token)
  return token
}

export async function verifyToken(token: string) {
  const decodedPayload = await verify(token, refreshSecret)
  console.log(decodedPayload)
}