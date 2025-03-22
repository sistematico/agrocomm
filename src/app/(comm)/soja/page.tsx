import Link from 'next/link'
import Layout from '@/layouts/main'
import { getPrices } from '@/app/lib/prices'

// interface SojaItem {
//   id: number
//   commodity?: string
//   state?: string
//   city?: string
//   price: number
//   variation: boolean | number
//   createdAt: string | Date
//   source: string
// }

// 2nd way, using currency
function formatCurrency(value: number) {
  const moneyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })

  return moneyFormatter.format(value / 100)
}

export default async function Soja() {
  const data = await getPrices()
  const lastUpdate = data[0]?.createdAt.toString()
  

  return (
    <Layout>
      <div className="space-y-6">
        <section className="bg-background p-6 rounded-lg border border-black/20">
          <h1 className="text-3xl font-bold mb-4">Soja</h1>
          {(data && lastUpdate) && (
            <>
              <p className="mb-4">
                A soja é uma das principais commodities do Brasil. Veja abaixo a
                cotação atualizada para o dia {data[0].createdAt.toString()}.
              </p>
              <table className="table-auto w-full border border-black/20 mb-3">
                <thead>
                  <tr className="border-b border-b-black/20">
                    <th className="px-3 py-2">Valor</th>
                    <th className="px-3 py-2">Estado</th>
                    <th className="px-3 py-2">Cidade</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr className="border-b border-b-black/20" key={item.id}>
                      <td className="px-3 py-2 border-r border-r-black/20">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-3 py-2 border-r border-r-black/20">
                        {item.state}
                      </td>
                      <td className="px-3 py-2">{item.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) || (
            <p>Não há dados disponíveis.</p>
          )}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition-colors"
            >
              Voltar
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  )
}
