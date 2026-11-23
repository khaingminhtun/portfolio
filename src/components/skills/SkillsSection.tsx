import { Code2, Database, Server } from 'lucide-react'
import { skillGroups } from '../../data/skills'
import { SectionHeading } from '../common/SectionHeading'

const iconMap = {
  languages: Code2,
  backend: Server,
  data: Database,
}

const accentStyles = {
  cyan: {
    icon: 'border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
    line: 'from-cyan-500/60 to-transparent',
    dot: 'bg-cyan-500',
  },
  emerald: {
    icon: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    line: 'from-emerald-500/60 to-transparent',
    dot: 'bg-emerald-500',
  },
  violet: {
    icon: 'border-violet-500/25 bg-violet-500/10 text-violet-700 dark:text-violet-300',
    line: 'from-violet-500/60 to-transparent',
    dot: 'bg-violet-500',
  },
  amber: {
    icon: 'border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    line: 'from-amber-500/60 to-transparent',
    dot: 'bg-amber-500',
  },
} as const

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden border-b border-line/60 bg-surface/25 py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,black,transparent)]" />
        <div className="absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="skills-heading"
            eyebrow="Technical matrix"
            title="Tools chosen with intent."
            description="A focused stack for building backend services and shipping interfaces. Grouped by discipline — no arbitrary percentage bars."
          />
          <p className="max-w-xs font-mono text-[10px] leading-5 text-muted">
            <span className="text-accent">$</span> cat stack.txt
            <br />
            <span className="text-muted">// depth over checkbox collecting</span>
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => {
            const Icon = iconMap[group.icon]
            const style = accentStyles[group.accent]

            return (
              <article
                key={group.title}
                className="group relative overflow-hidden rounded-xl border border-line bg-surface p-5 shadow-card transition-colors hover:border-line-strong sm:p-6"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${style.line}`}
                  aria-hidden="true"
                />
                <div className="flex items-start gap-3">
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-lg border ${style.icon}`}
                  >
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-[-0.02em] text-ink">
                      {group.title}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-muted">{group.description}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={`${group.title}-${item}`}
                      className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-raised px-2.5 py-1.5 font-mono text-[10px] text-ink-soft transition-colors group-hover:border-line-strong"
                    >
                      <span className={`size-1 rounded-full ${style.dot}`} aria-hidden="true" />
                      {item}
                    </span>
                  ))}
                </div>

                <p className="mt-5 border-t border-line pt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                  {group.items.length} tools · production &amp; lab
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
