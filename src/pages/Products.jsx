import { company, labels, products } from '../data/content'
import { useLang } from '../context/LanguageContext'
import PageHero from '../components/PageHero'

export default function Products() {
  const { t } = useLang()

  return (
    <>
      <PageHero
        title={t(labels.products)}
        subtitle={t({
          ar: 'أبواب WPC & PVC، تجاليد بديل الخشب، وألواح الفوم بورد',
          en: 'WPC & PVC doors, wood-alternative cladding, and foam boards',
        })}
      />
      <section className="section">
        <div className="container products-detail">
          {products.map((p) => (
            <article key={p.id} className="product-detail">
              <div>
                <h2>{t(p.title)}</h2>
                <p>{t(p.desc)}</p>
                <p className="muted">{t(p.catalogHint)}</p>
                {p.samplePrice ? (
                  <p className="price">{t(p.samplePrice)}</p>
                ) : null}
                <a
                  className="btn btn-primary"
                  href={company.catalogUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t(labels.viewCatalog)}
                </a>
              </div>
              <ul>
                {t(p.highlights).map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
