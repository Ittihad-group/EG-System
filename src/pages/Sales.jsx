import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import { useApp } from '../context/AppContext'
import { t as dict } from '../data/i18n'

function orderTotal(order) {
  return order.lines.reduce((sum, l) => sum + l.qty * l.unitPrice, 0)
}

export default function Sales() {
  const { t, money, data, statusLabel } = useApp()
  const custMap = Object.fromEntries(data.customers.map((c) => [c.id, c]))

  const columns = [
    { key: 'number', label: '#', render: (r) => <strong>{r.number}</strong> },
    { key: 'date', label: t('date') },
    {
      key: 'customer',
      label: t('customer'),
      render: (r) => t(custMap[r.customerId]?.name || {}),
    },
    {
      key: 'payment',
      label: t('payment'),
      render: (r) => t(dict.payments[r.payment] || { ar: r.payment, en: r.payment }),
    },
    {
      key: 'status',
      label: t('status'),
      render: (r) => <StatusBadge status={r.status} label={statusLabel(r.status)} />,
    },
    {
      key: 'lines',
      label: t('qty'),
      render: (r) => r.lines.reduce((s, l) => s + l.qty, 0),
    },
    {
      key: 'total',
      label: t('total'),
      render: (r) => money(orderTotal(r)),
    },
  ]

  return (
    <div>
      <PageHeader title={t('sales')} />
      <div className="panel">
        <DataTable columns={columns} rows={data.salesOrders} empty={t('noData')} />
      </div>

      <div className="detail-stack">
        {data.salesOrders.map((order) => (
          <details key={order.id} className="panel details-panel">
            <summary>
              {order.number} — {t(custMap[order.customerId]?.name || {})} — {money(orderTotal(order))}
            </summary>
            <table className="data-table nested">
              <thead>
                <tr>
                  <th>{t('sku')}</th>
                  <th>{t('name')}</th>
                  <th>{t('qty')}</th>
                  <th>{t('widths')}</th>
                  <th>{t('colors')}</th>
                  <th>{t('price')}</th>
                  <th>{t('total')}</th>
                </tr>
              </thead>
              <tbody>
                {order.lines.map((line, i) => {
                  const product = data.products.find((p) => p.id === line.productId)
                  return (
                    <tr key={i}>
                      <td>
                        <code>{product?.sku}</code>
                      </td>
                      <td>{t(product?.name || {})}</td>
                      <td>{line.qty}</td>
                      <td>{line.widthCm ?? '—'}</td>
                      <td>{line.color ?? '—'}</td>
                      <td>{money(line.unitPrice)}</td>
                      <td>{money(line.qty * line.unitPrice)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </details>
        ))}
      </div>
    </div>
  )
}
