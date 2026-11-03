import { company, labels } from '../data/content'
import { useLang } from '../context/LanguageContext'
import PageHero from '../components/PageHero'

export default function Contact() {
  const { t } = useLang()

  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = encodeURIComponent(
      t({ ar: 'رسالة من موقع EG-System', en: 'Message from EG-System website' }),
    )
    const body = encodeURIComponent(
      `${t(labels.name)}: ${data.get('name')}\n${t(labels.phone)}: ${data.get('phone')}\n${t(labels.email)}: ${data.get('email')}\n\n${data.get('message')}`,
    )
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`
  }

  return (
    <>
      <PageHero title={t(labels.contact)} />
      <section className="section">
        <div className="container contact-grid">
          <div className="contact-cards">
            <article>
              <h3>{t(labels.hq)}</h3>
              <p>{t(company.address)}</p>
            </article>
            <article>
              <h3>{t(labels.hotline)}</h3>
              <p>
                <a href={`tel:${company.hotline}`}>{company.hotline}</a>
              </p>
              <p className="muted">{t(company.hours)}</p>
            </article>
            <article>
              <h3>{t(labels.whatsapp)}</h3>
              <p>
                <a
                  href={`https://wa.me/${company.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {company.phoneDisplay}
                </a>
              </p>
            </article>
            <article>
              <h3>{t(labels.emailLabel)}</h3>
              <p>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </p>
            </article>
          </div>

          <form className="contact-form" onSubmit={onSubmit}>
            <label>
              {t(labels.name)}
              <input name="name" required />
            </label>
            <label>
              {t(labels.email)}
              <input name="email" type="email" required />
            </label>
            <label>
              {t(labels.phone)}
              <input name="phone" type="tel" />
            </label>
            <label>
              {t(labels.message)}
              <textarea name="message" rows={5} required />
            </label>
            <button type="submit" className="btn btn-primary">
              {t(labels.sendMessage)}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
