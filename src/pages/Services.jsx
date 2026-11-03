import { labels, services } from '../data/content'
import { useLang } from '../context/LanguageContext'
import PageHero from '../components/PageHero'

export default function Services() {
  const { t } = useLang()

  return (
    <>
      <PageHero title={t(labels.services)} />
      <section className="section">
        <div className="container services-grid services-page">
          {services.map((s, i) => (
            <article key={s.id} className="service-item">
              <span className="slide-index">0{i + 1}</span>
              <h3>{t(s.title)}</h3>
              <p>{t(s.desc)}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
