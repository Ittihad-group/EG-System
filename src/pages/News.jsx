import { labels, news } from '../data/content'
import { useLang } from '../context/LanguageContext'
import PageHero from '../components/PageHero'

export default function News() {
  const { t } = useLang()

  return (
    <>
      <PageHero title={t(labels.news)} subtitle={t(labels.latestNews)} />
      <section className="section">
        <div className="container news-list">
          {news.map((item) => (
            <article key={item.id} className="news-detail">
              <time>{item.date}</time>
              <h2>{t(item.title)}</h2>
              <p>{t(item.body)}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
