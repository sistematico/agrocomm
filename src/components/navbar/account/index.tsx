import Link from 'next/link'
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { logout } from '@/actions'

export default async function Account() {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  const isLoggedIn = !!session?.userId

  return (
    <>
      {isLoggedIn ? (
        <div className="flex items-center gap-3">
          <Link
            href="/conta"
            className="bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition-colors duration-500"
          >
            Minha conta
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="bg-red-700 text-white px-5 py-2 rounded-md hover:bg-red-800 transition-colors duration-500"
            >
              Sair
            </button>
          </form>
        </div>
      ) : (
        <>
          <Link
            href="/entrar"
            className="bg-green-900 text-white px-5 py-2 rounded-md hover:bg-green-800 transition-colors"
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