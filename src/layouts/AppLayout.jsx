import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { nav } from '../data/i18n'
import { useApp } from '../context/AppContext'

export default function AppLayout() {
  const { user, logout, t, toggleLang, lang, data } = useApp()
  const [open, setOpen] = useState(false)

  if (!user) return <Navigate to="/login" replace />

  return (
    <div className="erp-shell">
      <aside className={`sidebar ${open ? 'is-open' : ''}`}>
        <div className="sidebar-brand">
          <span className="logo">EG</span>
          <div>
            <strong>{t('appName')}</strong>
            <small>{t(data.company.short)}</small>
          </div>
        </div>
        <nav className="sidebar-nav">
          {nav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setOpen(false)}
            >
              <span className="nav-ico" aria-hidden>
                {item.icon}
              </span>
              {t(item.key)}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-foot">
          <p>{t(data.company.plant)}</p>
          <p className="muted">{data.company.hotline}</p>
        </div>
      </aside>

      <div className="erp-main">
        <header className="topbar">
          <button type="button" className="menu-btn" onClick={() => setOpen((v) => !v)}>
            ☰
          </button>
          <div className="topbar-title">
            <span>{t(data.company.name)}</span>
          </div>
          <div className="topbar-actions">
            <button type="button" className="ghost-btn" onClick={toggleLang}>
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <div className="user-chip">
              <span>{t(user.name)}</span>
              <button type="button" onClick={logout}>
                {t('logout')}
              </button>
            </div>
          </div>
        </header>
        <div className="content">
          <Outlet />
        </div>
      </div>
      {open ? <button type="button" className="backdrop" onClick={() => setOpen(false)} aria-label="Close" /> : null}
    </div>
  )
}
