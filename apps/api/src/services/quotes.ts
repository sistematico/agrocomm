import { add, listAll, listByState } from '@/models/quote'

export async function addPrice(price: number, commodity: string, city: string, state: string) {
  const quote = add({ price, commodity, city, state })
  if (!quote) return { message: 'Error creating quote' }
  return { message: 'Quote created', quote }
}

export async function pricesByState(commodity: string, state: string) {
  return await listByState(commodity, state)
}

export async function allPrices(commodity: string) {
  return await listAll(commodity)
}