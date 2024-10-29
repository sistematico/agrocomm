import { db } from '@/db'
// import { eq } from 'drizzle-orm'
import { users } from '@/db/schema'

type User = typeof users.$inferInsert

export async function list() {
  return await db.select().from(users)
}

export async function add(user: User) {
  const userId = await db.insert(users).values(user).returning({ id: users.id })
  return userId
}

// async function main() {
  // const user: typeof users.$inferInsert = {
  //   fullname: 'Lucas Brum',
  //   username: 'lucas',
  //   email: 'john@example.com',
  //   password: '123'
  // };

  // await db.insert(users).values(user)
  // console.log('New user created!')

  // const allUsers = await db.select().from(users)
  // console.log('Getting all users from the database: ', allUsers)

  // await db.update(users).set({ username: 'test' }).where(eq(users.email, user.email))
  // console.log('User info updated!')

  // await db.delete(users).where(eq(users.email, user.email));
  // console.log('User deleted!')
// }

// main()