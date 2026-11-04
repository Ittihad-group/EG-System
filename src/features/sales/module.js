import { lazy } from 'react'
import { PATHS } from '@app/config/paths'
import { PERMISSIONS } from '@app/config/permissions'

/** @type {import('@shared/types').ErpModule} */
export const salesModule = {
  id: 'sales',
  labelKey: 'sales',
  icon: '↗',
  root: PATHS.sales.root,
  pages: [
    {
      id: 'orders',
      path: PATHS.sales.orders,
      labelKey: 'salesOrders',
      permission: PERMISSIONS.SALES_ORDERS_READ,
      Component: lazy(() => import('./presentation/pages/SalesPage')),
    },
    {
      id: 'customers',
      path: PATHS.sales.customers,
      labelKey: 'customers',
      permission: PERMISSIONS.SALES_CUSTOMERS_READ,
      Component: lazy(() => import('./presentation/pages/CustomersPage')),
    },
  ],
}
