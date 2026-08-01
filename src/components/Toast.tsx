import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

type ToastContextValue = {
  (message: string): void
}

const ToastContext = createContext<ToastContextValue>(() => {})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null)

  const toast = useCallback((message: string) => {
    setMsg(message)
    window.setTimeout(() => setMsg(null), 2400)
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {msg && <div className="toast">{msg}</div>}
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
