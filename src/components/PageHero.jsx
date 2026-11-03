export default function PageHero({ title, subtitle }) {
  return (
    <section className="page-hero">
      <div className="page-hero-inner">
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
    </section>
  )
}
