import { sign, verify, decode } from 'hono/jwt'
import { add, update } from '@/models/token'
import { findId } from '@/models/user'
import { getExpiryInSeconds } from '@/utils'

const accessSecret = Bun.env.ACCESS_TOKEN_SECRET!
const refreshSecret = Bun.env.REFRESH_TOKEN_SECRET!
const accessExpiry = Bun.env.ACCESS_TOKEN_EXPIRY!
const refreshExpiry = Bun.env.REFRESH_TOKEN_EXPIRY!

export async function createTokens(username: string, role = 'user') {
  const accessToken = await createAccessToken(username, role)
  const refreshToken = await createRefreshToken(username, role)
  return { accessToken, refreshToken }
}

async function createAccessToken(username: string, role = 'user') {
  const exp = Math.floor(Date.now() / 1000) + getExpiryInSeconds(accessExpiry) // const exp = Math.floor(Date.now() / 1000) + 60 * Number(refreshExpiry)
  const userId = await findId(username)
  const token = await sign({ sub: userId, username, role, exp }, accessSecret)
  return token
}

async function createRefreshToken(username: string, role = 'user') {
  const exp = Math.floor(Date.now() / 1000) + getExpiryInSeconds(refreshExpiry)
  const userId = await findId(username)
  const token = await sign({ sub: userId, username, role, exp }, refreshSecret)
  if (userId) await add(token, userId, exp)
  return token
}

export async function verifyToken(token: string) {
  return await verify(token, refreshSecret)
}

export function decodeToken(token: string) {
  return decode(token)
}

export async function refreshToken(token: string) {
  const expiry = Math.floor(Date.now() / 1000) + getExpiryInSeconds(refreshExpiry)
  return await update(token, { token, expiry, revoked: false })
}

export async function revokeToken(token: string) {
  return await update(token, { token, expiry: + new Date(), revoked: true })
}