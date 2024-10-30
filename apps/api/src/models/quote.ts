import { db } from '@/db'
import { eq, and, desc } from 'drizzle-orm'
import { prices } from '@/db/schema'
import { states } from '@/utils'

type Quote = typeof prices.$inferInsert

export async function add(quote: Quote) {
  const data = await db.insert(prices).values(quote).returning()
  return data
}

// Nova função para listar cidades de uma commodity e estado em uma data específica
export async function list(commodity: string, state: string) {
  const latestDate = await db
    .select({ createdAt: prices.createdAt })
    .from(prices)
    .where(
      and(
        eq(prices.commodity, commodity),
        eq(prices.state, state)
      )
    )
    .orderBy(desc(prices.createdAt))
    .limit(1) // Pega a data mais recente
  
  if (latestDate.length === 0) return []

  if (states.some(e => e.abbr.toLowerCase() === state.toLowerCase())) {
    return await db
    .select()
    .from(prices)
    .where(
      and(
        eq(prices.commodity, commodity),
        eq(prices.state, state.toLowerCase()),
        eq(prices.createdAt, latestDate[0].createdAt)
      )
    ) 
  } else {
    return await db
    .select()
    .from(prices)
    .where(
      and(
        eq(prices.commodity, commodity),
        eq(prices.createdAt, latestDate[0].createdAt)
      )
    ) 
  }
  // return await db.select().from(prices)
}
