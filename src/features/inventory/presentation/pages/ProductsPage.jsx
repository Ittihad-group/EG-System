import { useMemo, useState } from 'react'
import { DataTable, PageHeader } from '@shared/components'
import { useApp } from '@app/providers'

export default function ProductsPage() {
  const { t, money, data } = useApp()
  const [q, setQ] = useState('')

  const rows = useMemo(() => {
    const catMap = Object.fromEntries(data.categories.map((c) => [c.id, c]))
    const term = q.trim().toLowerCase()
    return data.products.filter((p) => {
      if (!term) return true
      return (
        p.sku.toLowerCase().includes(term) ||
        t(p.name).toLowerCase().includes(term) ||
        t(catMap[p.categoryId]?.name || {}).toLowerCase().includes(term)
      )
    })
  }, [q, data.products, data.categories, t])

  const categoryLabel = (categoryId) => {
    const category = data.categories.find((c) => c.id === categoryId)
    return t(category?.name || {})
  }

  const columns = [
    { key: 'sku', label: t('sku'), render: (r) => <code>{r.sku}</code> },
    { key: 'name', label: t('name'), render: (r) => t(r.name) },
    {
      key: 'category',
      label: t('category'),
      render: (r) => categoryLabel(r.categoryId),
    },
    { key: 'uom', label: t('uom'), render: (r) => t(r.uom) },
    { key: 'price', label: t('price'), render: (r) => money(r.priceExVat) },
    { key: 'cost', label: t('cost'), render: (r) => money(r.cost) },
    {
      key: 'widths',
      label: t('widths'),
      render: (r) => (r.widthsCm?.length ? r.widthsCm.join(' / ') : '—'),
    },
    {
      key: 'colors',
      label: t('colors'),
      render: (r) =>
        r.colors?.length ? r.colors.slice(0, 4).join(', ') + (r.colors.length > 4 ? '…' : '') : '—',
    },
  ]

  return (
    <div>
      <PageHeader
        title={t('products')}
        subtitle={t(data.company.name)}
        actions={
          <input
            className="search-input"
            placeholder={t('search')}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        }
      />
      <div className="panel">
        <DataTable columns={columns} rows={rows} empty={t('noData')} />
      </div>
    </div>
  )
}
