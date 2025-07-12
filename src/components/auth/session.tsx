'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { User } from '@/types'

export default function Account({ user }: { user: User }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch('/api/auth/session')
        const data = await response.json()
        setIsLoggedIn(data.isLoggedIn)
      } catch (error) {
        console.error('Erro ao verificar sessão:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    checkSession()
  }, [])
  
  if (isLoading) return <div className="w-20 h-10 bg-gray-200 animate-pulse rounded-md"></div>
  
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
          <form action="/api/auth/logout" method="post">
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