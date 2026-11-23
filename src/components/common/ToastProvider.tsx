import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { ToastContext, type ToastInput, type ToastTone } from './toast'

interface ToastItem extends ToastInput {
  id: number
  tone: ToastTone
}

const AUTO_DISMISS_MS = 4200

const toneStyles: Record<
  ToastTone,
  { icon: typeof CheckCircle2; iconClass: string; rail: string }
> = {
  success: {
    icon: CheckCircle2,
    iconClass: 'text-emerald',
    rail: 'bg-emerald',
  },
  info: {
    icon: Info,
    iconClass: 'text-accent',
    rail: 'bg-accent',
  },
  error: {
    icon: AlertTriangle,
    iconClass: 'text-amber',
    rail: 'bg-amber',
  },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(0)
  const timers = useRef(new Map<number, number>())

  const dismissToast = useCallback((id: number) => {
    const timer = timers.current.get(id)
    if (timer) {
      window.clearTimeout(timer)
      timers.current.delete(id)
    }
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const pushToast = useCallback(
    ({ title, description, tone = 'info' }: ToastInput) => {
      nextId.current += 1
      const id = nextId.current
      const toast: ToastItem = { id, title, description, tone }

      setToasts((current) => [...current.slice(-3), toast])

      const timer = window.setTimeout(() => {
        dismissToast(id)
      }, AUTO_DISMISS_MS)

      timers.current.set(id, timer)
    },
    [dismissToast],
  )

  useEffect(() => {
    const activeTimers = timers.current
    return () => {
      activeTimers.forEach((timer) => window.clearTimeout(timer))
      activeTimers.clear()
    }
  }, [])

  const contextValue = useMemo(() => ({ pushToast }), [pushToast])

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[100] flex flex-col items-end gap-3 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[380px]"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((toast) => {
          const style = toneStyles[toast.tone]
          const Icon = style.icon

          return (
            <div
              key={toast.id}
              role={toast.tone === 'error' ? 'alert' : 'status'}
              className="animate-toast-in pointer-events-auto relative w-full overflow-hidden rounded-xl border border-line bg-surface p-4 pl-5 shadow-soft"
            >
              <span className={`absolute inset-y-0 left-0 w-1 ${style.rail}`} aria-hidden="true" />
              <div className="flex items-start gap-3">
                <Icon className={`mt-0.5 size-5 shrink-0 ${style.iconClass}`} aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{toast.title}</p>
                  {toast.description ? (
                    <p className="mt-1 text-xs leading-5 text-muted">{toast.description}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => dismissToast(toast.id)}
                  className="rounded-md p-1 text-muted transition-colors hover:bg-surface-raised hover:text-ink"
                  aria-label="Dismiss notification"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
