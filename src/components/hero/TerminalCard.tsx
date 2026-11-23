import { useRef, useState, type KeyboardEvent } from 'react'
import { ChevronRight, Circle, LockKeyhole, Terminal } from 'lucide-react'
import { terminalTabs } from '../../data/terminal'
import type { TerminalToken } from '../../types/portfolio'

const toneClasses: Record<NonNullable<TerminalToken['tone']>, string> = {
  default: 'text-slate-300',
  muted: 'text-slate-400',
  key: 'text-sky-300',
  string: 'text-emerald-300',
  number: 'text-amber-300',
  command: 'text-cyan-300',
  success: 'text-emerald-300',
  warning: 'text-amber-300',
}

export function TerminalCard() {
  const [activeTabId, setActiveTabId] = useState(terminalTabs[0].id)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeTab = terminalTabs.find((tab) => tab.id === activeTabId) ?? terminalTabs[0]

  const selectTab = (index: number) => {
    const nextTab = terminalTabs[index]
    if (!nextTab) {
      return
    }

    setActiveTabId(nextTab.id)
    tabRefs.current[index]?.focus()
  }

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      selectTab((index + 1) % terminalTabs.length)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      selectTab((index - 1 + terminalTabs.length) % terminalTabs.length)
    } else if (event.key === 'Home') {
      event.preventDefault()
      selectTab(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      selectTab(terminalTabs.length - 1)
    }
  }

  return (
    <div className="relative">
      <div
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/15 via-transparent to-emerald/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-2xl border border-terminal-line bg-terminal shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between gap-3 border-b border-terminal-line px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <Circle className="size-2.5 fill-[#fb7185] text-[#fb7185]" />
              <Circle className="size-2.5 fill-[#fbbf24] text-[#fbbf24]" />
              <Circle className="size-2.5 fill-[#34d399] text-[#34d399]" />
            </div>
            <div className="flex min-w-0 items-center gap-2">
              <Terminal className="size-3.5 shrink-0 text-accent" aria-hidden="true" />
              <span className="truncate font-mono text-[11px] text-slate-400">
                khine@utycc-lab: ~
              </span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald/20 bg-emerald/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-emerald-300">
            <span className="size-1.5 rounded-full bg-emerald-400 pulse-dot" aria-hidden="true" />
            connected
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Terminal profile commands"
          className="flex gap-1 overflow-x-auto border-b border-terminal-line bg-[#0a111d] px-2 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {terminalTabs.map((tab, index) => {
            const isActive = tab.id === activeTabId

            return (
              <button
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[index] = element
                }}
                type="button"
                role="tab"
                id={`terminal-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`terminal-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTabId(tab.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={`shrink-0 rounded-md border px-2.5 py-1.5 font-mono text-[10px] transition-colors ${
                  isActive
                    ? 'border-accent/30 bg-accent/10 text-accent'
                    : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-300'
                }`}
              >
                <span className="mr-1.5 text-slate-400" aria-hidden="true">
                  $
                </span>
                {tab.label}
              </button>
            )
          })}
        </div>

        <div
          key={activeTab.id}
          role="tabpanel"
          id={`terminal-panel-${activeTab.id}`}
          aria-labelledby={`terminal-tab-${activeTab.id}`}
          tabIndex={0}
          className="animate-line-in min-h-[330px] bg-terminal-panel p-4 focus-visible:outline-none sm:min-h-[350px] sm:p-5"
        >
          <div className="flex items-start gap-2 font-mono text-[12px] leading-6 sm:text-[12.5px]">
            <span className="shrink-0 text-emerald-300">khine@utycc-lab</span>
            <span className="shrink-0 text-slate-400">:~$</span>
            <span className="text-slate-200">{activeTab.command}</span>
            <span className="mt-2 inline-block h-3.5 w-1.5 shrink-0 bg-accent cursor-blink" aria-hidden="true" />
          </div>

          <div className="mt-4 space-y-1.5 font-mono text-[11.5px] leading-5 sm:text-[12px] sm:leading-6">
            {activeTab.lines.map((line, lineIndex) => (
              <div
                key={`${activeTab.id}-${lineIndex}`}
                className="animate-line-in whitespace-pre-wrap break-words"
                style={{ animationDelay: `${lineIndex * 24}ms`, paddingLeft: line.indent ?? 0 }}
              >
                {line.tokens.map((token, tokenIndex) => (
                  <span key={`${token.text}-${tokenIndex}`} className={toneClasses[token.tone ?? 'default']}>
                    {token.text}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
            <ChevronRight className="size-3" aria-hidden="true" />
            <span>tab or arrow keys to switch views</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-terminal-line bg-[#080d15] px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <LockKeyhole className="size-2.5" aria-hidden="true" />
              ssh secure
            </span>
            <span className="hidden sm:inline">utf-8</span>
            <span className="hidden sm:inline">bash 5.2</span>
          </div>
          <span>ap-southeast-1</span>
        </div>
      </div>
    </div>
  )
}
