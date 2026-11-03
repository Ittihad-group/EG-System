import { useEffect, useMemo, useState } from 'react'
import * as seed from '@shared/services/seedData'
import { t as dict } from '@shared/utils/i18n'
import { resolveHostnameModule } from '@app/router/subdomain'
import { AppContext } from './app-context'

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('eg-erp-lang') || 'ar')
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('eg-erp-user')
    return raw ? JSON.parse(raw) : null
  })
  const [activeModule, setActiveModule] = useState(() => resolveHostnameModule())

  useEffect(() => {
    localStorage.setItem('eg-erp-lang', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  useEffect(() => {
    if (user) localStorage.setItem('eg-erp-user', JSON.stringify(user))
    else localStorage.removeItem('eg-erp-user')
  }, [user])

  useEffect(() => {
    const syncModule = () => setActiveModule(resolveHostnameModule())
    syncModule()
    window.addEventListener('popstate', syncModule)
    return () => window.removeEventListener('popstate', syncModule)
  }, [])

  const value = useMemo(() => {
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

    return {
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
      activeModule,
    }
  }, [lang, user, activeModule])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
