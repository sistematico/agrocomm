import { getPrices } from '@/lib/prices'

export const revalidate = 60

export async function GET() {
  const data = await getPrices()
  return Response.json(data)
}
