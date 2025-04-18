// import Link from 'next/link'

export function FooterNav() {
  return (
    // <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
      <div>
        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
          Legal
        </h2>
        <ul className="text-gray-600 dark:text-gray-400">
          <li className="mb-4">
            <a href="#" className="hover:underline">
              Política de Privacidade
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Termos &amp; Condições
            </a>
          </li>
        </ul>
      </div>
    // </div>
  )
}
