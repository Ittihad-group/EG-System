import { Link } from 'react-router-dom'
import { company, footerBlurb, labels, nav } from '../data/content'
import { useLang } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLang()
  const links = nav.filter((n) => n.path !== '/')

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-about">
          <div className="brand brand-footer">
            <span className="brand-mark">EG</span>
            <span className="brand-text">
              <strong>{t(company.shortName)}</strong>
              <small>WPC &amp; PVC</small>
            </span>
          </div>
          <p>{t(footerBlurb)}</p>
          <a
            className="btn btn-outline"
            href={company.catalogUrl}
            target="_blank"
            rel="noreferrer"
          >
            {t(labels.viewCatalogShort)}
          </a>
        </div>

        <div>
          <h3>{t(labels.importantLinks)}</h3>
          <ul className="footer-links">
            {links.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{t(labels[item.key])}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>{t(labels.contact)}</h3>
          <ul className="footer-contact">
            <li>{t(company.address)}</li>
            <li>
              <a href={`tel:${company.hotline}`}>{company.hotline}</a>
              <span className="muted"> — {t(company.hours)}</span>
            </li>
            <li>
              <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{t(labels.rights)}</p>
      </div>
    </footer>
  )
}
