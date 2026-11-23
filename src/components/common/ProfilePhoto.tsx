import { useState } from 'react'
import { profile } from '../../data/profile'

interface ProfilePhotoProps {
  variant?: 'portrait' | 'avatar'
  className?: string
}

const variantClasses = {
  portrait:
    'size-24 rounded-2xl ring-2 ring-cyan-400/50 shadow-[0_18px_45px_-18px_rgba(34,211,238,0.55)] sm:size-28',
  avatar: 'size-14 rounded-full ring-2 ring-accent/40 shadow-card',
} as const

const fallbackClasses = {
  portrait: 'text-xl sm:text-2xl',
  avatar: 'text-sm',
} as const

export function ProfilePhoto({ variant = 'portrait', className = '' }: ProfilePhotoProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        role="img"
        aria-label={`${profile.name} monogram`}
        className={`grid shrink-0 place-items-center bg-surface-raised font-mono font-bold tracking-[-0.04em] text-accent ${variantClasses[variant]} ${fallbackClasses[variant]} ${className}`}
      >
        {profile.initials}
      </span>
    )
  }

  return (
    <img
      src="/profile.jpg"
      alt={`${profile.name} — ${profile.headline}`}
      onError={() => setFailed(true)}
      loading="eager"
      decoding="async"
      className={`shrink-0 bg-surface-raised object-cover object-top ${variantClasses[variant]} ${className}`}
    />
  )
}
