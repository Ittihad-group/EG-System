import { Suspense, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { PATHS } from '@app/config/paths'
import PageFallback from '@app/pages/PageFallback'
import { useApp } from '@app/providers'
import { buildNavigation } from '@app/router/navigation'

function NavItem({ to, icon, label, onNavigate }) {
  return (
    <NavLink to={to} end={to === PATHS.dashboard} onClick={onNavigate}>
      {icon ? (
        <span className="nav-ico" aria-hidden>
          {icon}
        </span>
      ) : null}
      {label}
    </NavLink>
  )
}

/** Authenticated shell. Auth is enforced by `RequireAuth` in the router. */
export default function AppLayout() {
  const { user, logout, t, toggleLang, lang, data, can } = useApp()
  const [open, setOpen] = useState(false)
  const nav = buildNavigation(can)
  const close = () => setOpen(false)

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
          {nav.map((mod) =>
            mod.pages.length === 1 ? (
              <NavItem
                key={mod.id}
                to={mod.pages[0].path}
                icon={mod.icon}
                label={t(mod.labelKey)}
                onNavigate={close}
              />
            ) : (
              <div key={mod.id} className="nav-group">
                <span className="nav-group-title">
                  <span className="nav-ico" aria-hidden>
                    {mod.icon}
                  </span>
                  {t(mod.labelKey)}
                </span>
                {mod.pages.map((page) => (
                  <NavItem
                    key={page.id}
                    to={page.path}
                    label={t(page.labelKey)}
                    onNavigate={close}
                  />
                ))}
              </div>
            ),
          )}
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
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
      {open ? (
        <button type="button" className="backdrop" onClick={close} aria-label="Close" />
      ) : null}
    </div>
  )
}
