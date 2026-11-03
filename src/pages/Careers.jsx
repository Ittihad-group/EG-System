import { careers, company, labels } from '../data/content'
import { useLang } from '../context/LanguageContext'
import PageHero from '../components/PageHero'

export default function Careers() {
  const { t } = useLang()

  return (
    <>
      <PageHero title={t(labels.careers)} subtitle={t(careers.intro)} />
      <section className="section">
        <div className="container careers-list">
          {careers.openRoles.map((role, i) => (
            <article key={i} className="career-item">
              <div>
                <h2>{t(role.title)}</h2>
                <p>
                  {t(role.type)} · {t(role.loc)}
                </p>
              </div>
              <a className="btn btn-outline" href={`mailto:${company.email}?subject=${encodeURIComponent(t(role.title))}`}>
                {t(labels.applyNow)}
              </a>
            </article>
          ))}
          <p className="careers-note">{t(careers.note)}</p>
        </div>
      </section>
    </>
  )
}
