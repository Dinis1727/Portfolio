import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio – Dinis Félix',
  description: 'Full-stack / Back-end Engineer passionate about technology and innovation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100 antialiased transition-colors duration-500">
        
        {/* Fixed Navbar */}
        <Navbar />

        {/* Main content area */}
        <main className="flex justify-center items-start min-h-screen px-6 sm:px-10 pt-28 pb-24">
          <div className="w-full max-w-6xl p-12 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl shadow-black/50 backdrop-blur-lg transition-all duration-500 animate-fadeIn">
            {children}
          </div>
        </main>

        <footer className="mt-12 text-center text-sm text-slate-500 pb-6">
          © {new Date().getFullYear()} Dinis Félix — Built with <span className="text-indigo-400">Next.js</span>, <span className="text-cyan-400">Tailwind</span> & <span className="text-pink-400">Prisma ⚡</span>
        </footer>
      </body>
    </html>
  )
}
