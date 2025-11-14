'use client'

import Link from 'next/link'
import Image from 'next/image'
import Contact from './Contact'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-10 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/80 backdrop-blur-md border-b border-slate-800'
          : 'bg-transparent'
      }`}
    >
      {/* Animation Navbar */}
      <div
        className={`absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 opacity-0 transition-opacity duration-700 ${
          isScrolled ? 'opacity-100 animate-gradient-move' : ''
        }`}
      ></div>

      <div className="max-w-6xl mx-auto flex items-center justify-between py-6 relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-wb.png"
            alt="Dinis Félix logo"
            width={70}
            height={70}
            priority
            className="hover:scale-105 transition-transform drop-shadow-[0_0_22px_rgba(79,70,229,0.55)]"
          />
          <div className="leading-tight">
            <p className="text-white font-semibold tracking-wide text-lg">DINIS FÉLIX</p>
            <p className="text-cyan-300 tracking-[0.35em] text-sm">FULL-STACK</p>
          </div>
        </Link>

        {/* Navigation links */}
        <ul className="hidden sm:flex items-center gap-6 text-slate-300 text-sm">
          <li>
            <Link href="#about" className="hover:text-indigo-300 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="#projects" className="hover:text-indigo-300 transition">
              Projects
            </Link>
          </li>
          <li>
            <Contact />
          </li>
        </ul>
      </div>
    </nav>
  )
}
