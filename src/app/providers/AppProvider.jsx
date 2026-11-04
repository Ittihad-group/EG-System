import { useCallback, useEffect, useMemo, useState } from 'react'
import { authService } from '@features/auth/data/authService'
import { hasPermission } from '@shared/auth/permissions'
import { UNAUTHORIZED_EVENT } from '@shared/services/apiClient'
import * as seed from '@shared/services/seedData'
import { t as dict } from '@shared/utils/i18n'
import { AppContext } from './app-context'

const LANG_KEY = 'eg-erp-lang'

/**
 * Session lifecycle:
 *   loading → (restore) → authenticated | anonymous
 * Any 401 from the API drops back to anonymous, and the router sends the user
 * to /login, returning them to the same page after they sign in again.
 */
export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem(LANG_KEY) || 'ar')
  const [session, setSession] = useState({ status: 'loading', user: null })

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  useEffect(() => {
    let cancelled = false
    authService.restore().then((user) => {
      if (!cancelled) setSession({ status: user ? 'authenticated' : 'anonymous', user })
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const onUnauthorized = () => setSession({ status: 'anonymous', user: null })
    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized)
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized)
  }, [])

  const login = useCallback(async (email, password) => {
    const result = await authService.login(email, password)
    if (result.ok) setSession({ status: 'authenticated', user: result.user })
    return result
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setSession({ status: 'anonymous', user: null })
  }, [])

  const value = useMemo(() => {
    const { user } = session

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

    /** UX-level check only — the API must enforce the same permission. */
    const can = (permission) => hasPermission(user?.permissions, permission)

    return {
      lang,
      setLang,
      toggleLang: () => setLang((l) => (l === 'ar' ? 'en' : 'ar')),
      user,
      authStatus: session.status,
      authMode: authService.mode,
      login,
      logout,
      can,
      t,
      statusLabel,
      money,
      data: seed,
    }
  }, [lang, session, login, logout])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
