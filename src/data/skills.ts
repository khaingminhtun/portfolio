import type { SkillGroup } from '../types/portfolio'

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    description: 'The languages I reach for across backend services, tooling, and interfaces.',
    icon: 'languages',
    accent: 'cyan',
    items: ['Go', 'Java', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'Bash'],
  },
  {
    title: 'Backend & Frameworks',
    description: 'Service frameworks, CLI plumbing, typed data access, and API security.',
    icon: 'backend',
    accent: 'emerald',
    items: [
      'Gin',
      'Chi',
      'Cobra',
      'Viper',
      'sqlc',
      'Goose',
      'Spring Boot',
      'Hibernate',
      'REST APIs',
      'JWT & OAuth2',
    ],
  },
  {
    title: 'Databases, Mobile & Web',
    description: 'Storage engines and the mobile and web layers that consume them.',
    icon: 'data',
    accent: 'amber',
    items: [
      'PostgreSQL',
      'MySQL',
      'Redis',
      'SQLite (Drift)',
      'MongoDB',
      'Flutter (Dart, BLoC/Cubit)',
      'Kotlin (Android)',
      'React',
      'Next.js',
      'Tailwind CSS',
    ],
  },
]
