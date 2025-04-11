'use client'

import Link from 'next/link'
import { logout } from '@/actions'

export default function AccountUI({ isLogged }: { isLogged: boolean }) {
  return (
    <>
      {isLogged ? (
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