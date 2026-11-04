import { modules } from '@app/config/modules'
import { PATHS } from '@app/config/paths'

/**
 * Sidebar model for the current user: each module keeps only the pages the
 * user may open, and modules with no visible page disappear entirely.
 * A user with several roles simply sees several modules in one sidebar.
 *
 * @param {(permission?: string) => boolean} can
 */
export function buildNavigation(can) {
  return modules
    .map((mod) => ({ ...mod, pages: mod.pages.filter((page) => can(page.permission)) }))
    .filter((mod) => mod.pages.length > 0)
}

/**
 * Where to land after login or when opening `/`:
 * the dashboard if allowed, otherwise the first page the user can open.
 *
 * @param {(permission?: string) => boolean} can
 */
export function getHomePath(can) {
  const first = buildNavigation(can)[0]?.pages[0]
  return first?.path ?? PATHS.dashboard
}
