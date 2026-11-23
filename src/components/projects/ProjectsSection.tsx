import { useCallback, useMemo, useState } from 'react'
import { FolderGit2 } from 'lucide-react'
import {
  PROJECT_CATEGORIES,
  type Project,
  type ProjectFilter,
} from '../../types/portfolio'
import { additionalProjects, featuredProjects } from '../../data/projects'
import { SectionHeading } from '../common/SectionHeading'
import { FeaturedProjectCard } from './FeaturedProjectCard'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'

const filters: ProjectFilter[] = ['All', ...PROJECT_CATEGORIES]

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const openProject = useCallback((project: Project) => {
    setSelectedProject(project)
  }, [])

  const closeProject = useCallback(() => {
    setSelectedProject(null)
  }, [])

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'All'
        ? additionalProjects
        : additionalProjects.filter((project) => project.category === activeFilter),
    [activeFilter],
  )

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative border-b border-line/60 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="projects-heading"
            eyebrow="Selected work"
            title="Systems built for the real world."
            description="Two featured case studies in offline-first mobile and academic backend systems, followed by additional backend, CLI, and web projects from my GitHub."
          />
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted">
            <FolderGit2 className="size-3.5 text-accent" aria-hidden="true" />
            {featuredProjects.length + additionalProjects.length} projects · public repos
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard key={project.id} project={project} onOpen={openProject} />
          ))}
        </div>

        <div className="mt-16 sm:mt-20">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                Repository index
              </p>
              <h3 className="mt-2 text-balance text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">
                More from GitHub
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                Filter by discipline, then open any card for the full problem statement, architecture
                decisions, and feature set.
              </p>
            </div>

            <div
              className="flex flex-wrap gap-1 rounded-xl border border-line bg-surface p-1.5"
              role="group"
              aria-label="Filter projects by category"
            >
              {filters.map((filter) => {
                const count =
                  filter === 'All'
                    ? additionalProjects.length
                    : additionalProjects.filter((project) => project.category === filter).length
                const isActive = activeFilter === filter

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-[10px] transition-colors ${
                      isActive
                        ? 'bg-accent-soft text-accent'
                        : 'text-muted hover:bg-surface-raised hover:text-ink'
                    }`}
                  >
                    {filter}
                    <span
                      className={`rounded px-1.5 py-0.5 text-[8px] ${
                        isActive ? 'bg-accent/15 text-accent' : 'bg-surface-raised text-muted'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {filteredProjects.length} projects shown in {activeFilter}
          </p>

          <div
            key={activeFilter}
            className="animate-grid-in mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={openProject} />
            ))}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="mt-7 rounded-xl border border-dashed border-line-strong bg-surface p-10 text-center">
              <p className="text-sm font-medium text-ink">No projects in this category yet.</p>
              <p className="mt-1 text-xs text-muted">Choose another filter to keep exploring.</p>
            </div>
          ) : null}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={closeProject} />
    </section>
  )
}
