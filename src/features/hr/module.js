import { lazy } from 'react'
import { PATHS } from '@app/config/paths'
import { PERMISSIONS } from '@app/config/permissions'

/** @type {import('@shared/types').ErpModule} */
export const hrModule = {
  id: 'hr',
  labelKey: 'hr',
  icon: '☰',
  root: PATHS.hr.root,
  pages: [
    {
      id: 'employees',
      path: PATHS.hr.employees,
      labelKey: 'employees',
      permission: PERMISSIONS.HR_EMPLOYEES_READ,
      Component: lazy(() => import('./presentation/pages/HRPage')),
    },
  ],
}
