import { db } from '@/db'
import { users } from '@/db/schema'

const password = await Bun.password.hash('agrocomm')

async function main() {
  const user: typeof users.$inferInsert = {
    name: 'AgroComm',
    username: 'agrocomm',
    email: 'agrocomm@agrocomm.com.br',
    password,
    role: 'admin'
  }

  await db.insert(users).values(user).onConflictDoNothing()
}

main()
