import type { TerminalLine, TerminalToken } from '../types/portfolio'

export interface TerminalTab {
  id: string
  label: string
  command: string
  lines: TerminalLine[]
}

const token = (
  text: string,
  tone: TerminalToken['tone'] = 'default',
): TerminalToken => ({ text, tone })

const line = (...tokens: TerminalToken[]): TerminalLine => ({ tokens })

export const terminalTabs: TerminalTab[] = [
  {
    id: 'whoami',
    label: 'whoami',
    command: 'whoami',
    lines: [
      line(token('{', 'muted')),
      line(
        token('  "name"', 'key'),
        token(': ', 'muted'),
        token('"Khine Min Htun"', 'string'),
        token(',', 'muted'),
      ),
      line(
        token('  "role"', 'key'),
        token(': ', 'muted'),
        token('"Backend Software Engineer"', 'string'),
        token(',', 'muted'),
      ),
      line(
        token('  "education"', 'key'),
        token(': ', 'muted'),
        token('"BE.IT · UTYCC · fifth year"', 'string'),
        token(',', 'muted'),
      ),
      line(
        token('  "location"', 'key'),
        token(': ', 'muted'),
        token('"Pyin Oo Lwin, Myanmar"', 'string'),
        token(',', 'muted'),
      ),
      line(
        token('  "focus"', 'key'),
        token(': [', 'muted'),
        token('"backend"', 'string'),
        token(', ', 'muted'),
        token('"apis"', 'string'),
        token(', ', 'muted'),
        token('"databases"', 'string'),
        token(', ', 'muted'),
        token('"architecture"', 'string'),
        token('],', 'muted'),
      ),
      line(
        token('  "status"', 'key'),
        token(': ', 'muted'),
        token('"open_to_work"', 'success'),
      ),
      line(token('}', 'muted')),
    ],
  },
  {
    id: 'stack',
    label: 'stack --summary',
    command: 'stack --summary',
    lines: [
      line(token('LANGUAGES', 'key'), token('  go · java · python · typescript · javascript · sql · bash')),
      line(
        token('BACKEND', 'key'),
        token('    gin · chi · spring boot · cobra · sqlc · jwt'),
      ),
      line(
        token('DATA', 'key'),
        token('       postgresql · mysql · redis · sqlite/drift'),
      ),
      line(
        token('API', 'key'),
        token('        restful design · typed contracts · versioned routes'),
      ),
      line(token('')),
      line(
        token('SUMMARY', 'warning'),
        token('    type-safe services, clean domain boundaries, reliable APIs'),
      ),
    ],
  },
  {
    id: 'focus',
    label: 'focus --backend',
    command: 'focus --backend',
    lines: [
      line(
        token('API_DESIGN', 'key'),
        token('='),
        token('restful,versioned,typed-contracts', 'string'),
      ),
      line(
        token('DATA_LAYER', 'key'),
        token('='),
        token('postgresql,mysql,redis,sqlite', 'string'),
      ),
      line(
        token('SQL_ACCESS', 'key'),
        token('='),
        token('sqlc,generated-queries,migrations', 'string'),
      ),
      line(
        token('ARCHITECTURE', 'key'),
        token('='),
        token('layered,service-boundaries,testable', 'string'),
      ),
      line(token('AUTH', 'key'), token('='), token('jwt,refresh-tokens,oauth2', 'string')),
      line(token('')),
      line(
        token('# host:', 'muted'),
        token(' khine@utycc-lab'),
        token(' · shell:', 'muted'),
        token(' bash 5.2'),
        token(' · tz:', 'muted'),
        token(' Asia/Yangon', 'string'),
      ),
    ],
  },
]
