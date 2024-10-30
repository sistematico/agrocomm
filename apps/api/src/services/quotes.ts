import { add, list } from '@/models/quote'

export async function addQuote(price: number, commodity: string, city: string, state: string) {
  const quote = add({ price, commodity, city, state })
  if (!quote) return { message: 'Error creating quote' }
  return { message: 'Quote created', quote }
}

export async function quotes(commodity: string, state = 'all') {
  return await list(commodity, state)
}