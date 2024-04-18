import { eq, sql, or } from 'drizzle-orm'
import { db } from '@/drizzle'
import * as schema from '@/drizzle/schema'
import { getCurrentDate } from '@/utils'

export async function login(identifier: string, password: string) {  
  const user = await db
    .select()
    .from(schema.users)
    .where(
      or(
        eq(schema.users.email, identifier),
        eq(schema.users.username, identifier)
      )
    )

  return user
}

export async function register(name: string, username: string, email: string, password: string) {  
  const now = getCurrentDate()

  const user = await db.insert(schema.users)
    .values({ name, username, email, password, createdAt: now })
    .onConflictDoNothing();

  return user
}