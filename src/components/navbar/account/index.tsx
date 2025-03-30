import Link from 'next/link'
// import { verifySession } from '@/app/lib/session'

export default function Account() {
  const session = null

  return (
    <>
      {session ? (
        <Link
          href="/conta"
          className="bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition-colors duration-500"
        >
          Minha conta
        </Link>
      ) : (
        <>
          <Link
            href="/entrar"
            className="bg-green-900 px-5 py-2 rounded-md hover:bg-green-800 transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition-colors duration-500"
          >
            Cadastro
          </Link>
        </>
      )}
    </>
  )
}
