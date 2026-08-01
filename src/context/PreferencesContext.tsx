import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { currencies, languages, type CurrencyCode, type LangCode } from '../data/pigments'
import { detectCurrencyFromLocale } from '../utils/money'
import { t as translate } from '../i18n/translations'

type PreferencesContextValue = {
  currency: CurrencyCode
  setCurrency: (c: CurrencyCode) => void
  language: LangCode
  setLanguage: (l: LangCode) => void
  t: (key: string) => string
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null)

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('sw_currency') as CurrencyCode | null
    if (saved && currencies[saved]) return saved
    return detectCurrencyFromLocale()
  })
  const [language, setLanguageState] = useState<LangCode>(() => {
    const saved = localStorage.getItem('sw_lang') as LangCode | null
    if (saved && languages[saved]) return saved
    return 'en'
  })

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c)
    localStorage.setItem('sw_currency', c)
  }, [])

  const setLanguage = useCallback((l: LangCode) => {
    setLanguageState(l)
    localStorage.setItem('sw_lang', l)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = languages[language].dir
  }, [language])

  const t = useCallback((key: string) => translate(language, key), [language])

  const value = useMemo(
    () => ({ currency, setCurrency, language, setLanguage, t }),
    [currency, setCurrency, language, setLanguage, t],
  )

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext)
  if (!ctx) throw new Error('usePreferences must be used within PreferencesProvider')
  return ctx
}
