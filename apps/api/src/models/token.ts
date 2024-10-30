import { db } from '@/db'
import { tokens } from '@/db/schema'

type Token = typeof tokens.$inferInsert

export async function add(token: Token) {
  const data = await db.insert(tokens).values(token).returning()
  return data
}