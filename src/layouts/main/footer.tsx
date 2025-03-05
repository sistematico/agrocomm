import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-background py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
            <p className="text-sm text-gray-300">
              Somos especialistas em commodities agropecuárias, oferecendo
              informações atualizadas e análises de mercado para produtores e
              investidores.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/sobre"
                  className="hover:text-green-200 transition-colors"
                >
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos"
                  className="hover:text-green-200 transition-colors"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-green-200 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-green-200 transition-colors"
                >
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Commodities</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/soja"
                  className="hover:text-green-200 transition-colors"
                >
                  Soja
                </Link>
              </li>
              <li>
                <Link
                  href="/milho"
                  className="hover:text-green-200 transition-colors"
                >
                  Milho
                </Link>
              </li>
              <li>
                <Link
                  href="/cafe"
                  className="hover:text-green-200 transition-colors"
                >
                  Café
                </Link>
              </li>
              <li>
                <Link
                  href="/algodao"
                  className="hover:text-green-200 transition-colors"
                >
                  Algodão
                </Link>
              </li>
              <li>
                <Link
                  href="/boi-gordo"
                  className="hover:text-green-200 transition-colors"
                >
                  Boi Gordo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <address className="not-italic text-sm text-gray-300">
              <p>Rua Dom Aquino, 1849</p>
              <p>Campo Grande - MS</p>
              <p className="mt-2">agrocomm@agrocomm.com.br</p>
              <p>(67) 3027-9999</p>
            </address>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-black text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME!}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
