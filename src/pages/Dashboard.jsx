import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import { useApp } from '../context/AppContext'

export default function Dashboard() {
  const { t, money, data, statusLabel } = useApp()
  const { products, inventory, salesOrders, workOrders, financeSummary, activity, company } = data

  const availableMap = inventory.reduce((acc, row) => {
    const avail = row.qty - row.reserved
    acc[row.productId] = (acc[row.productId] || 0) + avail
    return acc
  }, {})

  const lowStock = products.filter((p) => (availableMap[p.id] || 0) < p.minStock).length
  const openSales = salesOrders.filter((o) => !['shipped', 'draft'].includes(o.status)).length
  const wip = workOrders.filter((w) => w.status === 'in_progress' || w.status === 'queued').length

  return (
    <div>
      <PageHeader
        title={t('dashboard')}
        subtitle={`${t('plant')}: ${t(company.plant)}`}
      />

      <div className="stats-grid">
        <StatCard label={t('monthSales')} value={money(financeSummary.monthSales)} tone="accent" />
        <StatCard label={t('openOrders')} value={openSales} hint={`${salesOrders.length} total`} />
        <StatCard label={t('workInProgress')} value={wip} tone="warn" />
        <StatCard label={t('lowStock')} value={lowStock} tone={lowStock ? 'danger' : 'ok'} />
        <StatCard label={t('receivables')} value={money(financeSummary.receivables)} />
        <StatCard label={t('cash')} value={money(financeSummary.cash)} tone="ok" />
      </div>

      <div className="dash-grid">
        <section className="panel">
          <div className="panel-head">
            <h2>{t('sales')}</h2>
            <Link to="/sales">{t('view')}</Link>
          </div>
          <ul className="simple-list">
            {salesOrders.slice(0, 4).map((o) => (
              <li key={o.id}>
                <div>
                  <strong>{o.number}</strong>
                  <span className="muted">{o.date}</span>
                </div>
                <span className={`badge badge-${o.status}`}>{statusLabel(o.status)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2>{t('production')}</h2>
            <Link to="/production">{t('view')}</Link>
          </div>
          <ul className="simple-list">
            {workOrders.map((w) => (
              <li key={w.id}>
                <div>
                  <strong>{w.number}</strong>
                  <span className="muted">{t(w.line)}</span>
                </div>
                <div className="progress-mini">
                  <div style={{ width: `${w.progress}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel span-2">
          <div className="panel-head">
            <h2>{t('recentActivity')}</h2>
          </div>
          <ul className="activity-list">
            {activity.map((a) => (
              <li key={a.id}>
                <time>{a.at}</time>
                <p>{t(a.text)}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
