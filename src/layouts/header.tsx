import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import AccountMenu from '@/components/navbar/account'

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
    <header className="w-full bg-background">
      <nav className="bg-background text-foreground border-b-2 border-black/20 px-2 md:px-0 py-2.5 shadow-sm">
        <div className="flex flex-wrap justify-between items-center mx-auto container">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/ogp.png"
              className="mr-[.35em] h-8 sm:h-9"
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
                    className={`block py-2 pr-4 pl-3 lg:p-0 dark:text-white/50 transition-colors duration-200
                      ${
                        pathname == item.href
                          ? 'text-white font-semibold'
                          : 'text-gray-800 hover:text-white'
                      }`}
                    aria-current={pathname === item.href ? 'page' : 'false'}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center lg:order-2">
            <AccountMenu />

            {/* Burger menu for mobile */}
            <button
              className="md:hidden text-gray-800 focus:outline-none"
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
            <div className="md:hidden absolute top-full left-0 w-full bg-background z-20">
              <div className="container mx-auto p-4 border-t border-black/10 shadow-lg">
                <nav className="flex flex-col space-y-3">
                  {menuItems.map((item) => (
                    <Link
                      href={item.href}
                      className={`transition-colors ${
                        pathname === item.href
                          ? 'text-green-700 font-semibold'
                          : 'text-gray-800 hover:text-green-700'
                      }`}
                      key={item.name}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
