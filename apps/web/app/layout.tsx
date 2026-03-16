import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Portfolio | Dinis Félix',
  description: 'Full-stack / Backend Engineer passionate about technology and innovation.',
  icons: {
    icon: '/icon.ico?v=5',
    shortcut: '/icon.ico?v=5',
    apple: '/icon.ico?v=5',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={`${inter.className} min-h-screen bg-slate-950 text-slate-100 antialiased transition-colors duration-500`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
