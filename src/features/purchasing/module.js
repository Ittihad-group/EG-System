import { lazy } from 'react'
import { PATHS } from '@app/config/paths'
import { PERMISSIONS } from '@app/config/permissions'

/** @type {import('@shared/types').ErpModule} */
export const purchasingModule = {
  id: 'purchasing',
  labelKey: 'purchases',
  icon: '↙',
  root: PATHS.purchasing.root,
  pages: [
    {
      id: 'orders',
      path: PATHS.purchasing.orders,
      labelKey: 'purchaseOrders',
      permission: PERMISSIONS.PURCHASING_ORDERS_READ,
      Component: lazy(() => import('./presentation/pages/PurchasesPage')),
    },
    {
      id: 'suppliers',
      path: PATHS.purchasing.suppliers,
      labelKey: 'suppliers',
      permission: PERMISSIONS.PURCHASING_SUPPLIERS_READ,
      Component: lazy(() => import('./presentation/pages/SuppliersPage')),
    },
  ],
}
