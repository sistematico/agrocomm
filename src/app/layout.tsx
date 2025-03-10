import type { Metadata } from 'next'
import { Nunito, Geist, Geist_Mono } from 'next/font/google'
import '@/styles/main.scss'

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin']
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'AgroComm',
  description: 'Commodities Agropecuárias'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
