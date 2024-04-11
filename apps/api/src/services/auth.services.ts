import { eq, sql, or } from 'drizzle-orm'
import { db } from '-/db/index'
import * as schema from '-/db/schema'
import { getCurrentDate } from '@/utils'


// export const users = sqliteTable('users', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   username: text('username').unique().notNull(),
//   email: text('email').unique().notNull(),
//   name: text('name').notNull(),
//   role: text('role').notNull().default('user'),
//   password: text('password').notNull(),
//   createdAt: text('created_at').notNull().default(now)
// })


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