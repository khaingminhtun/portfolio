import type { ReactNode } from 'react'
import {
  Activity,
  ArrowRight,
  Check,
  Cloud,
  Container,
  Cpu,
  Database,
  GitBranch,
  Globe2,
  KeyRound,
  Layers3,
  LockKeyhole,
  MailCheck,
  Radio,
  Server,
  ShieldCheck,
  Star,
  Users,
  Workflow,
} from 'lucide-react'
import type { ProjectAccent, ProjectVisual as ProjectVisualKind } from '../../types/portfolio'

interface ProjectVisualProps {
  variant: ProjectVisualKind
  accent: ProjectAccent
  compact?: boolean
}

const accentStyles: Record<
  ProjectAccent,
  { text: string; bg: string; border: string; glow: string; dot: string }
> = {
  cyan: {
    text: 'text-cyan-600 dark:text-cyan-300',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/25',
    glow: 'bg-cyan-500/20',
    dot: 'bg-cyan-500',
  },
  emerald: {
    text: 'text-emerald-600 dark:text-emerald-300',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/25',
    glow: 'bg-emerald-500/20',
    dot: 'bg-emerald-500',
  },
  violet: {
    text: 'text-violet-600 dark:text-violet-300',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/25',
    glow: 'bg-violet-500/20',
    dot: 'bg-violet-500',
  },
  amber: {
    text: 'text-amber-600 dark:text-amber-300',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/25',
    glow: 'bg-amber-500/20',
    dot: 'bg-amber-500',
  },
}

function WindowDots({ small = false }: { small?: boolean }) {
  const size = small ? 'size-1' : 'size-1.5'
  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      <span className={`${size} rounded-full bg-rose-400/80`} />
      <span className={`${size} rounded-full bg-amber-400/80`} />
      <span className={`${size} rounded-full bg-emerald-400/80`} />
    </div>
  )
}

function TerminalWindow({
  title,
  status,
  compact = false,
  children,
}: {
  title: string
  status?: string
  compact?: boolean
  children: ReactNode
}) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-white/10 bg-[#0b1220] shadow-2xl">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-2.5 py-1.5">
        <div className="flex min-w-0 items-center gap-2">
          <WindowDots small={compact} />
          <span className="truncate font-mono text-[7px] text-slate-400">{title}</span>
        </div>
        {status ? (
          <span className="flex shrink-0 items-center gap-1 font-mono text-[6.5px] uppercase tracking-[0.12em] text-emerald-300">
            <span className="size-1 rounded-full bg-emerald-400" aria-hidden="true" />
            {status}
          </span>
        ) : null}
      </div>
      <div className="p-2.5">{children}</div>
    </div>
  )
}

function MobileVisual({ compact, accent }: { compact: boolean; accent: ProjectAccent }) {
  const style = accentStyles[accent]

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden p-4">
      <div className={`absolute left-8 top-6 size-24 rounded-full ${style.glow} blur-3xl`} />
      <div
        className={`relative -rotate-2 rounded-[1.8rem] border border-white/15 bg-slate-950 p-1.5 shadow-2xl ${
          compact ? 'w-[124px] scale-[0.88]' : 'w-[178px]'
        }`}
      >
        <div className="overflow-hidden rounded-[1.45rem] bg-[#0f172a] p-2.5">
          <div className="flex items-center justify-between font-mono text-[6px] text-slate-400">
            <span>9:41</span>
            <span>World 1</span>
            <span>● ● ●</span>
          </div>

          <div className="mt-2 rounded-xl border border-white/10 bg-gradient-to-br from-amber-500/15 to-emerald-500/10 p-2">
            <p
              className={`font-mono uppercase tracking-[0.12em] text-amber-300 ${
                compact ? 'text-[5px]' : 'text-[6.5px]'
              }`}
            >
              Good Manners · EP 03
            </p>
            <p className={`mt-0.5 font-semibold text-white ${compact ? 'text-[8px]' : 'text-[10px]'}`}>
              Sharing is caring
            </p>

            <div className="relative mt-2 h-11 overflow-hidden rounded-md bg-slate-800/80">
              <svg
                viewBox="0 0 120 60"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <circle cx="89" cy="16" r="8" fill="#fbbf24" opacity="0.55" />
                <path d="M0 47L27 27L51 47L73 31L120 51V60H0Z" fill="#0f766e" opacity="0.45" />
                <path d="M0 53L34 38L63 53L90 40L120 54V60H0Z" fill="#065f46" opacity="0.55" />
              </svg>
              <div className="absolute bottom-1 left-1 right-1 flex items-end gap-0.5 opacity-70">
                {[3, 5, 7, 4, 6, 3, 5, 6, 4].map((height, index) => (
                  <span
                    key={index}
                    className="w-0.5 rounded-full bg-amber-200"
                    style={{ height: `${height * 1.5}px` }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-1.5 flex items-center justify-between text-[5.5px] text-slate-400">
              <span className="flex items-center gap-1">
                <Star className="size-2 fill-amber-300 text-amber-300" aria-hidden="true" /> 12
              </span>
              <span>Audio story · 05 steps</span>
            </div>
          </div>

          {!compact ? (
            <div className="mt-1.5 grid grid-cols-2 gap-1">
              <div className="rounded-md border border-white/10 bg-white/5 p-1.5">
                <p className="text-[5.5px] text-slate-400">TRACK 01</p>
                <p className="text-[7.5px] font-medium text-white">Good Manners</p>
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-1.5">
                <p className="text-[5.5px] text-slate-400">TRACK 02</p>
                <p className="text-[7.5px] font-medium text-white">KG Alphabet</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {!compact ? (
        <>
          <div className="absolute right-3 top-4 rounded-md border border-white/10 bg-[#0b1220] px-2 py-1.5 shadow-xl">
            <p className="font-mono text-[6px] uppercase tracking-[0.14em] text-slate-400">
              bundle
            </p>
            <p className="text-[9px] font-semibold text-emerald-300">100% offline</p>
          </div>
          <div className="absolute bottom-4 left-3 rounded-md border border-white/10 bg-[#0b1220] px-2 py-1.5 shadow-xl">
            <p className="font-mono text-[6px] uppercase tracking-[0.14em] text-slate-400">
              audio
            </p>
            <p className="text-[9px] font-semibold text-amber-300">70 voiceovers</p>
          </div>
        </>
      ) : null}
    </div>
  )
}

function AnalyticsVisual({ compact }: { compact: boolean }) {
  const bars = [
    { label: 'CS', value: 78, tone: 'bg-emerald-400/80' },
    { label: 'MA', value: 66, tone: 'bg-cyan-400/70' },
    { label: 'EN', value: 88, tone: 'bg-emerald-400/80' },
    { label: 'IT', value: 72, tone: 'bg-cyan-400/70' },
    { label: 'PH', value: 35, tone: 'bg-amber-400/80' },
  ]

  return (
    <div className="flex h-full items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-[340px] overflow-hidden rounded-lg border border-white/10 bg-[#0b1220] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-2.5 py-1.5">
          <div className="flex items-center gap-2">
            <WindowDots small={compact} />
            <span className="font-mono text-[7px] text-slate-400">academic / results</span>
          </div>
          <span className="rounded border border-emerald-400/20 bg-emerald-400/10 px-1.5 py-0.5 font-mono text-[6px] text-emerald-300">
            SPRING BOOT
          </span>
        </div>

        <div className="p-2.5 sm:p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[6px] uppercase tracking-[0.14em] text-slate-400">
                Semester 1 · 2026
              </p>
              <p className={`font-semibold text-white ${compact ? 'text-[9px]' : 'text-[11px]'}`}>
                Academic snapshot
              </p>
            </div>
            <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 font-mono text-[6px] text-emerald-300">
              LOW RISK
            </span>
          </div>

          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {[
              { label: 'AVERAGE', value: '67.8', tone: 'text-white' },
              { label: 'GRADE', value: 'C', tone: 'text-cyan-300' },
              { label: 'SUBJECTS', value: '5', tone: 'text-emerald-300' },
            ].map((item) => (
              <div key={item.label} className="rounded-md border border-white/10 bg-white/[0.03] p-1.5">
                <p className="font-mono text-[5.5px] uppercase tracking-[0.1em] text-slate-400">
                  {item.label}
                </p>
                <p className={`font-mono font-semibold ${compact ? 'text-[9px]' : 'text-[11px]'} ${item.tone}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2 rounded-md border border-white/10 bg-white/[0.02] p-2">
            <div className="flex h-14 items-end gap-2">
              {bars.map((bar) => (
                <div key={bar.label} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex h-10 w-full items-end rounded-sm bg-white/[0.03]">
                    <div
                      className={`w-full rounded-sm ${bar.tone}`}
                      style={{ height: `${bar.value}%` }}
                    />
                  </div>
                  <span className="font-mono text-[5.5px] text-slate-400">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-1.5 flex items-center justify-between rounded-md border border-amber-400/20 bg-amber-400/[0.06] px-2 py-1.5">
            <span className="flex items-center gap-1.5 font-mono text-[6.5px] text-amber-200">
              <span className="size-1 rounded-full bg-amber-300" aria-hidden="true" />
              PH101 · 35 · at risk
            </span>
            <span className="font-mono text-[6px] text-slate-400">feedback ready</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function NetworkVisual({ compact }: { compact: boolean }) {
  const packets = [
    { time: '14:32:08', source: '10.0.0.14', destination: '1.1.1.1', protocol: 'DNS', size: '74 B', tone: 'text-violet-300' },
    { time: '14:32:08', source: '10.0.0.14', destination: '142.250.4.14', protocol: 'TLS', size: '1.4 KB', tone: 'text-cyan-300' },
    { time: '14:32:09', source: '10.0.0.22', destination: '10.0.0.14', protocol: 'TCP', size: '512 B', tone: 'text-emerald-300' },
    { time: '14:32:09', source: '10.0.0.14', destination: '8.8.8.8', protocol: 'UDP', size: '96 B', tone: 'text-amber-300' },
    { time: '14:32:10', source: '10.0.0.31', destination: '10.0.0.14', protocol: 'TCP', size: '2.1 KB', tone: 'text-emerald-300' },
    { time: '14:32:10', source: '10.0.0.14', destination: '151.101.1.69', protocol: 'TLS', size: '860 B', tone: 'text-cyan-300' },
    { time: '14:32:11', source: '10.0.0.14', destination: '1.1.1.1', protocol: 'DNS', size: '82 B', tone: 'text-violet-300' },
  ]

  return (
    <div className="flex h-full items-center justify-center p-3 sm:p-4">
      <TerminalWindow title="wlan0 · live capture" status="capture" compact={compact}>
        <div className="mb-1.5 flex items-center justify-between font-mono text-[6px] uppercase tracking-[0.1em] text-slate-400">
          <span>packet stream</span>
          <span className="text-emerald-300">1,284 pkt/s</span>
        </div>
        <div className="space-y-0.5">
          {packets.slice(0, compact ? 4 : 7).map((packet, index) => (
            <div
              key={`${packet.time}-${index}`}
              className="grid grid-cols-[36px_1fr_44px] items-center gap-1 rounded bg-white/[0.025] px-1.5 py-1 font-mono text-[6.5px] text-slate-400 odd:bg-white/[0.04]"
            >
              <span className="text-slate-400">{packet.time}</span>
              <span className="truncate">
                {packet.source}
                <span className="mx-1 text-slate-400">→</span>
                {packet.destination}
              </span>
              <span className={`text-right ${packet.tone}`}>{packet.protocol}</span>
            </div>
          ))}
        </div>
        <div className="mt-1.5 flex items-center justify-between border-t border-white/10 pt-1.5 font-mono text-[6px] text-slate-400">
          <span>tcp streams · 200</span>
          <span className="flex items-center gap-1 text-cyan-300">
            <Radio className="size-2" aria-hidden="true" />
            websocket
          </span>
        </div>
      </TerminalWindow>
    </div>
  )
}

function TerminalVisual({ compact, accent }: { compact: boolean; accent: ProjectAccent }) {
  const style = accentStyles[accent]

  return (
    <div className="flex h-full items-center justify-center p-3 sm:p-4">
      <TerminalWindow title="apispy · zsh" compact={compact}>
        <div className="font-mono text-[7px] leading-4 text-slate-400">
          <p>
            <span className="text-emerald-300">$</span>{' '}
            <span className="text-slate-200">apispy get api.example.dev/health --output json</span>
          </p>
          <p className="mt-1.5 text-slate-400">{'{'}</p>
          <p className="pl-3">
            <span className="text-sky-300">&quot;status&quot;</span>
            <span className="text-slate-400">: </span>
            <span className="text-emerald-300">&quot;ok&quot;</span>
            <span className="text-slate-400">,</span>
          </p>
          <p className="pl-3">
            <span className="text-sky-300">&quot;latency_ms&quot;</span>
            <span className="text-slate-400">: </span>
            <span className="text-amber-300">42</span>
            <span className="text-slate-400">,</span>
          </p>
          <p className="pl-3">
            <span className="text-sky-300">&quot;saved&quot;</span>
            <span className="text-slate-400">: </span>
            <span className="text-emerald-300">&quot;health-check&quot;</span>
          </p>
          <p className="text-slate-400">{'}'}</p>
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          {['table', 'json', 'yaml'].map((format) => (
            <span
              key={format}
              className={`rounded border px-1.5 py-0.5 font-mono text-[6px] ${
                format === 'json'
                  ? `${style.border} ${style.bg} ${style.text}`
                  : 'border-white/10 text-slate-400'
              }`}
            >
              {format}
            </span>
          ))}
          <span className="ml-auto font-mono text-[6px] text-slate-400">3 saved requests</span>
        </div>
      </TerminalWindow>
    </div>
  )
}

function ShellVisual({ compact }: { compact: boolean }) {
  return (
    <div className="flex h-full items-center justify-center p-3 sm:p-4">
      <TerminalWindow title="admin@rocky-lab ~/ops" compact={compact}>
        <div className="space-y-1 font-mono text-[6.5px] leading-4">
          <p>
            <span className="text-emerald-300">$</span>{' '}
            <span className="text-slate-200">ftool backup ~/projects</span>
          </p>
          <p className="text-slate-400">[ok] archive created · 24.8 MB</p>
          <p>
            <span className="text-emerald-300">$</span>{' '}
            <span className="text-slate-200">users list --active</span>
          </p>
          <p className="text-slate-400">dev · deploy · admin</p>
          <p>
            <span className="text-emerald-300">$</span>{' '}
            <span className="text-slate-200">disk usage --warn 80</span>
          </p>
          <p className="text-amber-300">/var/log 82% · rotation suggested</p>
          <p className="flex items-center gap-1 text-emerald-300">
            <Check className="size-2" aria-hidden="true" />
            permission checks passed
          </p>
        </div>
      </TerminalWindow>
    </div>
  )
}

function CloudVisual({ compact, accent }: { compact: boolean; accent: ProjectAccent }) {
  const style = accentStyles[accent]

  return (
    <div className="relative flex h-full flex-col items-center justify-center p-4">
      <div className={`absolute right-8 top-6 size-24 rounded-full ${style.glow} blur-3xl`} />
      <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-[#0b1220] px-2 py-0.5 font-mono text-[6px] text-slate-400">
        ap-southeast-1
      </span>

      <div className="relative w-full max-w-[300px]">
        <div className="mx-auto w-[72%] rounded-lg border border-cyan-400/25 bg-cyan-400/[0.07] p-2 text-center">
          <div className="flex items-center justify-center gap-1.5 text-cyan-300">
            <Globe2 className="size-2.5" aria-hidden="true" />
            <span className="font-mono text-[7px] font-semibold">Application Load Balancer</span>
          </div>
          <p className="mt-0.5 font-mono text-[6px] text-slate-400">public :80 → target :8080</p>
        </div>

        <div className="mx-auto h-3 w-px bg-cyan-400/30" aria-hidden="true" />

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.06] p-2">
            <div className="flex items-center gap-1.5 text-emerald-300">
              <Container className="size-2.5" aria-hidden="true" />
              <span className="font-mono text-[6.5px] font-semibold">ECS Fargate</span>
            </div>
            <p className="mt-0.5 font-mono text-[5.5px] text-slate-400">256 CPU · 512 MiB</p>
          </div>
          <div className="rounded-lg border border-violet-400/20 bg-violet-400/[0.06] p-2">
            <div className="flex items-center gap-1.5 text-violet-300">
              <Layers3 className="size-2.5" aria-hidden="true" />
              <span className="font-mono text-[6.5px] font-semibold">Amazon ECR</span>
            </div>
            <p className="mt-0.5 font-mono text-[5.5px] text-slate-400">ecs-fargate-cli-lab:latest</p>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {['VPC · 2 AZ', 'IAM roles', 'CDK v2'].map((item) => (
            <div
              key={item}
              className="rounded border border-white/10 bg-white/[0.03] py-1 text-center font-mono text-[5.5px] text-slate-400"
            >
              {item}
            </div>
          ))}
        </div>

        {!compact ? (
          <div className="mt-2 flex items-center justify-center gap-1 font-mono text-[6px] text-slate-400">
            <Cloud className="size-2" aria-hidden="true" />
            nginx · non-root · health check /
          </div>
        ) : null}
      </div>
    </div>
  )
}

function AuthVisual({ compact }: { compact: boolean }) {
  return (
    <div className="relative flex h-full items-center justify-center p-4">
      <div className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="relative w-full max-w-[280px] rounded-xl border border-white/10 bg-[#0b1220] p-3 shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
            <ShieldCheck className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p className={`font-semibold text-white ${compact ? 'text-[8px]' : 'text-[10px]'}`}>
              JWT session
            </p>
            <p className="font-mono text-[5.5px] text-slate-400">spring security · rbac</p>
          </div>
          <span className="ml-auto rounded-full bg-emerald-400/10 px-1.5 py-0.5 font-mono text-[5.5px] text-emerald-300">
            VERIFIED
          </span>
        </div>

        <div className="mt-2 rounded-md border border-white/10 bg-white/[0.03] p-2 font-mono text-[5.5px] leading-3 text-slate-400">
          <p className="text-sky-300">eyJhbGciOiJIUzI1NiIsInR5cCI6...</p>
          <p>
            <span className="text-sky-300">&quot;role&quot;</span>: <span className="text-emerald-300">&quot;ADMIN&quot;</span>,
          </p>
          <p>
            <span className="text-sky-300">&quot;refresh&quot;</span>: <span className="text-amber-300">true</span>
          </p>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-1">
          {[
            { icon: MailCheck, label: 'OTP mail' },
            { icon: KeyRound, label: 'refresh' },
            { icon: Users, label: 'roles' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="flex items-center justify-center gap-1 rounded border border-white/10 bg-white/[0.03] py-1 font-mono text-[5.5px] text-slate-400"
              >
                <Icon className="size-2" aria-hidden="true" />
                {item.label}
              </div>
            )
          })}
        </div>

        <div className="mt-2 flex items-center gap-1 font-mono text-[5.5px] text-slate-400">
          <LockKeyhole className="size-2 text-emerald-300" aria-hidden="true" />
          PostgreSQL + Redis session state
        </div>
      </div>
    </div>
  )
}

function DatabaseVisual({ compact }: { compact: boolean }) {
  return (
    <div className="relative flex h-full items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-[330px]">
        <div className="flex items-center justify-center gap-1.5">
          <div className="rounded-md border border-cyan-400/20 bg-cyan-400/[0.06] px-2 py-1.5 text-center">
            <p className="font-mono text-[6px] text-cyan-300">Chi API</p>
          </div>
          <ArrowRight className="size-2.5 text-slate-400" aria-hidden="true" />
          <div className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1.5 text-center">
            <p className="font-mono text-[6px] text-slate-300">services</p>
          </div>
          <ArrowRight className="size-2.5 text-slate-400" aria-hidden="true" />
          <div className="rounded-md border border-violet-400/20 bg-violet-400/[0.06] px-2 py-1.5 text-center">
            <p className="font-mono text-[6px] text-violet-300">sqlc</p>
          </div>
        </div>

        <div className="mx-auto mt-1 h-3 w-px bg-white/15" aria-hidden="true" />

        <div className="grid grid-cols-[1fr_auto] gap-2">
          <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.05] p-2">
            <div className="flex items-center gap-1.5 text-emerald-300">
              <Database className="size-2.5" aria-hidden="true" />
              <span className="font-mono text-[6.5px] font-semibold">PostgreSQL</span>
            </div>
            <div className="mt-1 grid grid-cols-2 gap-1 font-mono text-[5px] text-slate-400">
              <span>feeds</span>
              <span>posts</span>
              <span>users</span>
              <span>favorites</span>
            </div>
          </div>
          <div className="rounded-lg border border-amber-400/20 bg-amber-400/[0.05] p-2">
            <div className="flex items-center gap-1.5 text-amber-300">
              <Layers3 className="size-2.5" aria-hidden="true" />
              <span className="font-mono text-[6.5px] font-semibold">Redis</span>
            </div>
            <p className="mt-1 font-mono text-[5px] text-slate-400">RSS URL cache</p>
          </div>
        </div>

        <div className="mt-2 rounded-lg border border-white/10 bg-[#0b1220] p-2">
          <div className="flex items-center justify-between font-mono text-[5.5px] text-slate-400">
            <span>scheduler · every 5s</span>
            <span>queue</span>
            <span>5 workers</span>
          </div>
          <div className="mt-1.5 flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
            <span className="h-px flex-1 bg-cyan-400/25" aria-hidden="true" />
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className="grid size-3.5 place-items-center rounded border border-emerald-400/25 bg-emerald-400/10"
                  aria-hidden="true"
                >
                  <span className="size-1 rounded-full bg-emerald-400/80" />
                </span>
              ))}
            </div>
            <span className="h-px flex-1 bg-emerald-400/20" aria-hidden="true" />
            <Activity className="size-2 text-emerald-300" aria-hidden="true" />
          </div>
        </div>

        {!compact ? (
          <p className="mt-1.5 text-center font-mono text-[5.5px] text-slate-400">
            JWT auth · goose migrations · docker compose
          </p>
        ) : null}
      </div>
    </div>
  )
}

function ServerVisual({ compact }: { compact: boolean }) {
  const modules = ['auth', 'contacts', 'notes', 'relationships', 'users']

  return (
    <div className="relative flex h-full items-center justify-center p-4">
      <div className="w-full max-w-[280px]">
        <div className="grid grid-cols-2 gap-1.5">
          {modules.map((module, index) => (
            <div
              key={module}
              className={`rounded-md border border-white/10 bg-white/[0.04] px-2 py-1.5 font-mono text-[6.5px] text-slate-300 ${
                index === 4 ? 'col-span-2 text-center' : ''
              }`}
            >
              <span className="mr-1 text-violet-300">/</span>
              {module}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-1.5 h-3 w-px bg-violet-400/30" aria-hidden="true" />

        <div className="rounded-lg border border-violet-400/20 bg-violet-400/[0.06] p-2">
          <div className="flex items-center gap-1.5 text-violet-300">
            <Server className="size-2.5" aria-hidden="true" />
            <span className="font-mono text-[6.5px] font-semibold">JWT middleware</span>
            <span className="ml-auto rounded bg-violet-400/10 px-1 py-0.5 font-mono text-[5px]">
              RBAC
            </span>
          </div>
          <div className="mt-1.5 grid grid-cols-2 gap-1">
            <div className="flex items-center gap-1 font-mono text-[5.5px] text-slate-400">
              <Database className="size-2 text-emerald-300" aria-hidden="true" />
              PostgreSQL
            </div>
            <div className="flex items-center gap-1 font-mono text-[5.5px] text-slate-400">
              <Layers3 className="size-2 text-amber-300" aria-hidden="true" />
              Redis
            </div>
          </div>
        </div>

        {!compact ? (
          <div className="mt-1.5 flex items-center justify-center gap-1 font-mono text-[5.5px] text-slate-400">
            <GitBranch className="size-2" aria-hidden="true" />
            sqlc-generated queries · versioned migrations
          </div>
        ) : null}
      </div>
    </div>
  )
}

function WebVisual({ compact }: { compact: boolean }) {
  return (
    <div className="flex h-full items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-[330px] overflow-hidden rounded-lg border border-white/10 bg-[#0b1220] shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-2.5 py-1.5">
          <WindowDots small={compact} />
          <div className="ml-1 flex h-3.5 flex-1 items-center rounded border border-white/10 bg-white/[0.03] px-1.5 font-mono text-[5px] text-slate-400">
            khineminhtun.dev
          </div>
        </div>
        <div className="p-2.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[6px] text-cyan-300">&lt;/&gt; kmh</span>
            <div className="flex gap-1.5 font-mono text-[5px] text-slate-400">
              <span>projects</span>
              <span>skills</span>
              <span>about</span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-[1.15fr_0.85fr] gap-2">
            <div>
              <p className="font-mono text-[5px] uppercase tracking-[0.12em] text-emerald-300">
                available for work
              </p>
              <p className={`mt-1 font-semibold text-white ${compact ? 'text-[8px]' : 'text-[10px]'}`}>
                Backend, APIs &amp; data.
              </p>
              <div className="mt-1.5 space-y-1">
                <span className="block h-1 w-full rounded bg-white/10" />
                <span className="block h-1 w-4/5 rounded bg-white/10" />
              </div>
              <div className="mt-2 flex gap-1">
                <span className="rounded bg-cyan-400/20 px-1.5 py-0.5 font-mono text-[5px] text-cyan-300">
                  projects
                </span>
                <span className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[5px] text-slate-400">
                  github
                </span>
              </div>
            </div>
            <div className="rounded-md border border-white/10 bg-black/30 p-1.5 font-mono text-[5px] leading-3 text-slate-400">
              <p className="text-emerald-300">khine@lab:~$</p>
              <p className="text-slate-300">whoami</p>
              <p className="text-sky-300">&quot;role&quot;: &quot;backend&quot;</p>
              <p className="text-sky-300">&quot;cloud&quot;: true</p>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1">
            <div className="rounded border border-white/10 bg-white/[0.03] p-1.5">
              <p className="font-mono text-[5px] text-slate-400">CASE STUDY</p>
              <p className="font-mono text-[6px] text-white">Myanmar Kids Learn</p>
            </div>
            <div className="rounded border border-white/10 bg-white/[0.03] p-1.5">
              <p className="font-mono text-[5px] text-slate-400">CASE STUDY</p>
              <p className="font-mono text-[6px] text-white">Academic System</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ConcurrencyVisual({ compact }: { compact: boolean }) {
  return (
    <div className="flex h-full items-center justify-center p-3 sm:p-4">
      <TerminalWindow title="job-system · go run ./cmd/job-system" compact={compact}>
        <div className="flex items-center gap-2">
          <div className="rounded border border-cyan-400/20 bg-cyan-400/[0.06] p-1.5">
            <p className="font-mono text-[5.5px] text-cyan-300">queue</p>
            <div className="mt-1 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className="size-1.5 rounded-sm bg-cyan-400/60" />
              ))}
            </div>
          </div>
          <ArrowRight className="size-2.5 text-slate-400" aria-hidden="true" />
          <div className="grid grid-cols-2 gap-1">
            {Array.from({ length: 4 }).map((_, index) => (
              <span
                key={index}
                className="grid size-4 place-items-center rounded border border-emerald-400/25 bg-emerald-400/10"
                aria-hidden="true"
              >
                <Cpu className="size-2 text-emerald-300" />
              </span>
            ))}
          </div>
          <ArrowRight className="size-2.5 text-slate-400" aria-hidden="true" />
          <div className="rounded border border-amber-400/20 bg-amber-400/[0.06] px-1.5 py-1">
            <p className="font-mono text-[5.5px] text-amber-300">stats</p>
            <p className="font-mono text-[6.5px] text-white">1,248</p>
          </div>
        </div>

        <div className="mt-2 space-y-1 font-mono text-[6px] text-slate-400">
          <p>
            <span className="text-emerald-300">ok</span> worker-02 completed job #1248{' '}
            <span className="text-slate-400">· 18ms</span>
          </p>
          <p>
            <span className="text-emerald-300">ok</span> worker-04 completed job #1249{' '}
            <span className="text-slate-400">· 21ms</span>
          </p>
          <p>
            <span className="text-cyan-300">run</span> graceful shutdown · draining queue
          </p>
        </div>

        {!compact ? (
          <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-1.5 font-mono text-[5.5px] text-slate-400">
            <span className="flex items-center gap-1">
              <Workflow className="size-2" aria-hidden="true" />
              context propagation
            </span>
            <span className="flex items-center gap-1 text-emerald-300">
              <Activity className="size-2" aria-hidden="true" />
              4 active workers
            </span>
          </div>
        ) : null}
      </TerminalWindow>
    </div>
  )
}

export function ProjectVisual({ variant, accent, compact = false }: ProjectVisualProps) {
  const style = accentStyles[accent]

  return (
    <div className="relative h-full w-full overflow-hidden bg-surface-raised" aria-hidden="true">
      <div className="absolute inset-0 bg-grid-fine opacity-50" aria-hidden="true" />
      <div
        className={`absolute -right-8 -top-8 size-32 rounded-full ${style.glow} blur-3xl`}
        aria-hidden="true"
      />
      <div className="relative h-full">
        {variant === 'mobile' ? <MobileVisual compact={compact} accent={accent} /> : null}
        {variant === 'analytics' ? <AnalyticsVisual compact={compact} /> : null}
        {variant === 'network' ? <NetworkVisual compact={compact} /> : null}
        {variant === 'terminal' ? <TerminalVisual compact={compact} accent={accent} /> : null}
        {variant === 'shell' ? <ShellVisual compact={compact} /> : null}
        {variant === 'cloud' ? <CloudVisual compact={compact} accent={accent} /> : null}
        {variant === 'auth' ? <AuthVisual compact={compact} /> : null}
        {variant === 'database' ? <DatabaseVisual compact={compact} /> : null}
        {variant === 'server' ? <ServerVisual compact={compact} /> : null}
        {variant === 'web' ? <WebVisual compact={compact} /> : null}
        {variant === 'concurrency' ? <ConcurrencyVisual compact={compact} /> : null}
      </div>
    </div>
  )
}
