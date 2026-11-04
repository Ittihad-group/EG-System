/**
 * Single source of truth for every URL in the ERP.
 *
 * Rules:
 * - Shape is `/<module>/<resource>[/<id>|/new]`. One page = one URL.
 * - Never hardcode a path string in a page or component — import from here.
 * - When multi-company support lands, the `/:company` prefix is added here and
 *   in the router only; call sites stay the same.
 */
export const PATHS = Object.freeze({
  login: '/login',
  dashboard: '/',

  sales: Object.freeze({
    root: '/sales',
    orders: '/sales/orders',
    customers: '/sales/customers',
  }),
  inventory: Object.freeze({
    root: '/inventory',
    stock: '/inventory/stock',
    products: '/inventory/products',
  }),
  purchasing: Object.freeze({
    root: '/purchasing',
    orders: '/purchasing/orders',
    suppliers: '/purchasing/suppliers',
  }),
  production: Object.freeze({
    root: '/production',
    workOrders: '/production/work-orders',
  }),
  finance: Object.freeze({
    root: '/finance',
    overview: '/finance/overview',
  }),
  hr: Object.freeze({
    root: '/hr',
    employees: '/hr/employees',
  }),
  settings: Object.freeze({
    root: '/settings',
    general: '/settings/general',
  }),
})

/**
 * Old flat URLs → their new home, so bookmarks and shared links keep working.
 * (`/sales`, `/inventory`, `/production`, `/finance`, `/hr`, `/settings` are
 * module roots and already redirect to the first allowed page.)
 * When a URL changes in the future, add the old one here — never just drop it.
 */
export const LEGACY_REDIRECTS = Object.freeze({
  '/products': PATHS.inventory.products,
  '/customers': PATHS.sales.customers,
  '/suppliers': PATHS.purchasing.suppliers,
  '/purchases': PATHS.purchasing.orders,
})
