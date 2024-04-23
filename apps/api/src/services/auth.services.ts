import { eq, and, or } from 'drizzle-orm'
import { db } from '@/drizzle'
import * as schema from '@/drizzle/schema'
import { getCurrentDate } from '@/services/dates.services'

export async function login(identifier: string, password: string) {  
  const hash = await Bun.password.hash(password)

  const user = await db
    .select()
    .from(schema.users)
    .where(
      and(
        or(
          eq(schema.users.email, identifier),
          eq(schema.users.username, identifier)
        ),
        eq(schema.users.password, hash)
      )
    )

  // if (user) {
  //   const token = await Bun.jwt.sign({ id: user[0].id, email: user[0].email })
  //   return { user, token }
  // }

  return user
}

export async function register(username: string, email: string, password: string) {  
  const now = getCurrentDate()

  const user = await db.insert(schema.users)
    .values({ name, username, email, password, createdAt: now })
    .onConflictDoNothing()

  return user
}