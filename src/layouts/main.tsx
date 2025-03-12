import { Header } from './header'
import { Footer } from './footer'
import { Sidebar } from './sidebar'

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-nunito)]">
      <Header />
      <div className="flex flex-col md:flex-row flex-1 pt-16">
        <main className="flex-1 p-4">{children}</main>
        <Sidebar />
      </div>
      <Footer />
    </div>
  )
}