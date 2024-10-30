import { db } from '@/db'
import { eq, or } from 'drizzle-orm'
import { users } from '@/db/schema'

type User = typeof users.$inferInsert

export async function list() {
  return await db.select().from(users)
}

export async function add(user: User) {
  const data = await db.insert(users).values(user).returning()
  return data
}

export async function findId(identifier: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(
      or(
        eq(users.username, identifier),
        eq(users.email, identifier)
      )
    )
    .limit(1)
    
  if (!user) return null
  return user.id
}

export async function findByIdentifier(identifier: string, password: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(
      or(
        eq(users.username, identifier),
        eq(users.email, identifier)
      )
    )
    
  if (!user) return null
  if (await Bun.password.verify(password, user.password)) return null
  
  return user
}

export async function findByEmailOrUsername(username: string, email: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(
      or(
        eq(users.username, username),
        eq(users.email, email)
      )
    )
    
  if (!user) return false  
  return true
}