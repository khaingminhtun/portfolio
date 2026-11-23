export const profile = {
  name: 'Khine Min Htun',
  firstName: 'Khine',
  initials: 'KMH',
  headline: 'Backend Software Engineer',
  university: 'University of Technology (Yadanarbon Cyber City)',
  universityShort: 'UTYCC',
  degree: 'BE.IT · Fifth year',
  location: 'Pyin Oo Lwin, Myanmar',
  email: 'khineminhtun04@gmail.com',
  github: 'https://github.com/khaingminhtun',
  githubHandle: 'khaingminhtun',
  availability: 'Open to Backend Software Engineering Roles',
  summary:
    'Fifth-year BE.IT student at UTYCC building reliable backend services and well-structured APIs. I care about clear service boundaries, type-safe data access, relational and in-memory databases, and software that is easy to operate.',
  targetRoles: [
    'Backend Software Engineering',
    'API & Service Development',
    'Database Engineering',
    'Full-Stack Software Engineering',
  ],
  focusAreas: [
    'Backend architecture',
    'RESTful API design',
    'Database systems',
    'Distributed services',
    'Developer tooling',
  ],
  stats: [
    { value: '17', label: 'public repositories' },
    { value: '7', label: 'languages in stack' },
    { value: '12', label: 'selected projects' },
    { value: '100%', label: 'offline-first mobile' },
  ],
  coursework: [
    'Operating Systems',
    'Distributed Systems',
    'Computer Networks',
    'Database Systems',
    'Software Engineering',
    'Data Structures & Algorithms',
  ],
  principles: [
    {
      title: 'Boundaries before cleverness',
      description:
        'Transport, domain, and persistence layers stay separate so features can change without leaking implementation details.',
    },
    {
      title: 'Types all the way down',
      description:
        'Typed APIs, generated SQL, and explicit DTOs turn integration mistakes into compile-time feedback instead of production surprises.',
    },
    {
      title: 'Reproducible by default',
      description:
        'Pinned dependencies, migrations, and containerized environments make local and deployed setups behave the same.',
    },
    {
      title: 'Operate what you ship',
      description:
        'Health checks, structured logs, graceful shutdown, and rollback paths are part of the feature — not an afterthought.',
    },
  ],
} as const
