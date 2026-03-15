'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  FileText,
  Github,
  Home,
  Instagram,
  Layers,
  Linkedin,
  Mail,
  Moon,
  Sun,
  User,
  type LucideIcon,
} from 'lucide-react'

type ThemeMode = 'dark' | 'light'
type Locale = 'pt' | 'en'

const NAV_LINKS: Record<Locale, Array<{ id: string; label: string; icon: LucideIcon }>> = {
  pt: [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'about-lead', label: 'Sobre Mim', icon: User },
    { id: 'stack', label: 'A Minha Stack', icon: Layers },
    { id: 'contact', label: 'Contactos', icon: Mail },
  ],
  en: [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about-lead', label: 'About Me', icon: User },
    { id: 'stack', label: 'My Stack', icon: Layers },
    { id: 'contact', label: 'Contacts', icon: Mail },
  ],
}

const LANGUAGE_OPTIONS = [
  { value: 'pt' as const, code: 'PT', label: 'Português', flag: '🇵🇹' },
  { value: 'en' as const, code: 'EN', label: 'English', flag: '🇬🇧' },
]

const PANEL_SOCIAL_LINKS: Array<{ label: string; href: string; external: boolean; icon: LucideIcon }> = [
  { label: 'Github', href: 'https://github.com/Dinis1727', external: true, icon: Github },
  { label: 'Linkedin', href: 'https://www.linkedin.com/in/dinis-f%C3%A9lix-4baa2030a/', external: true, icon: Linkedin },
  { label: 'Instagram', href: 'https://instagram.com/dinis.19_', external: true, icon: Instagram },
  { label: 'CV', href: '/Dinis-Felix-CV.pdf', external: true, icon: FileText },
]

const MENU_ICON_COLORS = ['text-amber-400', 'text-blue-500', 'text-teal-400', 'text-indigo-500']
const CONTACT_EMAIL = 'dinisdev1@gmail.com'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const [locale, setLocale] = useState<Locale>('pt')
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const languageMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const storedTheme = (localStorage.getItem('portfolio:theme') as ThemeMode | null) ?? 'dark'
    const storedLocale = (localStorage.getItem('portfolio:language') as Locale | null) ?? 'pt'

    setTheme(storedTheme)
    setLocale(storedLocale)

    document.documentElement.setAttribute('data-theme', storedTheme)

    window.dispatchEvent(
      new CustomEvent('portfolio:settings-changed', {
        detail: { theme: storedTheme, language: storedLocale },
      }),
    )
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!languageMenuRef.current) return
      if (languageMenuRef.current.contains(event.target as Node)) return
      setLanguageMenuOpen(false)
    }

    window.addEventListener('mousedown', handleClickOutside)
    return () => window.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    root.classList.add('theme-switching')

    setTheme(nextTheme)
    localStorage.setItem('portfolio:theme', nextTheme)
    root.setAttribute('data-theme', nextTheme)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        root.classList.remove('theme-switching')
      })
    })

    window.dispatchEvent(
      new CustomEvent('portfolio:settings-changed', {
        detail: { theme: nextTheme, language: locale },
      }),
    )
  }

  const handleLanguageChange = (nextLocale: Locale) => {
    setLocale(nextLocale)
    localStorage.setItem('portfolio:language', nextLocale)
    window.dispatchEvent(
      new CustomEvent('portfolio:settings-changed', {
        detail: { theme, language: nextLocale },
      }),
    )
  }

  const isLight = theme === 'light'
  const links = NAV_LINKS[locale]
  const activeLanguage = LANGUAGE_OPTIONS.find(option => option.value === locale) ?? LANGUAGE_OPTIONS[0]
  const menuOverlayClass = isLight ? 'bg-white/20 backdrop-blur-md' : 'bg-slate-950/28 backdrop-blur-md'
  const menuPanelClass = isLight
    ? 'border-slate-200 bg-white text-slate-900'
    : 'border-slate-800 bg-[#020617] text-slate-100'
  const menuSubtleTextClass = isLight ? 'text-slate-500' : 'text-slate-300/60'
  const menuLinkTextClass = isLight ? 'text-slate-800 hover:text-slate-950' : 'text-slate-100/92 hover:text-white'
  const menuCloseClass = isLight ? 'text-slate-700 hover:text-slate-900' : 'text-slate-100/90 hover:text-white'

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      scrollToTop()
      return
    }

    const section = document.getElementById(id)
    if (!section) return

    const customOffsetBySection: Record<string, number> = {
      'about-lead': 150,
      stack: 150,
    }

    const offset = customOffsetBySection[id]

    if (typeof offset === 'number') {
      const targetTop = section.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' })
    } else {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    setMenuOpen(false)
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 h-[72px] backdrop-blur ${
          isLight ? 'bg-white/95 text-slate-900' : 'bg-slate-950/95 text-slate-100'
        }`}
      >
        <div className={`header-scroll-line ${isScrolled ? 'is-visible' : ''}`} />
        <div className="flex h-full w-full items-center justify-between px-6 sm:px-10">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center text-left"
          >
            <Image
              src="/logo.png"
              alt="Logo Dinis"
              width={64}
              height={64}
              priority
              className={isLight ? 'brightness-0 saturate-100' : ''}
            />
          </button>

          <div className="flex items-center gap-5 text-sm">
            <div className="relative hidden sm:block" ref={languageMenuRef}>
              <button
                type="button"
                onClick={() => setLanguageMenuOpen(prev => !prev)}
                className={`inline-flex items-center gap-2 rounded-md bg-transparent px-3 py-1.5 text-sm transition focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${
                  isLight ? 'text-slate-900 hover:text-indigo-600' : 'text-slate-100 hover:text-indigo-300'
                }`}
              >
                <span className="text-base leading-none">{activeLanguage.flag}</span>
                <span>{activeLanguage.label}</span>
              </button>

              {languageMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 overflow-hidden rounded-sm border border-slate-700 bg-slate-950 shadow-xl"
                >
                  {LANGUAGE_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        handleLanguageChange(option.value)
                        setLanguageMenuOpen(false)
                      }}
                      className={`flex w-full items-center gap-3 border-b border-slate-800 px-4 py-3 text-left text-sm transition last:border-b-0 ${
                        locale === option.value
                          ? 'bg-slate-700 text-slate-100'
                          : 'text-slate-100 hover:bg-slate-900'
                      }`}
                    >
                      <span className="w-7 text-lg leading-none">{option.flag}</span>
                      <span className="text-sm">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              aria-label="Tema"
              className="hover:text-indigo-400 transition focus:ring-0"
              type="button"
              onClick={toggleTheme}
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              aria-label="Menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`hamburgerButton ${menuOpen ? 'is-open' : ''} hover:text-indigo-400`}
              type="button"
              onClick={() => setMenuOpen(prev => !prev)}
            >
              <span className="hamburgerLine line1" />
              <span className="hamburgerLine line2" />
              <span className="hamburgerLine line3" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <>
          <button
            aria-label="Fechar menu"
            className={`fixed inset-0 z-[60] ${menuOverlayClass}`}
            onClick={() => setMenuOpen(false)}
          />
          <aside
            id="mobile-menu"
            className={`animate-scaleIn fixed right-0 top-0 z-[70] h-screen w-full max-w-[460px] border-l p-8 shadow-2xl ${menuPanelClass}`}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-end">
                <button
                  aria-label="Close menu"
                  className={`hamburgerButton is-open ${menuCloseClass}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="hamburgerLine line1" />
                  <span className="hamburgerLine line2" />
                  <span className="hamburgerLine line3" />
                </button>
              </div>

              <div className="mt-28 grid grid-cols-2 gap-10">
                <div>
                  <p className={`text-xs uppercase tracking-[0.22em] ${menuSubtleTextClass}`}>SOCIAL</p>
                  <div className="mt-7 flex flex-col gap-4">
                    {PANEL_SOCIAL_LINKS.map(item => {
                      const Icon = item.icon

                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                          className={`inline-flex items-center gap-2.5 text-[1.05rem] font-medium transition ${menuLinkTextClass}`}
                        >
                          <Icon size={16} className="shrink-0 opacity-90" />
                          <span>{item.label}</span>
                        </a>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <p className={`text-xs uppercase tracking-[0.22em] ${menuSubtleTextClass}`}>MENU</p>
                  <nav className="mt-7 flex flex-col gap-4">
                    {links.map((item, index) => {
                      const Icon = item.icon

                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`inline-flex items-center gap-3 text-left text-[1.2rem] leading-none font-medium transition sm:text-[1.35rem] ${menuLinkTextClass}`}
                          onClick={() => {
                            scrollToSection(item.id)
                            setMenuOpen(false)
                          }}
                        >
                          <Icon size={17} className={`shrink-0 ${MENU_ICON_COLORS[index % MENU_ICON_COLORS.length]}`} />
                          <span>{item.label}</span>
                        </button>
                      )
                    })}
                  </nav>
                </div>
              </div>

              <div className="mt-auto pt-14">
                <p className={`text-xs uppercase tracking-[0.2em] ${menuSubtleTextClass}`}>GET IN TOUCH</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className={`mt-4 inline-block text-[1.03rem] ${menuLinkTextClass}`}>
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  )
}
