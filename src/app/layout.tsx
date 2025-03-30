import type { Metadata } from 'next'
// import { Nunito, Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import '@/styles/main.scss'

// const nunito = Nunito({
//   variable: '--font-nunito-sans',
//   subsets: ['latin']
// })

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// })

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// })

const nunito = localFont({
  src: '../fonts/nunito/nunito.woff2',
  variable: '--font-nunito-sans',
  display: 'swap'
})

const geistSans = localFont({
  src: '../fonts/geist/Geist-Regular.woff2',
  variable: '--font-geist-sans',
  display: 'swap'
})

const geistMono = localFont({
  src: '../fonts/geist_mono/GeistMono-Regular.woff2',
  variable: '--font-geist-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: process.env.NEXT_PUBLIC_APP_DESC,
  icons: '/images/favicon.ico',
  openGraph: {
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: process.env.NEXT_PUBLIC_APP_DESC,
    type: 'website',
    locale: 'pt_BR',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: process.env.NEXT_PUBLIC_APP_NAME,
    images: [{ url: `${process.env.NEXT_PUBLIC_APP_URL}/images/ogp.png` }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
