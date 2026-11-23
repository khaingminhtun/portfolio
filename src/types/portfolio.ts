export const PROJECT_CATEGORIES = [
  'Backend',
  'Systems & CLI',
  'Mobile & Web',
] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

export type ProjectFilter = 'All' | ProjectCategory

export type ProjectAccent = 'cyan' | 'emerald' | 'violet' | 'amber'

export type ProjectVisual =
  | 'mobile'
  | 'analytics'
  | 'network'
  | 'terminal'
  | 'shell'
  | 'cloud'
  | 'auth'
  | 'database'
  | 'server'
  | 'web'
  | 'concurrency'

export interface ProjectMetric {
  value: string
  label: string
}

export interface Project {
  id: string
  name: string
  repo: string
  category: ProjectCategory
  tagline: string
  description: string
  problem: string
  flow: string[]
  architecture: string[]
  features: string[]
  stack: string[]
  metrics: ProjectMetric[]
  githubUrl: string
  liveUrl?: string
  visual: ProjectVisual
  accent: ProjectAccent
  year: string
  featured?: boolean
}

export interface SkillGroup {
  title: string
  description: string
  icon: 'languages' | 'backend' | 'data'
  accent: ProjectAccent
  items: string[]
}

export interface TerminalToken {
  text: string
  tone?: 'default' | 'muted' | 'key' | 'string' | 'number' | 'command' | 'success' | 'warning'
}

export interface TerminalLine {
  tokens: TerminalToken[]
  indent?: number
}
