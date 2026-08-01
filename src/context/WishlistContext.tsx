import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type WishlistContextValue = {
  ids: string[]
  toggle: (productId: string) => void
  has: (productId: string) => boolean
  count: number
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('sw_wishlist')
      return raw ? (JSON.parse(raw) as string[]) : []
    } catch {
      return []
    }
  })

  const persist = useCallback((next: string[]) => {
    setIds(next)
    localStorage.setItem('sw_wishlist', JSON.stringify(next))
  }, [])

  const toggle = useCallback(
    (productId: string) => {
      persist(ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId])
    },
    [ids, persist],
  )

  const has = useCallback((productId: string) => ids.includes(productId), [ids])

  const value = useMemo(
    () => ({ ids, toggle, has, count: ids.length }),
    [ids, toggle, has],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
