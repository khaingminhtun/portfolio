interface LogoProps {
  compact?: boolean
}

export function Logo({ compact = false }: LogoProps) {
  return (
    <a
      href="#top"
      className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-none"
      title="Back to top"
    >
      <span className="relative grid size-9 place-items-center rounded-lg border border-accent/30 bg-accent-soft font-mono text-[11px] font-bold tracking-[-0.05em] text-accent transition-colors group-hover:border-accent/60">
        <span aria-hidden="true">&lt;/&gt;</span>
        <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-emerald shadow-[0_0_0_3px_var(--canvas)]" />
      </span>
      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="text-sm font-semibold tracking-[-0.02em] text-ink">
            Khine Min Htun
          </span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
            backend software engineer
          </span>
        </span>
      ) : null}
      <span className="sr-only">— back to top</span>
    </a>
  )
}
