import { ArrowDown, ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { profile } from '../../data/profile'
import { GitHubIcon } from '../common/GitHubIcon'
import { ProfilePhoto } from '../common/ProfilePhoto'
import { TerminalCard } from './TerminalCard'

const heroStack = [
  'Go',
  'Java',
  'Python',
  'TypeScript',
  'Spring Boot',
  'PostgreSQL',
  'MySQL',
  'Redis',
]

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-line/60"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_75%_65%_at_50%_20%,black,transparent)]" />
        <div className="absolute -right-24 -top-28 size-[480px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute -left-40 top-56 size-[420px] rounded-full bg-emerald/10 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.03fr_0.97fr] lg:gap-12 xl:gap-16">
          <div className="animate-fade-in">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald/25 bg-emerald-soft px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-emerald">
                <span className="size-1.5 rounded-full bg-emerald pulse-dot" aria-hidden="true" />
                {profile.availability}
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/70 px-3 py-1.5 font-mono text-[10px] text-muted backdrop-blur">
                <MapPin className="size-3" aria-hidden="true" />
                {profile.location}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4 sm:gap-5">
              <ProfilePhoto />
              <div className="min-w-0">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-muted">
                  Khine Min Htun
                  <span className="mx-2 text-line-strong">/</span>
                  <span className="text-accent">backend software engineer</span>
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {profile.degree} · {profile.universityShort}
                </p>
              </div>
            </div>

            <h1
              id="hero-title"
              className="mt-6 max-w-4xl text-balance text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.055em] text-ink sm:text-6xl lg:text-[4.15rem] xl:text-[4.55rem]"
            >
              <span className="relative inline-block bg-gradient-to-r from-accent via-accent-bright to-emerald bg-clip-text text-transparent">
                Backend
                <svg
                  viewBox="0 0 220 12"
                  className="absolute -bottom-1 left-0 w-full text-accent/60"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 9C58 3 144 2 217 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              software engineer.
            </h1>

            <p className="mt-7 max-w-2xl text-pretty text-[15px] leading-7 text-ink-soft sm:text-[17px] sm:leading-8">
              {profile.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_-12px_rgba(34,211,238,0.65)] transition-transform hover:-translate-y-0.5 hover:bg-accent-bright"
              >
                View Projects
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent/40 hover:bg-surface-raised"
              >
                <GitHubIcon className="size-4" />
                GitHub Profile
                <ArrowUpRight className="size-3.5 text-muted" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted transition-colors hover:text-ink"
              >
                <Mail className="size-4" aria-hidden="true" />
                Contact Me
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line/70 pt-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                working across
              </span>
              {heroStack.map((item) => (
                <span
                  key={item}
                  className="font-mono text-[10px] text-ink-soft transition-colors hover:text-accent"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative lg:pl-2">
            <div className="absolute -left-5 top-10 hidden rounded-lg border border-line bg-surface/90 px-3 py-2 shadow-card backdrop-blur xl:block">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                current_focus
              </p>
              <p className="mt-1 flex items-center gap-2 text-xs font-medium text-ink">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                reliable backend services
              </p>
            </div>

            <TerminalCard />

            <div className="absolute -bottom-5 right-4 hidden items-center gap-2 rounded-lg border border-line bg-surface/95 px-3 py-2 shadow-card backdrop-blur sm:flex">
              <span className="grid size-6 place-items-center rounded-md bg-violet-soft font-mono text-[9px] font-bold text-violet">
                BE
              </span>
              <div className="leading-tight">
                <p className="text-[10px] font-semibold text-ink">Fifth year · UTYCC</p>
                <p className="font-mono text-[8px] text-muted">backend · apis · databases</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
