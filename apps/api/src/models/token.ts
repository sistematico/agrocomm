import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { tokens } from '@/db/schema'

type Token = typeof tokens.$inferInsert

export async function add(token: string, userId: number, expiry: number) {
  const data = await db.insert(tokens).values({ token, userId, expiry, revoked: false }).returning()
  
  // const data = await db
  //   .insert(tokens)
  //   .values({ token, userId, expiry, revoked: false })
  //   .onConflictDoUpdate({
  //     target: tokens.userId,
  //     set: { token, expiry, revoked: false },
  //   }).returning()

  return data
}

export async function remove(token: Token) {
  const data = await db.insert(tokens).values(token).returning()
  return data
}

export async function update(token: string, tokenData: Token) {
  const data = await db.update(tokens)
    .set(tokenData)
    .where(eq(tokens.token, token))
    .returning()

  return data
}