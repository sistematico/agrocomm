import { eq, and, sql } from 'drizzle-orm'
import { db } from '-/db/index'
import * as schema from '-/db/schema'

export async function getQuotes(type: number) {  
  const quotes = await db
    .select()
    .from(schema.prices)
    .where(
      and(
        eq(schema.prices.commodityId, type),
        // (sql`(strftime('%s'))`),
        (sql`(abs(strftime('%s','now') - strftime('%s', ${schema.prices.createdAt})))`),
        // (sql`(abs(strftime('%s','now') - strftime('%s', ${schema.prices.createdAt})) < 86400)`),
      )
    )
  // await db.select().from(users).orderBy(users.name, users.name2);
  // await db.select().from(users).orderBy(asc(users.name), desc(users.name2));

  return quotes
}

const q = await getQuotes(1)

console.log(q)