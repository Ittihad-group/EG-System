import { PageHeader, StatCard } from '@shared/components'
import { useApp } from '@app/providers'

export default function FinancePage() {
  const { t, money, data } = useApp()
  const f = data.financeSummary

  const customerBalances = data.customers
    .filter((c) => c.balance > 0)
    .sort((a, b) => b.balance - a.balance)

  const supplierBalances = data.suppliers
    .filter((s) => s.balance < 0)
    .sort((a, b) => a.balance - b.balance)

  return (
    <div>
      <PageHeader title={t('finance')} />
      <div className="stats-grid">
        <StatCard label={t('monthSales')} value={money(f.monthSales)} tone="accent" />
        <StatCard label={t('receivables')} value={money(f.receivables)} />
        <StatCard label={t('payables')} value={money(Math.abs(f.payables))} tone="warn" />
        <StatCard label={t('cash')} value={money(f.cash)} tone="ok" />
      </div>

      <div className="dash-grid">
        <section className="panel">
          <div className="panel-head">
            <h2>{t('receivables')}</h2>
          </div>
          <ul className="simple-list">
            {customerBalances.map((c) => (
              <li key={c.id}>
                <div>
                  <strong>{t(c.name)}</strong>
                  <span className="muted">{c.code}</span>
                </div>
                <span>{money(c.balance)}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="panel">
          <div className="panel-head">
            <h2>{t('payables')}</h2>
          </div>
          <ul className="simple-list">
            {supplierBalances.map((s) => (
              <li key={s.id}>
                <div>
                  <strong>{t(s.name)}</strong>
                  <span className="muted">{s.code}</span>
                </div>
                <span>{money(Math.abs(s.balance))}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <p className="muted vat-note">
        VAT {Math.round(f.vatRate * 100)}% · {f.currency}
      </p>
    </div>
  )
}
