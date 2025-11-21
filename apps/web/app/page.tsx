'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Contact from './components/Contact'
import ProjectCard from './components/ProjectCard'
import { Github, Linkedin, Mail, Instagram } from 'lucide-react'

const fullName = 'Dinis Félix'

export default function Home() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [typedName, setTypedName] = useState('')
  const [caretVisible, setCaretVisible] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
        const res = await fetch(`${base}/projects`)
        const data = await res.json()
        setProjects(data)
      } catch (err) {
        console.error('Failed to fetch projects:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    let index = 0
    setTypedName('')
    const typingInterval = setInterval(() => {
      setTypedName(fullName.slice(0, index + 1))
      index++
      if (index === fullName.length) {
        clearInterval(typingInterval)
      }
    }, 120)
    return () => clearInterval(typingInterval)
  }, [])

  useEffect(() => {
    const blink = setInterval(() => setCaretVisible(prev => !prev), 500)
    return () => clearInterval(blink)
  }, [])

  const skills = [
    'Node.js', 'NestJS', 'TypeScript', 'PostgreSQL',
    'Next.js', 'React', 'JavaScript', 'C#', 'Java'
  ]

  return (
    <div className="flex flex-col xl:flex-row justify-between gap-16 items-start animate-fadeIn">
      {/* Left side */}
      <div className="flex-1 space-y-10">
        <header className="flex items-center justify-between">
          <h1 className="text-5xl font-bold text-slate-100">
            Hello, I'm{' '}
            <span className="text-indigo-400 inline-flex items-center">
              {typedName}
              <span
                aria-hidden
                className={`ml-1 block h-8 w-[3px] bg-indigo-300 ${caretVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
              ></span>
            </span>
            .
          </h1>
        </header>

        <section id="about" className="scroll-mt-40">
          <h2 className="text-xl font-semibold text-slate-200">About Me</h2>
          <p className="text-slate-400 mt-3 leading-relaxed max-w-2xl text-justify">
            Software Engineer specialized in back-end and full-stack development.
            Experienced in building scalable APIs and modern web applications using
            <strong> Node.js</strong>, <strong>NestJS</strong>, <strong>PostgreSQL</strong>, and <strong>Next.js</strong>.
          </p>
        </section>

        <section className="scroll-mt-40">
          <h2 className="text-xl font-semibold text-slate-200 mb-3">Skills</h2>
          <ul className="flex flex-wrap gap-3">
            {skills.map(skill => (
              <li
                key={skill}
                className="border border-slate-700 text-slate-300 px-4 py-1.5 rounded-full text-sm hover:border-indigo-400 hover:text-indigo-300 transition"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section id="projects" className="space-y-5 scroll-mt-40">
          <h2 className="text-xl font-semibold text-slate-200">Projects</h2>
          {loading ? (
            <p className="text-slate-500">Loading projects...</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map(p => (
                <ProjectCard
                  key={p.id}
                  title={p.title}
                  description={p.description}
                  tags={p.tags}
                  demoUrl={p.demoUrl}
                />
              ))}
            </div>
          )}
        </section>

        <footer className="text-slate-500 text-sm border-t border-slate-800 pt-6 mt-10">
          © {new Date().getFullYear()} Dinis Félix — Built with Next.js, Tailwind & Prisma
        </footer>
      </div>

      {/* Right side - profile */}
      <div className="flex-shrink-0 self-center flex flex-col items-center">
        <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-indigo-400 shadow-lg hover:scale-105 transition-transform">
          <Image src="/profile.png" alt="Dinis Félix" fill className="object-cover" />
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 mt-4 text-slate-400">
          <a
            href="https://github.com/Dinis1727"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-transform hover:scale-110"
          >
            <Github size={26} />
          </a>
          <a
            href="https://www.linkedin.com/in/dinis-f%C3%A9lix-4baa2030a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-transform hover:scale-110"
          >
            <Linkedin size={26} />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=dinisdev1@gmail.com"
            className="hover:text-indigo-400 transition-transform hover:scale-110"
          >
            <Mail size={26} />
          </a>
          <a
            href="https://instagram.com/dinis.19_"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-transform hover:scale-110"
          >
            <Instagram size={26} />
          </a>
        </div>
      </div>

      {/* Hidden contact modal */}
      <div
        id="contact-modal"
        className="hidden fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
      >
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700 w-full max-w-lg relative">
          <button
            onClick={() => document.getElementById('contact-modal')?.classList.add('hidden')}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-100"
          >
            ✕
          </button>
          <h2 className="text-2xl font-semibold text-slate-100 mb-4">Get in Touch</h2>
          <Contact />
        </div>
      </div>
    </div>
  )
}
