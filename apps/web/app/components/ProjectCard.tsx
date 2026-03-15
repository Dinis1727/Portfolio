'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  demoUrl?: string
  className?: string
}

type Locale = 'pt' | 'en'
type ThemeMode = 'dark' | 'light'

export default function ProjectCard({ title, description, tags, demoUrl, className }: ProjectCardProps) {
  const [locale, setLocale] = useState<Locale>('pt')
  const [theme, setTheme] = useState<ThemeMode>('dark')

  useEffect(() => {
    const storedLocale = (localStorage.getItem('portfolio:language') as Locale | null) ?? 'pt'
    const storedTheme = (localStorage.getItem('portfolio:theme') as ThemeMode | null) ?? 'dark'
    setLocale(storedLocale)
    setTheme(storedTheme)

    const onSettingsChanged = (event: Event) => {
      const detail = (event as CustomEvent<{ language?: Locale; theme?: ThemeMode }>).detail
      if (detail?.language) setLocale(detail.language)
      if (detail?.theme) setTheme(detail.theme)
    }

    window.addEventListener('portfolio:settings-changed', onSettingsChanged)
    return () => window.removeEventListener('portfolio:settings-changed', onSettingsChanged)
  }, [])

  const isLight = theme === 'light'

  return (
    <article
      className={`rounded-2xl border p-6 transition ${
        isLight
          ? 'border-[#d1d5db] bg-[#eceff3] hover:border-[#b0b8c4]'
          : 'border-slate-700 bg-slate-900/60 hover:border-indigo-400'
      } ${className ?? ''}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-lg font-semibold ${isLight ? 'text-slate-800' : 'text-slate-100'}`}>{title}</h3>
        {demoUrl && (
          <Link
            href={demoUrl}
            target="_blank"
            className={`text-sm font-medium transition ${isLight ? 'text-[#60a5fa] hover:text-[#06b6d4]' : 'text-indigo-400 hover:text-indigo-300'}`}
          >
            {locale === 'pt' ? 'Ver →' : 'View →'}
          </Link>
        )}
      </div>

      <p className={`text-sm mb-4 leading-relaxed text-justify ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{description}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span
            key={tag}
            className={`text-xs px-3 py-1 border rounded-full ${
              isLight ? 'border-[#cbd5e1] bg-[#f8fafc] text-slate-600' : 'border-slate-700 text-slate-400'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}
