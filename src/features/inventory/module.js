import { lazy } from 'react'
import { PATHS } from '@app/config/paths'
import { PERMISSIONS } from '@app/config/permissions'

/** @type {import('@shared/types').ErpModule} */
export const inventoryModule = {
  id: 'inventory',
  labelKey: 'inventory',
  icon: '▦',
  root: PATHS.inventory.root,
  pages: [
    {
      id: 'stock',
      path: PATHS.inventory.stock,
      labelKey: 'stockLevels',
      permission: PERMISSIONS.INVENTORY_STOCK_READ,
      Component: lazy(() => import('./presentation/pages/InventoryPage')),
    },
    {
      id: 'products',
      path: PATHS.inventory.products,
      labelKey: 'products',
      permission: PERMISSIONS.INVENTORY_PRODUCTS_READ,
      Component: lazy(() => import('./presentation/pages/ProductsPage')),
    },
  ],
}
