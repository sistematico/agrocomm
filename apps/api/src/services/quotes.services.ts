import { eq, sql, or } from 'drizzle-orm'
import { db } from '-/db/index'
import * as schema from '-/db/schema'
import { getCurrentDate } from '@/utils'

export async function getQuotes(type: string) {  
  const now = getCurrentDate()
  
  const prices = db
    .select()
    .from(schema.prices)
    .where(eq(schema.prices.commodity, type))
    .as('prices')

  const quotes = await db
    .select()
    .from(prices)
    .where(
      or(
        eq(schema.prices.createdAt, now),
        sql`(abs(strftime('%s','now') - strftime('%s', '${schema.prices.createdAt}')))`
      )
    )
    .orderBy(schema.prices.state)

  return quotes
}