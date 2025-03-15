'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/layouts/header'
import { Footer } from '@/layouts/footer'
import { Sidebar } from '@/layouts/sidebar'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header fixado no topo */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
      </div>
      
      {/* Espaço para compensar o header fixo */}
      <div className="h-[64px]"></div> {/* Ajuste essa altura de acordo com o tamanho do seu header */}
      
      {/* Conteúdo principal */}
      <div className="container mx-auto flex-grow">
        <div className="flex flex-col md:flex-row">
          <main className="flex-1 py-4 md:pr-4">
            {children}
          </main>
          {pathname === '/' && (
            <Sidebar />
          )}
        </div>
      </div>
      
      {/* Footer sempre no final */}
      <Footer />
    </div>
  )
}