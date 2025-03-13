import Link from 'next/link'

export function Sidebar() {
  return (
    <aside className="w-full mt-4 md:w-80 bg-background p-4 border border-black/20 rounded-lg">
      <div className="sticky top-0">
        {' '}
        {/* top-20 accounts for header + small gap */}
        {/* Cotações */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 pb-2 border-b border-black/20">
            Cotações do Dia
          </h3>
          <ul className="space-y-3">
            {['Soja', 'Milho', 'Café', 'Algodão', 'Boi Gordo'].map(
              (commodity) => (
                <li
                  key={commodity}
                  className="flex justify-between items-center"
                >
                  <span className="font-medium">{commodity}</span>
                  <span className="text-green-600" suppressHydrationWarning>
                    R$ {(Math.random() * 100 + 50).toFixed(2)}
                  </span>
                </li>
              )
            )}
          </ul>
          <Link
            href="/cotacoes"
            className="block mt-3 text-sm hover:text-green-900 font-medium"
          >
            Ver todas as cotações →
          </Link>
        </div>
        {/* Notícias */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 pb-2 border-b border-black/20">
            Últimas Notícias
          </h3>
          <ul className="space-y-3">
            {[
              'Safra de soja deve bater recorde em 2024',
              'Exportações de milho crescem 15% no trimestre',
              'Clima afeta produção de café no Sul de Minas',
              'Preço do boi gordo tem alta de 5% em abril'
            ].map((news, index) => (
              <li key={index}>
                <Link
                  href={`/noticias/${index}`}
                  className="text-sm hover:text-green-700"
                >
                  {news}
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(Date.now() - index * 86400000).toLocaleDateString(
                    'pt-BR'
                  )}
                </p>
              </li>
            ))}
          </ul>
          <Link
            href="/noticias"
            className="block mt-3 text-sm text-green-700 hover:text-green-900 font-medium"
          >
            Ver todas as notícias →
          </Link>
        </div>
        {/* Newsletter */}
        <div className="p-4 rounded-lg border border-black/20">
          <h3 className="text-lg font-semibold mb-2">
            Boletim Informativo
          </h3>
          <p className="text-sm mb-3">
            Receba atualizações diárias sobre o mercado de commodities.
          </p>
          <form className="space-y-2">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="w-full px-3 py-2 border border-black/20 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 px-4 rounded text-sm hover:bg-green-800 transition-colors"
            >
              Inscrever-se
            </button>
          </form>
        </div>
      </div>
    </aside>
  )
}