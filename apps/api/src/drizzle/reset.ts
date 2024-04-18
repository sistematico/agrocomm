// https://gist.github.com/sistematico/45545758b45110f17364edd9551d45aa
// https://gist.github.com/ThimoDEV/b071dc83308d6b0a5e165efb6efa4902

import { drizzle } from 'drizzle-orm/postgres-js'
import { sql } from 'drizzle-orm'
import postgres from 'postgres'
import * as schema from './schema'

export const client = postgres(process.env.DATABASE_URL!)
export const db = drizzle(client, { schema })

async function reset() {
  console.log("🗑️ Emptying the entire database")
  await db.execute(sql`truncate table users restart identity cascade;`)
  await db.execute(sql`truncate table profiles restart identity cascade;`)
  await db.execute(sql`truncate table plans restart identity cascade;`)
  await db.execute(sql`truncate table states restart identity cascade;`)
  await db.execute(sql`truncate table cities restart identity cascade;`)
  await db.execute(sql`truncate table commodities restart identity cascade;`)
  await db.execute(sql`truncate table prices restart identity cascade;`)
  console.log("✅ Database emptied")
}

reset()
  .then(() => {
    console.log("🚀 database reseted")
    process.exit(0)
  })
  .catch((e) => {
    console.error(e)
    process.exit(0)
  })