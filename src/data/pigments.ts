export type PigmentKey =
  | 'turmeric'
  | 'chili'
  | 'cardamom'
  | 'saffron'
  | 'cumin'
  | 'coriander'
  | 'pepper'
  | 'cinnamon'
  | 'fenugreek'
  | 'mustard'

export const pigments: Record<
  PigmentKey,
  { name: string; hex: string; soft: string; label: string }
> = {
  turmeric: { name: 'Turmeric Gold', hex: '#D4A017', soft: '#D4A01733', label: 'Haldi' },
  chili: { name: 'Chili Brick', hex: '#B33A2B', soft: '#B33A2B33', label: 'Mirchi' },
  cardamom: { name: 'Cardamom Olive', hex: '#6B7A3A', soft: '#6B7A3A33', label: 'Elaichi' },
  saffron: { name: 'Saffron Ember', hex: '#C45C26', soft: '#C45C2633', label: 'Kesar' },
  cumin: { name: 'Cumin Sand', hex: '#A67C52', soft: '#A67C5233', label: 'Jeera' },
  coriander: { name: 'Coriander Sage', hex: '#8A9A5B', soft: '#8A9A5B33', label: 'Dhania' },
  pepper: { name: 'Pepper Ash', hex: '#3D3A36', soft: '#3D3A3633', label: 'Kali Mirch' },
  cinnamon: { name: 'Cinnamon Bark', hex: '#8B4513', soft: '#8B451333', label: 'Dalchini' },
  fenugreek: { name: 'Fenugreek Ochre', hex: '#C4A35A', soft: '#C4A35A33', label: 'Methi' },
  mustard: { name: 'Mustard Seed', hex: '#E8B923', soft: '#E8B92333', label: 'Rai' },
}

export type CurrencyCode = 'INR' | 'USD' | 'GBP' | 'AUD' | 'CAD' | 'EUR' | 'AED'

export const currencies: Record<
  CurrencyCode,
  { symbol: string; name: string; flag: string; rateFromInr: number; locale: string }
> = {
  INR: { symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', rateFromInr: 1, locale: 'en-IN' },
  USD: { symbol: '$', name: 'US Dollar', flag: '🇺🇸', rateFromInr: 0.012, locale: 'en-US' },
  GBP: { symbol: '£', name: 'British Pound', flag: '🇬🇧', rateFromInr: 0.0094, locale: 'en-GB' },
  AUD: { symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', rateFromInr: 0.018, locale: 'en-AU' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦', rateFromInr: 0.016, locale: 'en-CA' },
  EUR: { symbol: '€', name: 'Euro', flag: '🇪🇺', rateFromInr: 0.011, locale: 'de-DE' },
  AED: { symbol: 'AED ', name: 'UAE Dirham', flag: '🇦🇪', rateFromInr: 0.044, locale: 'ar-AE' },
}

export type LangCode = 'en' | 'hi' | 'ar' | 'fr' | 'de' | 'es'

export const languages: Record<LangCode, { name: string; native: string; dir: 'ltr' | 'rtl' }> = {
  en: { name: 'English', native: 'English', dir: 'ltr' },
  hi: { name: 'Hindi', native: 'हिन्दी', dir: 'ltr' },
  ar: { name: 'Arabic', native: 'العربية', dir: 'rtl' },
  fr: { name: 'French', native: 'Français', dir: 'ltr' },
  de: { name: 'German', native: 'Deutsch', dir: 'ltr' },
  es: { name: 'Spanish', native: 'Español', dir: 'ltr' },
}

export const exportCountries = [
  { code: 'IN', name: 'India', currency: 'INR' as CurrencyCode },
  { code: 'US', name: 'USA', currency: 'USD' as CurrencyCode },
  { code: 'CA', name: 'Canada', currency: 'CAD' as CurrencyCode },
  { code: 'GB', name: 'UK', currency: 'GBP' as CurrencyCode },
  { code: 'AE', name: 'UAE', currency: 'AED' as CurrencyCode },
  { code: 'AU', name: 'Australia', currency: 'AUD' as CurrencyCode },
  { code: 'DE', name: 'Germany', currency: 'EUR' as CurrencyCode },
  { code: 'SA', name: 'Saudi Arabia', currency: 'AED' as CurrencyCode },
  { code: 'FR', name: 'France', currency: 'EUR' as CurrencyCode },
  { code: 'ES', name: 'Spain', currency: 'EUR' as CurrencyCode },
  { code: 'NL', name: 'Netherlands', currency: 'EUR' as CurrencyCode },
  { code: 'SG', name: 'Singapore', currency: 'USD' as CurrencyCode },
]

export const paymentMethods = [
  'Credit Card',
  'Debit Card',
  'UPI',
  'Net Banking',
  'Wallets',
  'Apple Pay',
  'Google Pay',
  'PayPal',
  'Stripe',
  'Bank Transfer',
  'Wise',
  'Razorpay',
]
