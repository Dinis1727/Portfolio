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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
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

      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4 relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Dinis Félix logo"
            width={40}
            height={40}
            priority
            className="hover:scale-110 transition-transform drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]"
          />
          <span className="sr-only">Dinis Félix</span>
        </Link>

        {/* 🔹 Navigation links */}
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
