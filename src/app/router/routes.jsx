import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '@app/layouts/AppLayout'
import { getModuleHomePath, resolveHostnameModule } from '@app/router/subdomain'

const LoginPage = lazy(() => import('@features/auth/presentation/pages/LoginPage'))
const DashboardPage = lazy(() => import('@features/dashboard/presentation/pages/DashboardPage'))
const ProductsPage = lazy(() => import('@features/inventory/presentation/pages/ProductsPage'))
const InventoryPage = lazy(() => import('@features/inventory/presentation/pages/InventoryPage'))
const SalesPage = lazy(() => import('@features/sales/presentation/pages/SalesPage'))
const CustomersPage = lazy(() => import('@features/sales/presentation/pages/CustomersPage'))
const ProductionPage = lazy(() => import('@features/production/presentation/pages/ProductionPage'))
const SuppliersPage = lazy(() => import('@features/purchasing/presentation/pages/SuppliersPage'))
const PurchasesPage = lazy(() => import('@features/purchasing/presentation/pages/PurchasesPage'))
const HRPage = lazy(() => import('@features/hr/presentation/pages/HRPage'))
const FinancePage = lazy(() => import('@features/finance/presentation/pages/FinancePage'))
const SettingsPage = lazy(() => import('@features/users/presentation/pages/SettingsPage'))

function PageFallback() {
  return <div className="page-fallback">Loading…</div>
}

function HomeRedirect() {
  const moduleId = resolveHostnameModule()
  const home = getModuleHomePath(moduleId)
  if (home === '/') return <DashboardPage />
  return <Navigate to={home} replace />
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route index element={<HomeRedirect />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="production" element={<ProductionPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="suppliers" element={<SuppliersPage />} />
          <Route path="purchases" element={<PurchasesPage />} />
          <Route path="hr" element={<HRPage />} />
          <Route path="finance" element={<FinancePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
