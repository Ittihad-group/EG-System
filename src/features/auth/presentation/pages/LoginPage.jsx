import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import PageFallback from '@app/pages/PageFallback'
import { useApp } from '@app/providers'
import { getHomePath } from '@app/router/navigation'

export default function LoginPage() {
  const { user, authStatus, authMode, login, t, data, lang, toggleLang, can } = useApp()
  const location = useLocation()
  const isDemo = authMode === 'demo'
  const [email, setEmail] = useState(isDemo ? 'admin@egerman-upvc.com' : '')
  const [password, setPassword] = useState(isDemo ? 'admin123' : '')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (authStatus === 'loading') return <PageFallback />

  // Back to the page the user originally opened (deep link), else their home.
  if (user) {
    const from = location.state?.from
    const target = from
      ? `${from.pathname}${from.search ?? ''}${from.hash ?? ''}`
      : getHomePath(can)
    return <Navigate to={target} replace />
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const res = await login(email.trim(), password)
    if (!res.ok) {
      setError(t(res.reason === 'invalid_credentials' ? 'loginInvalid' : 'loginUnavailable'))
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <span className="logo lg">EG</span>
          <h1>{t('appName')}</h1>
          <p>{t(data.company.name)}</p>
          <p className="muted">{t(data.company.plant)}</p>
        </div>
        <form onSubmit={onSubmit} className="login-form">
          <h2>{t('login')}</h2>
          <p className="muted">{t('welcome')}</p>
          <label>
            {t('email')}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="username"
              required
            />
          </label>
          <label>
            {t('password')}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : null}
          <button type="submit" className="btn primary" disabled={submitting}>
            {t('login')}
          </button>
          {isDemo ? <p className="demo-hint">{t('demoHint')}</p> : null}
          <button type="button" className="ghost-btn" onClick={toggleLang}>
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>
        </form>
      </div>
    </div>
  )
}
