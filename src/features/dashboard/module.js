import { lazy } from 'react'
import { PATHS } from '@app/config/paths'
import { PERMISSIONS } from '@app/config/permissions'

/** @type {import('@shared/types').ErpModule} */
export const dashboardModule = {
  id: 'dashboard',
  labelKey: 'dashboard',
  icon: '▣',
  root: PATHS.dashboard,
  pages: [
    {
      id: 'home',
      path: PATHS.dashboard,
      labelKey: 'dashboard',
      permission: PERMISSIONS.DASHBOARD_VIEW,
      Component: lazy(() => import('./presentation/pages/DashboardPage')),
    },
  ],
}
