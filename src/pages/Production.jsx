import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import { useApp } from '../context/AppContext'

export default function Production() {
  const { t, data, statusLabel } = useApp()
  const productMap = Object.fromEntries(data.products.map((p) => [p.id, p]))
  const soMap = Object.fromEntries(data.salesOrders.map((o) => [o.id, o]))

  const columns = [
    { key: 'number', label: '#', render: (r) => <strong>{r.number}</strong> },
    {
      key: 'product',
      label: t('products'),
      render: (r) => t(productMap[r.productId]?.name || {}),
    },
    { key: 'qty', label: t('qty') },
    { key: 'line', label: t('line'), render: (r) => t(r.line) },
    {
      key: 'so',
      label: t('sales'),
      render: (r) => soMap[r.salesOrderId]?.number || '—',
    },
    { key: 'startDate', label: t('date') },
    { key: 'dueDate', label: t('dueDate') },
    {
      key: 'progress',
      label: t('progress'),
      render: (r) => (
        <div className="progress-row">
          <div className="progress-mini">
            <div style={{ width: `${r.progress}%` }} />
          </div>
          <span>{r.progress}%</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: t('status'),
      render: (r) => <StatusBadge status={r.status} label={statusLabel(r.status)} />,
    },
  ]

  return (
    <div>
      <PageHeader title={t('production')} subtitle={t(data.company.plant)} />
      <div className="panel">
        <DataTable columns={columns} rows={data.workOrders} empty={t('noData')} />
      </div>
    </div>
  )
}
