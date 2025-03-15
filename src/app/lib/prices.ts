import { db } from '@/db'
import { prices } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function getPrices() {
  const priceList = await db.select().from(prices)
  return priceList
}

export async function getPricesFromLocation(location: string) {
  const priceList = await db.select().from(prices).where(eq(prices.state, location))
  return priceList
}