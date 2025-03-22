import { getPricesFromLocation } from '@/app/lib/prices'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ state: string }> }
) {
  const { state } = await params // 'a', 'b', or 'c'
  const estado = state.toUpperCase()

  try {
    const precos = await getPricesFromLocation(estado)
    return Response.json({
      estado,
      precos,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error(`Erro ao buscar preços para ${estado}:`, error)
    return Response.json(
      { error: `Falha ao buscar preços para ${estado}` },
      { status: 500 }
    )
  }
}
