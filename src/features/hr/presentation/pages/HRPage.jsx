import { DataTable, PageHeader, StatusBadge } from '@shared/components'
import { useApp } from '@app/providers'

export default function HRPage() {
  const { t, data, statusLabel } = useApp()

  const columns = [
    { key: 'code', label: t('sku'), render: (r) => <code>{r.code}</code> },
    { key: 'name', label: t('name'), render: (r) => t(r.name) },
    { key: 'dept', label: t('department'), render: (r) => t(r.dept) },
    { key: 'title', label: t('title'), render: (r) => t(r.title) },
    { key: 'phone', label: t('phone') },
    { key: 'joinDate', label: t('joinDate') },
    {
      key: 'status',
      label: t('status'),
      render: (r) => <StatusBadge status={r.status} label={statusLabel(r.status)} />,
    },
  ]

  return (
    <div>
      <PageHeader title={t('hr')} subtitle={t(data.company.plant)} />
      <div className="panel">
        <DataTable columns={columns} rows={data.employees} empty={t('noData')} />
      </div>
    </div>
  )
}
