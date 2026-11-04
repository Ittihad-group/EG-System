import { lazy } from 'react'
import { PATHS } from '@app/config/paths'
import { PERMISSIONS } from '@app/config/permissions'

/** @type {import('@shared/types').ErpModule} */
export const financeModule = {
  id: 'finance',
  labelKey: 'finance',
  icon: '﷼',
  root: PATHS.finance.root,
  pages: [
    {
      id: 'overview',
      path: PATHS.finance.overview,
      labelKey: 'financeOverview',
      permission: PERMISSIONS.FINANCE_OVERVIEW_READ,
      Component: lazy(() => import('./presentation/pages/FinancePage')),
    },
  ],
}
