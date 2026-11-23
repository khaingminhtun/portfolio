import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../types/portfolio'
import { ProjectVisual } from './ProjectVisual'

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project) => void
}

const accentBadge: Record<Project['accent'], string> = {
  cyan: 'border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
  emerald: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  violet: 'border-violet-500/25 bg-violet-500/10 text-violet-700 dark:text-violet-300',
  amber: 'border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300',
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      <div className="relative h-[165px] overflow-hidden border-b border-line">
        <ProjectVisual variant={project.visual} accent={project.accent} compact />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] ${accentBadge[project.accent]}`}
          >
            {project.category}
          </span>
          <span className="ml-auto font-mono text-[9px] text-muted">{project.year}</span>
        </div>

        <h4 className="mt-3 text-base font-semibold tracking-[-0.02em] text-ink">
          {project.name}
        </h4>
        <p className="mt-1 text-xs leading-5 text-muted">{project.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-1">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={`${project.id}-${tech}`}
              className="rounded border border-line bg-surface-raised px-1.5 py-0.5 font-mono text-[8px] text-ink-soft"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 3 ? (
            <span className="rounded border border-line bg-surface-raised px-1.5 py-0.5 font-mono text-[8px] text-muted">
              +{project.stack.length - 3}
            </span>
          ) : null}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-3">
          <span className="font-mono text-[9px] text-muted">{project.repo}</span>
          <span className="inline-flex items-center gap-1 font-mono text-[9px] font-semibold text-accent">
            details
            <ArrowUpRight
              className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </button>
  )
}
