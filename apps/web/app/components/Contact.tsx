'use client'
import { useState } from 'react'

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false)
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    try {
      const form = new FormData(e.currentTarget)
      await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + '/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          message: form.get('message'),
        }),
      })
      setOk(true)
      setTimeout(() => setIsOpen(false), 2000)
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

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-200 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-slate-100 mb-4">Send a Message</h2>

            {ok ? (
              <p className="text-emerald-500 text-sm">Thanks! I’ll get back to you soon.</p>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-3">
                <input
                  name="name"
                  placeholder="Your name"
                  className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-slate-200 focus:border-indigo-400 focus:outline-none"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your email"
                  className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-slate-200 focus:border-indigo-400 focus:outline-none"
                  required
                />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Your message..."
                  className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-slate-200 focus:border-indigo-400 focus:outline-none"
                  required
                />
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
        </div>
      )}
    </>
  )
}
