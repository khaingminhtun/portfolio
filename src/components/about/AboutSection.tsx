import {
  Activity,
  BookOpen,
  Braces,
  Container,
  Layers3,
  MapPin,
  Target,
} from 'lucide-react'
import { profile } from '../../data/profile'
import { ProfilePhoto } from '../common/ProfilePhoto'
import { SectionHeading } from '../common/SectionHeading'

const principleIcons = [Layers3, Braces, Container, Activity]

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative border-b border-line/60 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="about-heading"
          eyebrow="Engineering approach & education"
          title="Academic depth, operational discipline."
          description="My degree gives me the fundamentals; my projects turn them into backend services, APIs, and tools that are meant to be run."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <article className="relative overflow-hidden rounded-xl border border-line bg-surface p-5 shadow-card sm:p-6">
            <div
              className="absolute -right-16 -top-16 size-48 rounded-full bg-accent/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <ProfilePhoto variant="avatar" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                      education
                    </p>
                    <h3 className="mt-1 text-lg font-semibold tracking-[-0.025em] text-ink">
                      {profile.degree} — {profile.universityShort}
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">{profile.university}</p>
                  </div>
                </div>
                <span className="rounded-full border border-emerald/25 bg-emerald-soft px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-emerald">
                  in progress
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-line py-3 font-mono text-[10px] text-muted">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3 text-accent" aria-hidden="true" />
                  {profile.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="size-3 text-accent" aria-hidden="true" />
                  software engineering · networking · databases
                </span>
              </div>

              <div className="mt-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                  core coursework
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {profile.coursework.map((course) => (
                    <span
                      key={course}
                      className="rounded-md border border-line bg-surface-raised px-2.5 py-1.5 font-mono text-[10px] text-ink-soft"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                  <Target className="size-3 text-emerald" aria-hidden="true" />
                  target roles
                </p>
                <div className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
                  {profile.targetRoles.map((role) => (
                    <div
                      key={role}
                      className="flex items-center gap-2 rounded-md border border-line bg-surface-raised px-2.5 py-2 text-xs text-ink-soft"
                    >
                      <span className="size-1 rounded-full bg-emerald" aria-hidden="true" />
                      {role}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-xl border border-line bg-surface p-5 shadow-card sm:p-6">
            <div
              className="absolute -left-16 -bottom-16 size-48 rounded-full bg-violet/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-violet/25 bg-violet-soft text-violet">
                  <Braces className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                    engineering principles
                  </p>
                  <h3 className="mt-1 text-lg font-semibold tracking-[-0.025em] text-ink">
                    Build for the second reader.
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    Systems should be understandable at 2 a.m., reproducible on another machine, and
                    safe to change.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-2.5">
                {profile.principles.map((principle, index) => {
                  const Icon = principleIcons[index] ?? Layers3

                  return (
                    <div
                      key={principle.title}
                      className="group flex gap-3 rounded-lg border border-line bg-surface-raised/55 p-3 transition-colors hover:border-line-strong"
                    >
                      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md border border-line bg-surface text-accent">
                        <Icon className="size-3.5" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-[9px] text-muted">
                            0{index + 1}
                          </span>
                          <h4 className="text-[13px] font-semibold text-ink">{principle.title}</h4>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-muted">{principle.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
