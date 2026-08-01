import { currencies, type CurrencyCode } from '../data/pigments'
import type { Product } from '../data/catalog'

export function convertFromInr(amountInr: number, currency: CurrencyCode): number {
  return amountInr * currencies[currency].rateFromInr
}

export function formatMoney(amountInr: number, currency: CurrencyCode): string {
  const meta = currencies[currency]
  const converted = convertFromInr(amountInr, currency)
  const rounded =
    currency === 'INR' ? Math.round(converted) : Math.round(converted * 100) / 100
  try {
    return new Intl.NumberFormat(meta.locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: currency === 'INR' ? 0 : 2,
    }).format(rounded)
  } catch {
    return `${meta.symbol}${rounded.toFixed(currency === 'INR' ? 0 : 2)}`
  }
}

export function salePriceInr(product: Product, packPriceInr?: number): number {
  const base = packPriceInr ?? product.basePriceInr
  if (!product.discountPercent) return base
  return Math.round(base * (1 - product.discountPercent / 100))
}

export function detectCurrencyFromLocale(): CurrencyCode {
  const lang = navigator.language || 'en-IN'
  if (lang.includes('US')) return 'USD'
  if (lang.includes('GB')) return 'GBP'
  if (lang.includes('AU')) return 'AUD'
  if (lang.includes('CA')) return 'CAD'
  if (lang.includes('AE') || lang.includes('SA')) return 'AED'
  if (
    lang.startsWith('de') ||
    lang.startsWith('fr') ||
    lang.startsWith('es') ||
    lang.startsWith('nl') ||
    lang.includes('EU')
  )
    return 'EUR'
  if (lang.includes('IN') || lang.startsWith('hi')) return 'INR'
  return 'INR'
}

export function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toLocaleString('en', { useGrouping: false }).slice(2)}${Date.now().toString(36)}`
}
