import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import { useApp } from '../context/AppContext'

export default function Suppliers() {
  const { t, money, data } = useApp()

  const columns = [
    { key: 'code', label: t('sku'), render: (r) => <code>{r.code}</code> },
    { key: 'name', label: t('name'), render: (r) => t(r.name) },
    { key: 'category', label: t('category') },
    { key: 'phone', label: t('phone') },
    { key: 'email', label: t('email') },
    {
      key: 'balance',
      label: t('balance'),
      render: (r) => money(r.balance),
    },
  ]

  return (
    <div>
      <PageHeader title={t('suppliers')} />
      <div className="panel">
        <DataTable columns={columns} rows={data.suppliers} empty={t('noData')} />
      </div>
    </div>
  )
}
