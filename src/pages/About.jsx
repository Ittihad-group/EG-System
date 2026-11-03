import { about, company, labels } from '../data/content'
import { useLang } from '../context/LanguageContext'
import PageHero from '../components/PageHero'

export default function About() {
  const { t } = useLang()

  return (
    <>
      <PageHero title={t(labels.about)} subtitle={t(company.name)} />
      <section className="section">
        <div className="container prose">
          {t(about.intro)
            .split('\n\n')
            .map((para, i) => (
              <p key={i}>{para}</p>
            ))}
        </div>
      </section>

      <section className="section alt">
        <div className="container pillars-page">
          <article>
            <h2>{t(labels.vision)}</h2>
            <p>{t(about.vision)}</p>
          </article>
          <article>
            <h2>{t(labels.mission)}</h2>
            <p>{t(about.mission)}</p>
          </article>
          <article>
            <h2>{t(labels.goal)}</h2>
            <p>{t(about.goal)}</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>
              {t({
                ar: 'مزايا منتجاتنا',
                en: 'Product Advantages',
              })}
            </h2>
          </div>
          <ul className="feature-list">
            {about.features.map((f, i) => (
              <li key={i}>{t(f)}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
