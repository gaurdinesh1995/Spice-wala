import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type User = {
  name: string
  email: string
  phone?: string
  type: 'retail' | 'wholesale'
}

export type Order = {
  id: string
  date: string
  status: 'Processing' | 'Packed' | 'Shipped' | 'Delivered'
  totalInr: number
  items: { name: string; qty: number; packSize: string }[]
  tracking: string
}

type AuthContextValue = {
  user: User | null
  login: (email: string, password: string) => { ok: boolean; message: string }
  register: (name: string, email: string, password: string) => { ok: boolean; message: string }
  logout: () => void
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status' | 'tracking'>) => Order
}

const AuthContext = createContext<AuthContextValue | null>(null)

const DEMO_USER = { email: 'buyer@spicewala.com', password: 'spice123', name: 'Demo Buyer' }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('sw_user')
      return raw ? (JSON.parse(raw) as User) : null
    } catch {
      return null
    }
  })
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const raw = localStorage.getItem('sw_orders')
      return raw ? (JSON.parse(raw) as Order[]) : []
    } catch {
      return []
    }
  })

  const login = useCallback((email: string, password: string) => {
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      const u: User = { name: DEMO_USER.name, email, type: 'retail' }
      setUser(u)
      localStorage.setItem('sw_user', JSON.stringify(u))
      return { ok: true, message: 'Welcome back' }
    }
    if (email && password.length >= 4) {
      const u: User = { name: email.split('@')[0], email, type: 'retail' }
      setUser(u)
      localStorage.setItem('sw_user', JSON.stringify(u))
      return { ok: true, message: 'Logged in' }
    }
    return { ok: false, message: 'Invalid credentials' }
  }, [])

  const register = useCallback((name: string, email: string, password: string) => {
    if (!name || !email || password.length < 4) {
      return { ok: false, message: 'Please fill all fields (password min 4)' }
    }
    const u: User = { name, email, type: 'retail' }
    setUser(u)
    localStorage.setItem('sw_user', JSON.stringify(u))
    return { ok: true, message: 'Account created' }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('sw_user')
  }, [])

  const addOrder = useCallback(
    (partial: Omit<Order, 'id' | 'date' | 'status' | 'tracking'>) => {
      const order: Order = {
        ...partial,
        id: `SW${Date.now().toString().slice(-8)}`,
        date: new Date().toISOString().slice(0, 10),
        status: 'Processing',
        tracking: `TRK${Math.floor(Math.random() * 1e9)}`,
      }
      const next = [order, ...orders]
      setOrders(next)
      localStorage.setItem('sw_orders', JSON.stringify(next))
      return order
    },
    [orders],
  )

  const value = useMemo(
    () => ({ user, login, register, logout, orders, addOrder }),
    [user, login, register, logout, orders, addOrder],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
