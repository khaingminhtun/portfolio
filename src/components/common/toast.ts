import { createContext, useContext } from 'react'

export type ToastTone = 'success' | 'info' | 'error'

export interface ToastInput {
  title: string
  description?: string
  tone?: ToastTone
}

export interface ToastContextValue {
  pushToast: (toast: ToastInput) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used inside a ToastProvider')
  }

  return context
}
