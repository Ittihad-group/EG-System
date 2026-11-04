import { Navigate, useLocation } from 'react-router-dom'
import { PATHS } from '@app/config/paths'
import ForbiddenPage from '@app/pages/ForbiddenPage'
import PageFallback from '@app/pages/PageFallback'
import { useApp } from '@app/providers'
import { getHomePath } from './navigation'

/** Sends anonymous users to /login and remembers where they were going. */
export function RequireAuth({ children }) {
  const { user, authStatus } = useApp()
  const location = useLocation()

  if (authStatus === 'loading') return <PageFallback />
  if (!user) return <Navigate to={PATHS.login} replace state={{ from: location }} />
  return children
}

/**
 * Renders the page only when the user holds `permission`; otherwise shows 403
 * at the same URL. UX only — the API enforces the real rule.
 */
export function RequirePermission({ permission, children }) {
  const { can } = useApp()
  return can(permission) ? children : <ForbiddenPage />
}

/** `/sales` → first page inside Sales the user may open (e.g. `/sales/orders`). */
export function ModuleIndexRedirect({ module }) {
  const { can } = useApp()
  const target = module.pages.find((page) => can(page.permission))

  return target ? <Navigate to={target.path} replace /> : <ForbiddenPage />
}

/** `/` → the dashboard, or the user's first allowed page if they can't see it. */
export function HomeRoute({ page }) {
  const { can } = useApp()
  if (can(page.permission)) return <page.Component />

  const home = getHomePath(can)
  return home === PATHS.dashboard ? <ForbiddenPage /> : <Navigate to={home} replace />
}
