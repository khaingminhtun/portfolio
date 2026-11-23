interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  id?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <div
        className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
      >
        <span className="h-px w-7 bg-accent/60" aria-hidden="true" />
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-accent">
          {eyebrow}
        </p>
      </div>
      <h2
        id={id}
        className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-7 text-muted sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}
