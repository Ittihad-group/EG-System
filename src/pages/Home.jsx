import { Link } from 'react-router-dom'
import { company, home, labels, news, products, services } from '../data/content'
import { useLang } from '../context/LanguageContext'

export default function Home() {
  const { t } = useLang()

  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-content">
          <p className="brand-hero">{t(company.name)}</p>
          <h1>{t(home.hero.title)}</h1>
          <p className="hero-lead">{t(home.hero.subtitle)}</p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">
              {t(home.hero.cta)}
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              {t(home.hero.ctaSecondary)}
            </Link>
          </div>
        </div>
      </section>

      <section className="section slides-section">
        <div className="container slides-grid">
          {home.slides.map((slide, i) => (
            <article key={i} className="slide-item">
              <span className="slide-index">0{i + 1}</span>
              <h2>{t(slide.title)}</h2>
              <p>{t(slide.desc)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-preview">
        <div className="container split">
          <div>
            <p className="eyebrow">{t(labels.about)}</p>
            <h2>{t(company.name)}</h2>
            {t(home.aboutPreview)
              .split('\n\n')
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            <Link to="/about" className="btn btn-primary">
              {t(labels.learnMore)}
            </Link>
          </div>
          <div className="pillars">
            <div>
              <h3>{t(labels.vision)}</h3>
              <p>
                {t({
                  ar: 'أن نكون الشركة الرائدة في تصنيع منتجات WPC & PVC عبر تقديم حلول مبتكرة ومستدامة للبناء والتشييد.',
                  en: 'To be the leading company in manufacturing WPC & PVC products by delivering innovative and sustainable construction solutions.',
                })}
              </p>
            </div>
            <div>
              <h3>{t(labels.mission)}</h3>
              <p>
                {t({
                  ar: 'نوفر منتجات بجودة عالية وكفاءة استثنائية تلبي احتياجات عملائنا وتدعم الاستدامة في المشاريع السكنية والتجارية.',
                  en: 'We provide high-quality, exceptionally efficient products that meet our clients’ needs and support sustainability.',
                })}
              </p>
            </div>
            <div>
              <h3>{t(labels.goal)}</h3>
              <p>
                {t({
                  ar: 'تحقيق الريادة من خلال تطوير حلول متطورة تعتمد على أحدث التقنيات، مع الالتزام بمعايير الجودة العالمية.',
                  en: 'Achieve leadership through advanced technology solutions while adhering to global quality standards.',
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{t(labels.services)}</p>
            <h2>{t(labels.services)}</h2>
          </div>
          <div className="services-grid">
            {services.slice(0, 3).map((s) => (
              <article key={s.id} className="service-item">
                <h3>{t(s.title)}</h3>
                <p>{t(s.desc)}</p>
              </article>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/services" className="btn btn-outline">
              {t(labels.learnMore)}
            </Link>
          </div>
        </div>
      </section>

      <section className="section products-section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{t(labels.products)}</p>
            <h2>{t(labels.products)}</h2>
          </div>
          <div className="products-grid">
            {products.map((p) => (
              <article key={p.id} className="product-item">
                <h3>{t(p.title)}</h3>
                <p>{t(p.desc)}</p>
                <a
                  className="text-link"
                  href={company.catalogUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t(labels.viewCatalog)}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section stats-section">
        <div className="container">
          <div className="stats-head">
            <h2>{t(labels.trustTitle)}</h2>
            <p>{t(labels.trustSubtitle)}</p>
          </div>
          <div className="stats-grid">
            {home.stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <strong>{stat.value}</strong>
                <span>{t(stat.key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{t(labels.news)}</p>
            <h2>{t(labels.latestNews)}</h2>
          </div>
          <div className="news-grid">
            {news.map((item) => (
              <article key={item.id} className="news-item">
                <time>{item.date}</time>
                <h3>{t(item.title)}</h3>
                <p>{t(item.excerpt)}</p>
                <Link to="/news" className="text-link">
                  {t(labels.readMore)}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
