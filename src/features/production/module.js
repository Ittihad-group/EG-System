import { lazy } from 'react'
import { PATHS } from '@app/config/paths'
import { PERMISSIONS } from '@app/config/permissions'

/** @type {import('@shared/types').ErpModule} */
export const productionModule = {
  id: 'production',
  labelKey: 'production',
  icon: '⚙',
  root: PATHS.production.root,
  pages: [
    {
      id: 'workOrders',
      path: PATHS.production.workOrders,
      labelKey: 'workOrders',
      permission: PERMISSIONS.PRODUCTION_WORK_ORDERS_READ,
      Component: lazy(() => import('./presentation/pages/ProductionPage')),
    },
  ],
}
