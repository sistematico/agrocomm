import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_URL!, { max: 1 })
const db = drizzle(sql)

async function main() {
  await migrate(db, { migrationsFolder: './src/drizzle/migrations' })
  await sql.end()
}

main()
  .then(() => {
    console.log("🔥 database migrated")
    process.exit(0)
  })
  .catch((e) => {
    console.error(e)
    process.exit(0)
  })