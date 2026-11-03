import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useApp } from '@app/providers'
import { getModuleHomePath } from '@app/router/subdomain'

export default function LoginPage() {
  const { user, login, t, data, lang, toggleLang, activeModule } = useApp()
  const [email, setEmail] = useState('admin@egerman-upvc.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')

  if (user) return <Navigate to={getModuleHomePath(activeModule)} replace />

  const onSubmit = (e) => {
    e.preventDefault()
    const res = login(email.trim(), password)
    if (!res.ok) {
      setError(lang === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials')
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
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </label>
          <label>
            {t('password')}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <button type="submit" className="btn primary">
            {t('login')}
          </button>
          <p className="demo-hint">{t('demoHint')}</p>
          <button type="button" className="ghost-btn" onClick={toggleLang}>
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>
        </form>
      </div>
    </div>
  )
}
