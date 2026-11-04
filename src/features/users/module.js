import { lazy } from 'react'
import { PATHS } from '@app/config/paths'
import { PERMISSIONS } from '@app/config/permissions'

/** @type {import('@shared/types').ErpModule} */
export const settingsModule = {
  id: 'settings',
  labelKey: 'settings',
  icon: '⚙︎',
  root: PATHS.settings.root,
  pages: [
    {
      id: 'general',
      path: PATHS.settings.general,
      labelKey: 'generalSettings',
      permission: PERMISSIONS.SETTINGS_GENERAL_MANAGE,
      Component: lazy(() => import('./presentation/pages/SettingsPage')),
    },
  ],
}
