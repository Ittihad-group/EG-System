import { DataTable, PageHeader, StatCard } from '@shared/components'
import { useApp } from '@app/providers'

export default function InventoryPage() {
  const { t, data } = useApp()
  const productMap = Object.fromEntries(data.products.map((p) => [p.id, p]))
  const whMap = Object.fromEntries(data.warehouses.map((w) => [w.id, w]))

  const rows = data.inventory.map((row) => {
    const product = productMap[row.productId]
    const available = row.qty - row.reserved
    return {
      ...row,
      product,
      available,
      low: product ? available < product.minStock : false,
    }
  })

  const lowCount = rows.filter((r) => r.low).length
  const totalSku = new Set(rows.map((r) => r.productId)).size

  const columns = [
    {
      key: 'sku',
      label: t('sku'),
      render: (r) => <code>{r.product?.sku}</code>,
    },
    { key: 'name', label: t('name'), render: (r) => t(r.product?.name || {}) },
    { key: 'wh', label: t('warehouse'), render: (r) => t(whMap[r.warehouseId]?.name || {}) },
    { key: 'stock', label: t('stock'), render: (r) => r.qty },
    { key: 'reserved', label: t('reserved'), render: (r) => r.reserved },
    {
      key: 'available',
      label: t('available'),
      render: (r) => (
        <span className={r.low ? 'text-danger' : ''}>
          {r.available}
          {r.low ? ` · ${t('lowStock')}` : ''}
        </span>
      ),
    },
    {
      key: 'min',
      label: t('minStock'),
      render: (r) => r.product?.minStock ?? '—',
    },
  ]

  return (
    <div>
      <PageHeader title={t('inventory')} subtitle={t(data.company.plant)} />
      <div className="stats-grid compact">
        <StatCard label={t('products')} value={totalSku} />
        <StatCard label={t('warehouse')} value={data.warehouses.length} />
        <StatCard label={t('lowStock')} value={lowCount} tone={lowCount ? 'danger' : 'ok'} />
      </div>
      <div className="panel">
        <DataTable columns={columns} rows={rows} empty={t('noData')} />
      </div>
    </div>
  )
}
