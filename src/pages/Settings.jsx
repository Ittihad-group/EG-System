import PageHeader from '../components/PageHeader'
import { useApp } from '../context/AppContext'

export default function Settings() {
  const { t, data, lang, setLang } = useApp()
  const c = data.company

  return (
    <div>
      <PageHeader title={t('settings')} />
      <div className="dash-grid">
        <section className="panel">
          <div className="panel-head">
            <h2>{t('companyInfo')}</h2>
          </div>
          <dl className="info-list">
            <div>
              <dt>{t('name')}</dt>
              <dd>{t(c.name)}</dd>
            </div>
            <div>
              <dt>{t('plant')}</dt>
              <dd>{t(c.plant)}</dd>
            </div>
            <div>
              <dt>{t('note')}</dt>
              <dd>{t(c.address)}</dd>
            </div>
            <div>
              <dt>{t('phone')}</dt>
              <dd>
                {c.hotline} / {c.phone}
              </dd>
            </div>
            <div>
              <dt>{t('email')}</dt>
              <dd>{c.email}</dd>
            </div>
          </dl>
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2>{t('language')}</h2>
          </div>
          <div className="lang-switch">
            <button
              type="button"
              className={`btn ${lang === 'ar' ? 'primary' : 'ghost'}`}
              onClick={() => setLang('ar')}
            >
              العربية
            </button>
            <button
              type="button"
              className={`btn ${lang === 'en' ? 'primary' : 'ghost'}`}
              onClick={() => setLang('en')}
            >
              English
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
