import { sql } from 'drizzle-orm'
import { db } from '@/drizzle'
import * as schema from '@/drizzle/schema'

export async function login(identifier: string, password: string) { 
  const hash = await Bun.password.hash(password)

  const user = (await db
    .select()
    .from(schema.users)
    .where(
      sql`${schema.users.username} = ${identifier} or ${schema.users.email} = ${identifier} and ${schema.users.password} = ${hash}`
    ))[0]

  return user
}

export async function register(username: string, email: string, password: string) {  
  const hash = await Bun.password.hash(password)

  const user = (await db
    .insert(schema.users)
    .values({ username, email, password: hash })
    .onConflictDoNothing()
    .returning())[0]

  if (!user) return 'Usuário já existe'
  
  const profile = await db
    .insert(schema.profiles)
    .values({ userId: user.id })
    .onConflictDoNothing()
    .returning()

  return JSON.stringify(user) + JSON.stringify(profile)
}