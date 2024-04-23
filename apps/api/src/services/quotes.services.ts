import { eq, and, sql } from 'drizzle-orm'
import { db } from '@/drizzle'
import * as schema from '@/drizzle/schema'

export async function getQuotes(type: string) {
  const closest = await db
    .select()
    .from(schema.prices)
    .orderBy(sql`ABS(EXTRACT(EPOCH FROM AGE(NOW(), ${schema.prices.createdAt})))`)
    .limit(1)

  const quotes = await db
    .select()
    .from(schema.prices)
    .where(
      and(
        eq(schema.prices.commodity, type),
        eq(schema.prices.createdAt, closest[0].createdAt)
      )
    )
    .orderBy(schema.prices.state, schema.prices.city)

  return quotes
}