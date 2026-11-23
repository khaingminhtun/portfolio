import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Layers3,
  Target,
  X,
} from 'lucide-react'
import type { Project } from '../../types/portfolio'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { GitHubIcon } from '../common/GitHubIcon'
import { ProjectVisual } from './ProjectVisual'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

function ModalSection({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Target
  title: string
  children: ReactNode
}) {
  return (
    <section>
      <div className="flex items-center gap-2.5">
        <span className="grid size-7 place-items-center rounded-md border border-line bg-surface-raised text-accent">
          <Icon className="size-3.5" aria-hidden="true" />
        </span>
        <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
          {title}
        </h3>
      </div>
      <div className="mt-3.5">{children}</div>
    </section>
  )
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useLockBodyScroll(Boolean(project))

  useEffect(() => {
    if (!project) {
      return
    }

    const previousActive = document.activeElement as HTMLElement | null
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 20)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !modalRef.current) {
        return
      }

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null)

      if (focusable.length === 0) {
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      previousActive?.focus()
    }
  }, [project, onClose])

  if (!project) {
    return null
  }

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="animate-fade-in absolute inset-0 bg-slate-950/75 backdrop-blur-md"
        aria-hidden="true"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            onClose()
          }
        }}
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-description"
        className="animate-modal-in relative z-10 flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-2xl border border-line bg-surface shadow-soft sm:max-w-5xl sm:rounded-2xl"
      >
        <div className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-surface/92 px-4 py-3 backdrop-blur-xl sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-md border border-line bg-surface-raised text-accent">
              <GitBranch className="size-3.5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
                github / {project.repo}
              </p>
              <p className="truncate text-xs font-semibold text-ink sm:hidden">{project.name}</p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-surface-raised text-muted transition-colors hover:border-line-strong hover:text-ink"
            aria-label="Close project details"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain">
          <div className="grid border-b border-line lg:grid-cols-[1.02fr_0.98fr]">
            <div className="min-h-[240px] border-b border-line lg:min-h-[300px] lg:border-b-0 lg:border-r">
              <ProjectVisual variant={project.visual} accent={project.accent} />
            </div>

            <div className="p-5 sm:p-6 lg:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-accent/25 bg-accent-soft px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-accent">
                  {project.category}
                </span>
                {project.featured ? (
                  <span className="rounded-full border border-amber-500/25 bg-amber-soft px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-amber">
                    case study
                  </span>
                ) : null}
                <span className="font-mono text-[10px] text-muted">{project.year}</span>
              </div>

              <h2
                id="project-modal-title"
                className="mt-3 text-balance text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl"
              >
                {project.name}
              </h2>
              <p id="project-modal-description" className="mt-2 text-sm font-medium text-ink-soft">
                {project.tagline}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {project.metrics.map((metric) => (
                  <div
                    key={`${project.id}-modal-${metric.label}`}
                    className="rounded-lg border border-line bg-surface-raised px-3 py-2"
                  >
                    <p className="font-mono text-base font-semibold tracking-[-0.03em] text-ink">
                      {metric.value}
                    </p>
                    <p className="mt-0.5 text-[9px] uppercase tracking-[0.1em] text-muted">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-accent-bright"
                >
                  <GitHubIcon className="size-3.5" />
                  View repository
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface-raised px-3.5 py-2 text-xs font-semibold text-ink transition-colors hover:border-accent/40"
                  >
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                    Live demo
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          <div className="space-y-8 p-5 sm:p-6 lg:p-8">
            <ModalSection icon={Target} title="Problem statement">
              <p className="text-sm leading-7 text-ink-soft">{project.problem}</p>
            </ModalSection>

            <ModalSection icon={Layers3} title="System architecture & key decisions">
              <div className="mb-4 flex flex-wrap items-center gap-1.5">
                {project.flow.map((step, index) => (
                  <div key={`${project.id}-flow-${step}`} className="flex items-center gap-1.5">
                    <span className="rounded-md border border-line bg-surface-raised px-2 py-1 font-mono text-[9px] text-ink-soft">
                      {step}
                    </span>
                    {index < project.flow.length - 1 ? (
                      <span className="font-mono text-[10px] text-muted" aria-hidden="true">
                        →
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
              <ol className="space-y-3.5">
                {project.architecture.map((item, index) => (
                  <li key={`${project.id}-arch-${index}`} className="flex gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded border border-accent/25 bg-accent-soft font-mono text-[9px] font-semibold text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm leading-6 text-ink-soft">{item}</p>
                  </li>
                ))}
              </ol>
            </ModalSection>

            <ModalSection icon={CheckCircle2} title="Feature highlights">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={`${project.id}-feature-${feature}`}
                    className="flex gap-2.5 rounded-lg border border-line bg-surface-raised/60 p-3"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-emerald"
                      aria-hidden="true"
                    />
                    <span className="text-[13px] leading-5 text-ink-soft">{feature}</span>
                  </li>
                ))}
              </ul>
            </ModalSection>

            <ModalSection icon={GitBranch} title="Technology stack">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={`${project.id}-stack-${tech}`}
                    className="rounded-md border border-line bg-surface-raised px-2.5 py-1 font-mono text-[10px] text-ink-soft"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </ModalSection>

            <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[10px] text-muted">
                Source available on GitHub · {project.repo}
              </p>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-surface-raised px-3.5 py-2 text-xs font-semibold text-ink transition-colors hover:border-accent/40"
              >
                <GitHubIcon className="size-3.5" />
                Open GitHub repository
                <ExternalLink className="size-3.5 text-muted" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
