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
export async function listByState(commodity: string, state: string) {
  const [latestDate] = await db
    .select({ createdAt: prices.createdAt })
    .from(prices)
    .where(
      and(
        eq(prices.commodity, commodity),
        eq(prices.state, state.toUpperCase())
      )
    )
    .orderBy(desc(prices.createdAt))
    .limit(1)
    
  if (!latestDate) return []
  
  if (states.some(e => e.abbr === state.toUpperCase())) {
    return await db
      .select()
      .from(prices)
      .where(
        and(
          eq(prices.commodity, commodity),
          eq(prices.state, state.toUpperCase()),
          eq(prices.createdAt, latestDate.createdAt)
        )
      ).orderBy(prices.state, prices.city)
  } 

  return []
}

export async function listAll(commodity: string) {
  const [latestDate] = await db
    .select({ createdAt: prices.createdAt })
    .from(prices)
    .where(eq(prices.commodity, commodity))
    .orderBy(desc(prices.createdAt))
    .limit(1)
  
  if (!latestDate) return []
  
  return await db
    .select()
    .from(prices)
    .where(
      and(
        eq(prices.commodity, commodity),
        eq(prices.createdAt, latestDate.createdAt)
      )
    ).orderBy(prices.state, prices.city) 
}
