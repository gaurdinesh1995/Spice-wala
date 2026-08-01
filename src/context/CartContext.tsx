import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../data/catalog'
import { salePriceInr } from '../utils/money'

export type CartItem = {
  productId: string
  slug: string
  name: string
  pigment: Product['pigment']
  image: string
  packSize: string
  unitPriceInr: number
  qty: number
}

type CartContextValue = {
  items: CartItem[]
  addItem: (product: Product, packSize: string, qty?: number) => void
  removeItem: (productId: string, packSize: string) => void
  updateQty: (productId: string, packSize: string, qty: number) => void
  clear: () => void
  count: number
  subtotalInr: number
  coupon: string | null
  applyCoupon: (code: string) => { ok: boolean; message: string }
  discountInr: number
  shippingInr: number
  taxInr: number
  totalInr: number
}

const CartContext = createContext<CartContextValue | null>(null)

const COUPONS: Record<string, number> = {
  SPICE10: 0.1,
  HALDI15: 0.15,
  EXPORT5: 0.05,
}

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem('sw_cart')
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart)
  const [coupon, setCoupon] = useState<string | null>(() => localStorage.getItem('sw_coupon'))

  const persist = useCallback((next: CartItem[]) => {
    setItems(next)
    localStorage.setItem('sw_cart', JSON.stringify(next))
  }, [])

  const addItem = useCallback(
    (product: Product, packSize: string, qty = 1) => {
      const pack = product.packSizes.find((p) => p.size === packSize) ?? product.packSizes[0]
      const unit = salePriceInr(product, pack.priceInr)
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === product.id && i.packSize === pack.size)
        const next = existing
          ? prev.map((i) =>
              i.productId === product.id && i.packSize === pack.size
                ? { ...i, qty: i.qty + qty }
                : i,
            )
          : [
              ...prev,
              {
                productId: product.id,
                slug: product.slug,
                name: product.name,
                pigment: product.pigment,
                image: product.images[0],
                packSize: pack.size,
                unitPriceInr: unit,
                qty,
              },
            ]
        localStorage.setItem('sw_cart', JSON.stringify(next))
        return next
      })
    },
    [],
  )

  const removeItem = useCallback((productId: string, packSize: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => !(i.productId === productId && i.packSize === packSize))
      localStorage.setItem('sw_cart', JSON.stringify(next))
      return next
    })
  }, [])

  const updateQty = useCallback(
    (productId: string, packSize: string, qty: number) => {
      if (qty < 1) {
        removeItem(productId, packSize)
        return
      }
      setItems((prev) => {
        const next = prev.map((i) =>
          i.productId === productId && i.packSize === packSize ? { ...i, qty } : i,
        )
        localStorage.setItem('sw_cart', JSON.stringify(next))
        return next
      })
    },
    [removeItem],
  )

  const clear = useCallback(() => {
    persist([])
    setCoupon(null)
    localStorage.removeItem('sw_coupon')
  }, [persist])

  const applyCoupon = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase()
    if (!COUPONS[normalized]) return { ok: false, message: 'Invalid coupon code' }
    setCoupon(normalized)
    localStorage.setItem('sw_coupon', normalized)
    return { ok: true, message: `${Math.round(COUPONS[normalized] * 100)}% off applied` }
  }, [])

  const subtotalInr = useMemo(
    () => items.reduce((sum, i) => sum + i.unitPriceInr * i.qty, 0),
    [items],
  )
  const discountInr = useMemo(() => {
    if (!coupon || !COUPONS[coupon]) return 0
    return Math.round(subtotalInr * COUPONS[coupon])
  }, [coupon, subtotalInr])
  const shippingInr = subtotalInr - discountInr > 2000 || subtotalInr === 0 ? 0 : 149
  const taxable = Math.max(0, subtotalInr - discountInr)
  const taxInr = Math.round(taxable * 0.05)
  const totalInr = taxable + shippingInr + taxInr
  const count = items.reduce((n, i) => n + i.qty, 0)

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQty,
      clear,
      count,
      subtotalInr,
      coupon,
      applyCoupon,
      discountInr,
      shippingInr,
      taxInr,
      totalInr,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQty,
      clear,
      count,
      subtotalInr,
      coupon,
      applyCoupon,
      discountInr,
      shippingInr,
      taxInr,
      totalInr,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
