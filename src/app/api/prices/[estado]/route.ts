import { getPricesFromLocation } from '@/app/lib/prices'

export async function GET(request: Request, { params }: { params: { estado: string } }) {
  const estado = params.estado.toUpperCase()

  try {
    const precos = await getPricesFromLocation(estado)
    return Response.json({ estado, precos, timestamp: new Date().toISOString() })
  } catch (error) {
    console.error(`Erro ao buscar preços para ${estado}:`, error)
    return Response.json(
      { error: `Falha ao buscar preços para ${estado}` },
      { status: 500 }
    )
  }
}
