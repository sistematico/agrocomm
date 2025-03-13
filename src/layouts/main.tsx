'use client'

import { usePathname } from 'next/navigation'
import { Header } from './header'
import { Footer } from './footer'
import { Sidebar } from './sidebar'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row flex-1">
          <main className="flex-1 py-4 md:pr-4">
            {children}
          </main>
          {pathname === '/' && (
            <Sidebar />
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}