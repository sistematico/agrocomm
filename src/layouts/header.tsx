'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const menuItems = [
  { name: 'Início', href: '/' },
  { name: 'Cotações', href: '/cotacoes' }
]

export function Header() {
  const pathname = usePathname()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header>
      <nav className="bg-background text-foreground border-b-2 border-black/20 px-2 md:px-0 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto container">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/favicon.svg"
              className="mr-3 h-8 sm:h-9"
              alt={process.env.NEXT_PUBLIC_APP_NAME!}
              width={36}
              height={36}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </span>
          </Link>

          {/* Menu for desktop */}
          <div className="hidden lg:flex lg:space-x-8">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                    aria-current={pathname === item.href ? 'page' : 'false'}                    
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center lg:order-2">
            <a
              href="#"
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Log in
            </a>

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
          </div>

          {/* Menu for mobile */}
          {isMenuOpen && (
            <div className="md:hidden absolute w-full">
              <div className="container mx-auto p-4">
                <nav className="flex flex-col space-y-3">
                  {menuItems.map((item) => (
                    <Link
                      href={item.href}
                      className="hover:text-green-200 transition-colors"
                      key={item.name}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                  >
                    {item.name}
                    {pathname === item.href ? 'aria-current="page"' : ''}
                  </a>
                </li>
              ))} 
            </ul>
          </div> */}
        </div>
      </nav>
    </header>
  )
}
