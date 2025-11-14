'use client'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type ContactErrors = {
  name?: string
  email?: string
  message?: string
}

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false)
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [mounted, setMounted] = useState(false)
  const scrollLockRef = useRef(0)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return
    const body = document.body

    if (isOpen) {
      scrollLockRef.current = window.scrollY
      body.style.top = `-${scrollLockRef.current}px`
      body.style.position = 'fixed'
      body.style.width = '100%'
    } else {
      body.style.position = ''
      body.style.top = ''
      body.style.width = ''
      window.scrollTo(0, scrollLockRef.current)
    }

    return () => {
      body.style.position = ''
      body.style.top = ''
      body.style.width = ''
    }
  }, [isOpen, mounted])

  const clearError = (field: keyof ContactErrors) =>
    setErrors(prev => {
      const updated = { ...prev }
      delete updated[field]
      return updated
    })

  const closeModal = () => {
    scrollLockRef.current = 0
    setIsOpen(false)
    setOk(false)
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formElement = e.currentTarget
    const form = new FormData(formElement)

    const name = (form.get('name') as string)?.trim()
    const email = (form.get('email') as string)?.trim()
    const message = (form.get('message') as string)?.trim()

    const newErrors: ContactErrors = {}
    if (!name || name.length < 2) {
      newErrors.name = 'Please enter your name.'
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(name)) {
      newErrors.name = 'Name must contain only letters.'
    }

    if (!email) {
      newErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!message || message.length < 10) {
      newErrors.message = 'Message should be at least 10 characters.'
    } else if ((message.match(/[A-Za-zÀ-ÖØ-öø-ÿ]/g) ?? []).length < 5) {
      newErrors.message = 'Message must contain at least 5 letters.'
    } else if (/https?:\/\//i.test(message)) {
      newErrors.message = 'Please describe your request without links.'
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setErrors({})

    try {
      await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + '/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      setOk(true)
      formElement.reset()
      setTimeout(() => {
        closeModal()
      }, 2000)
    } catch (err) {
      console.error('Failed to send message:', err)
      alert('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="border border-slate-600 hover:border-indigo-400 text-slate-300 hover:text-indigo-300 px-4 py-2 rounded-lg transition"
      >
        Contact Me
      </button>

      {/* Overlay via portal */}
      {mounted && isOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn px-4"
              onClick={closeModal}
            >
              <div
                className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 text-slate-400 hover:text-slate-200 text-xl"
                >
                  ✕
                </button>

                <h2 className="text-xl font-semibold text-slate-100 mb-4">Send a Message</h2>

                {ok ? (
                  <p className="text-emerald-500 text-sm">Thanks! I’ll get back to you soon.</p>
                ) : (
                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="space-y-1">
                      <input
                        name="name"
                        placeholder="Your name"
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-slate-200 focus:border-indigo-400 focus:outline-none"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        onChange={() => clearError('name')}
                        required
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="text-sm text-rose-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <input
                        name="email"
                        type="email"
                        placeholder="Your email"
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-slate-200 focus:border-indigo-400 focus:outline-none"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        onChange={() => clearError('email')}
                        required
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="text-sm text-rose-400">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Your message..."
                        className="w-full min-h-[140px] max-h-[220px] resize-none rounded-lg border border-slate-700 bg-slate-800 p-3 text-slate-200 focus:border-indigo-400 focus:outline-none"
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                        onChange={() => clearError('message')}
                        required
                      />
                      {errors.message && (
                        <p id="contact-message-error" className="text-sm text-rose-400">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg transition disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  )
}
