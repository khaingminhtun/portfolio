import { ArrowUp, Mail, Terminal } from 'lucide-react'
import { profile } from '../../data/profile'
import { GitHubIcon } from '../common/GitHubIcon'
import { Logo } from '../common/Logo'

const footerLinks = [
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-canvas">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-xs leading-6 text-muted">
              Backend software engineer. Fifth-year BE.IT at UTYCC. Building APIs, database-backed
              services, and software that is typed, reproducible, and easy to operate.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
              <span className="size-1.5 rounded-full bg-emerald pulse-dot" aria-hidden="true" />
              {profile.availability}
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:items-end">
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="grid size-8 place-items-center rounded-md border border-line bg-surface text-muted transition-colors hover:border-accent/40 hover:text-ink"
                aria-label="GitHub profile"
              >
                <GitHubIcon className="size-3.5" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="grid size-8 place-items-center rounded-md border border-line bg-surface text-muted transition-colors hover:border-accent/40 hover:text-ink"
                aria-label="Send an email"
              >
                <Mail className="size-3.5" aria-hidden="true" />
              </a>
              <a
                href="#top"
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 font-mono text-[9px] text-muted transition-colors hover:border-accent/40 hover:text-ink"
                aria-label="Back to top"
              >
                <ArrowUp className="size-3" aria-hidden="true" />
                top
              </a>
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-3 border-t border-line pt-5 font-mono text-[9px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <Terminal className="size-3 text-accent" aria-hidden="true" />
            built with React · TypeScript · Tailwind CSS v4
          </p>
        </div>
      </div>
    </footer>
  )
}
