import Link from 'next/link'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  demoUrl?: string
}

export default function ProjectCard({ title, description, tags, demoUrl }: ProjectCardProps) {
  return (
    <div className="rounded-2xl border border-slate-700 hover:border-indigo-400 transition p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
        {demoUrl && (
          <Link href={demoUrl} target="_blank" className="text-sm text-indigo-400 hover:text-indigo-300 transition">
            View →
          </Link>
        )}
      </div>

      <p className="text-slate-400 text-sm mb-3">{description}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="text-xs px-3 py-1 border border-slate-700 rounded-full text-slate-400">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
