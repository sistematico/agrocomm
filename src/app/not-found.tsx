import Link from 'next/link'
import Layout from '@/layouts/main'

export default function NotFound() {
  return (
    <Layout>
      <div className="space-y-6">
        <section className="bg-background p-6 rounded-lg border border-black/20">
          <h1 className="text-3xl font-bold mb-4">Erro 404</h1>
          <p className="mb-4">
            Página não encontrada. Por favor, verifique o endereço digitado e
            tente novamente.
          </p>
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
