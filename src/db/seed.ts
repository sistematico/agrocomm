import { drizzle } from 'drizzle-orm/node-postgres'
import { eq } from 'drizzle-orm'
import { users } from './schema'

const db = drizzle(process.env.DATABASE_URL!)

async function main() {
  const user: typeof users.$inferInsert = {
    name: 'John',
    age: 30,
    email: 'john@example.com'
  }

  await db.insert(users).values(user)
  console.log('New user created!')

  const userList = await db.select().from(users)
  console.log('Getting all users from the database: ', userList)

  await db
    .update(users)
    .set({
      age: 31
    })
    .where(eq(users.email, user.email))
  console.log('User info updated!')

  await db.delete(users).where(eq(users.email, user.email))
  console.log('User deleted!')
}

main()
