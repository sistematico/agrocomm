import Layout from '@/layouts/main'

export default function Home() {
  return (
    <Layout>
      <div className="space-y-6">
        <section className="bg-background p-6 rounded-lg border border-black/20">
          <h1 className="text-3xl font-bold mb-4">Bem-vindo à AgroComm</h1>
          <p className="mb-4">
            Sua fonte confiável de informações sobre o mercado agropecuário.
            Acompanhe cotações, tendências e análises para tomar as melhores
            decisões para o seu negócio.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/mercado"
              className="bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition-colors"
            >
              Análise de Mercado
            </a>
            <a
              href="/cotacoes"
              className="bg-white text-green-700 border border-green-700 px-5 py-2 rounded-md hover:bg-green-50 transition-colors"
            >
              Ver Cotações
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Principais Commodities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Soja', 'Milho', 'Café', 'Algodão', 'Boi Gordo', 'Trigo'].map(
              (commodity) => (
                <div
                  key={commodity}
                  className="bg-background p-4 rounded-lg border border-black/20 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold mb-2">{commodity}</h3>
                  <p className="text-sm mb-3">
                    Informações atualizadas sobre o mercado de{' '}
                    {commodity.toLowerCase()}.
                  </p>
                  <a
                    href={`/cotacoes/${commodity.toLowerCase().replace(' ', '-')}`}
                    className="text-green-700 text-sm font-medium hover:underline"
                  >
                    Ver detalhes →
                  </a>
                </div>
              )
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            Últimas Análises de Mercado
          </h2>
          <div className="space-y-4">
            {[
              'Perspectivas para a safra de soja 2024/2025',
              'Impacto do clima na produção de milho no Centro-Oeste',
              'Tendências do mercado internacional de café'
            ].map((title, index) => (
              <div
                key={index}
                className="bg-background p-4 rounded-lg border border-black/20"
              >
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="mb-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(Date.now() - index * 86400000).toLocaleDateString(
                      'pt-BR'
                    )}
                  </span>
                  <a
                    href={`/analises/${index}`}
                    className="text-green-700 text-sm font-medium hover:underline"
                  >
                    Ler mais →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
