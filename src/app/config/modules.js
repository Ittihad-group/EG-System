/**
 * ERP module registry — the order here is the sidebar order.
 *
 * Each feature describes itself in `features/<name>/module.js` (URLs, labels,
 * required permission, lazy page). The router and the sidebar are both built
 * from this list, so adding a module never means editing them by hand.
 *
 * Import `module.js` directly (not the feature `index.js`) so pages stay lazy.
 */
import { dashboardModule } from '@features/dashboard/module'
import { salesModule } from '@features/sales/module'
import { inventoryModule } from '@features/inventory/module'
import { productionModule } from '@features/production/module'
import { purchasingModule } from '@features/purchasing/module'
import { financeModule } from '@features/finance/module'
import { hrModule } from '@features/hr/module'
import { settingsModule } from '@features/users/module'

/** @type {import('@shared/types').ErpModule[]} */
export const modules = [
  dashboardModule,
  salesModule,
  inventoryModule,
  productionModule,
  purchasingModule,
  financeModule,
  hrModule,
  settingsModule,
]
