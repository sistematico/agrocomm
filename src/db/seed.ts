import { db } from '@/db'
import { users } from '@/db/schema'
import { hashPassword, generateSalt } from '@/lib/auth'

const password = await hashPassword('agrocomm', generateSalt())

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
