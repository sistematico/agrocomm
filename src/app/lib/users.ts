import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function getUserFromDB(id: number) {
  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1)
  return user
}