import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { modules } from '@app/config/modules'
import { LEGACY_REDIRECTS, PATHS } from '@app/config/paths'
import AppLayout from '@app/layouts/AppLayout'
import NotFoundPage from '@app/pages/NotFoundPage'
import PageFallback from '@app/pages/PageFallback'
import { HomeRoute, ModuleIndexRedirect, RequireAuth, RequirePermission } from './guards'
import LegacyRedirect from './LegacyRedirect'

const LoginPage = lazy(() => import('@features/auth/presentation/pages/LoginPage'))

/** Child routes are relative so the tree can later be nested under `/:company`. */
const relative = (absolutePath) => absolutePath.replace(/^\//, '')

function moduleRoutes(mod) {
  const routes = []

  if (mod.root !== PATHS.dashboard) {
    routes.push(
      <Route
        key={`${mod.id}:index`}
        path={relative(mod.root)}
        element={<ModuleIndexRedirect module={mod} />}
      />,
    )
  }

  for (const page of mod.pages) {
    if (page.path === PATHS.dashboard) {
      routes.push(<Route key={`${mod.id}:${page.id}`} index element={<HomeRoute page={page} />} />)
      continue
    }

    routes.push(
      <Route
        key={`${mod.id}:${page.id}`}
        path={relative(page.path)}
        element={
          <RequirePermission permission={page.permission}>
            <page.Component />
          </RequirePermission>
        }
      />,
    )
  }

  return routes
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path={PATHS.login} element={<LoginPage />} />
        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          {modules.flatMap(moduleRoutes)}
          {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
            <Route key={from} path={relative(from)} element={<LegacyRedirect to={to} />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
