import { Link } from 'react-router-dom'
import { PATHS } from '@app/config/paths'
import { PERMISSIONS } from '@app/config/permissions'
import { useApp } from '@app/providers'
import { PageHeader, StatCard } from '@shared/components'

export default function DashboardPage() {
  const { t, money, data, statusLabel, can } = useApp()
  const { products, inventory, salesOrders, workOrders, financeSummary, activity, company } = data

  const availableMap = inventory.reduce((acc, row) => {
    const avail = row.qty - row.reserved
    acc[row.productId] = (acc[row.productId] || 0) + avail
    return acc
  }, {})

  const lowStock = products.filter((p) => (availableMap[p.id] || 0) < p.minStock).length
  const openSales = salesOrders.filter((o) => !['shipped', 'draft'].includes(o.status)).length
  const wip = workOrders.filter((w) => w.status === 'in_progress' || w.status === 'queued').length

  // Each widget is shown only to users who may open the module it summarises.
  const canSales = can(PERMISSIONS.SALES_ORDERS_READ)
  const canProduction = can(PERMISSIONS.PRODUCTION_WORK_ORDERS_READ)
  const canStock = can(PERMISSIONS.INVENTORY_STOCK_READ)
  const canFinance = can(PERMISSIONS.FINANCE_OVERVIEW_READ)
  const visibleActivity = activity.filter((a) => can(a.permission))

  return (
    <div>
      <PageHeader title={t('dashboard')} subtitle={`${t('plant')}: ${t(company.plant)}`} />

      <div className="stats-grid">
        {canFinance ? (
          <StatCard label={t('monthSales')} value={money(financeSummary.monthSales)} tone="accent" />
        ) : null}
        {canSales ? (
          <StatCard label={t('openOrders')} value={openSales} hint={`${salesOrders.length} total`} />
        ) : null}
        {canProduction ? <StatCard label={t('workInProgress')} value={wip} tone="warn" /> : null}
        {canStock ? (
          <StatCard label={t('lowStock')} value={lowStock} tone={lowStock ? 'danger' : 'ok'} />
        ) : null}
        {canFinance ? (
          <>
            <StatCard label={t('receivables')} value={money(financeSummary.receivables)} />
            <StatCard label={t('cash')} value={money(financeSummary.cash)} tone="ok" />
          </>
        ) : null}
      </div>

      <div className="dash-grid">
        {canSales ? (
          <section className="panel">
            <div className="panel-head">
              <h2>{t('sales')}</h2>
              <Link to={PATHS.sales.orders}>{t('view')}</Link>
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
        ) : null}

        {canProduction ? (
          <section className="panel">
            <div className="panel-head">
              <h2>{t('production')}</h2>
              <Link to={PATHS.production.workOrders}>{t('view')}</Link>
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
        ) : null}

        <section className="panel span-2">
          <div className="panel-head">
            <h2>{t('recentActivity')}</h2>
          </div>
          {visibleActivity.length ? (
            <ul className="activity-list">
              {visibleActivity.map((a) => (
                <li key={a.id}>
                  <time>{a.at}</time>
                  <p>{t(a.text)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">{t('noData')}</div>
          )}
        </section>
      </div>
    </div>
  )
}
