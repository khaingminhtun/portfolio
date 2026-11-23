import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { useTheme } from '../../hooks/useTheme'
import { profile } from '../../data/profile'
import { GitHubIcon } from '../common/GitHubIcon'
import { Logo } from '../common/Logo'

const navItems = [
  { id: 'projects', label: 'Projects', index: '01' },
  { id: 'skills', label: 'Skills', index: '02' },
  { id: 'about', label: 'About', index: '03' },
  { id: 'contact', label: 'Contact', index: '04' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useActiveSection(navItems.map((item) => item.id))
  const progress = useScrollProgress()
  const { isDark, toggleTheme } = useTheme()

  useLockBodyScroll(mobileOpen)

  useEffect(() => {
    if (!mobileOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-canvas/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative rounded-md px-3.5 py-2 text-[13px] font-medium transition-colors ${
                  isActive ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
                aria-current={isActive ? 'location' : undefined}
              >
                {item.label}
                {isActive ? (
                  <span
                    className="absolute inset-x-3 -bottom-[13px] h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                    aria-hidden="true"
                  />
                ) : null}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden size-9 place-items-center rounded-lg border border-transparent text-muted transition-colors hover:border-line hover:bg-surface hover:text-ink sm:grid"
            aria-label="Open Khine Min Htun's GitHub profile"
            title="GitHub profile"
          >
            <GitHubIcon className="size-[17px]" />
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            className="grid size-9 place-items-center rounded-lg border border-transparent text-muted transition-colors hover:border-line hover:bg-surface hover:text-ink"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? (
              <Sun className="size-[17px]" aria-hidden="true" />
            ) : (
              <Moon className="size-[17px]" aria-hidden="true" />
            )}
          </button>

          <a
            href="#contact"
            className="ml-1 hidden items-center gap-2 rounded-lg border border-accent/30 bg-accent-soft px-3.5 py-2 font-mono text-[11px] font-semibold text-accent transition-colors hover:border-accent/60 hover:bg-accent/15 lg:inline-flex"
          >
            <span className="size-1.5 rounded-full bg-emerald" aria-hidden="true" />
            hire_me
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="grid size-9 place-items-center rounded-lg border border-line bg-surface text-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? (
              <X className="size-[18px]" aria-hidden="true" />
            ) : (
              <Menu className="size-[18px]" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-accent via-emerald to-violet opacity-70 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      {mobileOpen ? (
        <div className="lg:hidden">
          <button
            type="button"
            className="animate-fade-in fixed inset-x-0 bottom-0 top-[72px] z-40 cursor-default bg-slate-950/60 backdrop-blur-sm"
            aria-label="Close navigation menu"
            onClick={() => setMobileOpen(false)}
          />
          <div
            id="mobile-navigation"
            className="animate-grid-in absolute inset-x-0 top-full z-50 border-b border-line bg-canvas px-4 pb-5 pt-3 shadow-soft sm:px-6"
          >
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const isActive = activeSection === item.id

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-surface text-ink'
                        : 'text-muted hover:bg-surface hover:text-ink'
                    }`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-[10px] text-muted">{item.index}</span>
                  </a>
                )
              })}
            </nav>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-surface px-3 py-2.5 text-xs font-medium text-ink"
              >
                <GitHubIcon className="size-4" />
                GitHub
              </a>
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-surface px-3 py-2.5 text-xs font-medium text-ink"
              >
                {isDark ? (
                  <Sun className="size-4" aria-hidden="true" />
                ) : (
                  <Moon className="size-4" aria-hidden="true" />
                )}
                {isDark ? 'Light mode' : 'Dark mode'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
