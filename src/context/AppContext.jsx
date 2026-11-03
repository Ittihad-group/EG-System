import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as seed from '../data/seed'
import { t as dict } from '../data/i18n'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('eg-erp-lang') || 'ar')
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('eg-erp-user')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    localStorage.setItem('eg-erp-lang', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  useEffect(() => {
    if (user) localStorage.setItem('eg-erp-user', JSON.stringify(user))
    else localStorage.removeItem('eg-erp-user')
  }, [user])

  const t = (keyOrObj) => {
    if (keyOrObj && typeof keyOrObj === 'object') return keyOrObj[lang] ?? keyOrObj.ar ?? ''
    const entry = dict[keyOrObj]
    if (!entry) return keyOrObj
    if (typeof entry === 'object' && (entry.ar || entry.en)) return entry[lang] ?? entry.ar
    return entry
  }

  const statusLabel = (code) => t(dict.statuses[code] || { ar: code, en: code })
  const money = (n) =>
    `${Number(n || 0).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-EG')} ${t('egp')}`

  const login = (email, password) => {
    const found = seed.users.find((u) => u.email === email && u.password === password)
    if (!found) return { ok: false }
    const { password: _, ...safe } = found
    setUser(safe)
    return { ok: true }
  }

  const logout = () => setUser(null)

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang((l) => (l === 'ar' ? 'en' : 'ar')),
      user,
      login,
      logout,
      t,
      statusLabel,
      money,
      data: seed,
    }),
    [lang, user],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp outside provider')
  return ctx
}
