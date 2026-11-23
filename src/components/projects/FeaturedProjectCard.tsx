import { ArrowUpRight, Sparkles } from 'lucide-react'
import type { Project } from '../../types/portfolio'
import { ProjectVisual } from './ProjectVisual'

interface FeaturedProjectCardProps {
  project: Project
  onOpen: (project: Project) => void
}

const accentBadge: Record<Project['accent'], string> = {
  cyan: 'border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
  emerald: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  violet: 'border-violet-500/25 bg-violet-500/10 text-violet-700 dark:text-violet-300',
  amber: 'border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300',
}

export function FeaturedProjectCard({ project, onOpen }: FeaturedProjectCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      <div className="relative h-[230px] overflow-hidden border-b border-line sm:h-[260px]">
        <ProjectVisual variant={project.visual} accent={project.accent} />
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-300 backdrop-blur">
          <Sparkles className="size-3 text-amber-300" aria-hidden="true" />
          featured case study
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] ${accentBadge[project.accent]}`}
          >
            {project.category}
          </span>
          <span className="font-mono text-[10px] text-muted">{project.year}</span>
          <span className="ml-auto hidden font-mono text-[9px] text-muted sm:inline">
            github / {project.repo}
          </span>
        </div>

        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink">
          {project.name}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-ink-soft">{project.tagline}</p>
        <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {project.metrics.map((metric) => (
            <div
              key={`${project.id}-${metric.label}`}
              className="rounded-lg border border-line bg-surface-raised px-2.5 py-2"
            >
              <p className="font-mono text-sm font-semibold tracking-[-0.03em] text-ink">
                {metric.value}
              </p>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.1em] text-muted">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 6).map((tech) => (
            <span
              key={`${project.id}-${tech}`}
              className="rounded-md border border-line bg-surface-raised px-2 py-1 font-mono text-[9px] text-ink-soft"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 6 ? (
            <span className="rounded-md border border-line bg-surface-raised px-2 py-1 font-mono text-[9px] text-muted">
              +{project.stack.length - 6}
            </span>
          ) : null}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="font-mono text-[10px] text-muted">click to inspect</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold text-accent transition-colors group-hover:text-accent-bright">
            architecture &amp; details
            <ArrowUpRight
              className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </button>
  )
}
