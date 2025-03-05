'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-green-800 text-white z-50 h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo - left on desktop, centered on mobile */}
        <div className="flex-1 md:flex-none pr-0 md:pr-5">
          <Link
            href="/"
            className="flex items-center justify-center md:justify-start"
          >
            <div className="relative h-10 w-10 mr-0 md:mr-2">
              <Image
                src="/images/favicon.svg"
                alt={process.env.NEXT_PUBLIC_APP_NAME!}
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold hidden md:inline">AgroComm</h2>
          </Link>
        </div>

        {/* Burger menu for mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:text-green-200 transition-colors">
            Início
          </Link>
          <Link
            href="/produtos"
            className="hover:text-green-200 transition-colors"
          >
            Produtos
          </Link>
          <Link
            href="/mercado"
            className="hover:text-green-200 transition-colors"
          >
            Mercado
          </Link>
          <Link
            href="/cotacoes"
            className="hover:text-green-200 transition-colors"
          >
            Cotações
          </Link>
          <Link
            href="/contato"
            className="hover:text-green-200 transition-colors"
          >
            Contato
          </Link>
          <div className="flex items-center space-x-2 ml-4">
            <Link
              href="/login"
              className="px-4 py-2 border border-white rounded hover:bg-white hover:text-green-800 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/cadastro"
              className="px-4 py-2 bg-white text-green-800 rounded hover:bg-green-200 transition-colors"
            >
              Cadastro
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-700 absolute w-full">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3 py-4">
              <Link
                href="/"
                className="hover:text-green-200 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                href="/produtos"
                className="hover:text-green-200 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Produtos
              </Link>
              <Link
                href="/mercado"
                className="hover:text-green-200 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Mercado
              </Link>
              <Link
                href="/cotacoes"
                className="hover:text-green-200 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Cotações
              </Link>
              <Link
                href="/contato"
                className="hover:text-green-200 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
              <div className="flex flex-col space-y-2 pt-2 border-t border-green-600">
                <Link
                  href="/login"
                  className="px-4 py-2 border border-white rounded text-center hover:bg-white hover:text-green-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/cadastro"
                  className="px-4 py-2 bg-white text-green-800 rounded text-center hover:bg-green-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cadastro
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
