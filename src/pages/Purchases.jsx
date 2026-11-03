import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import { useApp } from '../context/AppContext'

export default function Purchases() {
  const { t, money, data, statusLabel } = useApp()
  const supplierMap = Object.fromEntries(data.suppliers.map((s) => [s.id, s]))

  const columns = [
    { key: 'number', label: '#', render: (r) => <strong>{r.number}</strong> },
    { key: 'date', label: t('date') },
    {
      key: 'supplier',
      label: t('supplier'),
      render: (r) => t(supplierMap[r.supplierId]?.name || {}),
    },
    { key: 'note', label: t('note'), render: (r) => t(r.note) },
    {
      key: 'status',
      label: t('status'),
      render: (r) => <StatusBadge status={r.status} label={statusLabel(r.status)} />,
    },
    { key: 'total', label: t('total'), render: (r) => money(r.total) },
  ]

  return (
    <div>
      <PageHeader title={t('purchases')} />
      <div className="panel">
        <DataTable columns={columns} rows={data.purchaseOrders} empty={t('noData')} />
      </div>
    </div>
  )
}
