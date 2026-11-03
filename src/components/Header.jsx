import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { company, labels, nav } from '../data/content'
import { useLang } from '../context/LanguageContext'

export default function Header() {
  const { lang, toggle, t } = useLang()
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">EG</span>
          <span className="brand-text">
            <strong>{t(company.shortName)}</strong>
            <small>WPC &amp; PVC</small>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`main-nav ${open ? 'is-open' : ''}`}>
          {nav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setOpen(false)}
            >
              {t(labels[item.key])}
            </NavLink>
          ))}
          <button type="button" className="lang-btn" onClick={toggle}>
            {lang === 'ar' ? 'en_US English' : 'العربية'}
          </button>
        </nav>
      </div>
    </header>
  )
}
