import { DataTable, PageHeader } from '@shared/components'
import { useApp } from '@app/providers'
import { t as dict } from '@shared/utils/i18n'

export default function CustomersPage() {
  const { t, money, data } = useApp()

  const columns = [
    { key: 'code', label: t('sku'), render: (r) => <code>{r.code}</code> },
    { key: 'name', label: t('name'), render: (r) => t(r.name) },
    {
      key: 'type',
      label: t('type'),
      render: (r) => t(dict.custTypes[r.type] || { ar: r.type, en: r.type }),
    },
    { key: 'city', label: t('city'), render: (r) => t(r.city) },
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
      <PageHeader title={t('customers')} />
      <div className="panel">
        <DataTable columns={columns} rows={data.customers} empty={t('noData')} />
      </div>
    </div>
  )
}
