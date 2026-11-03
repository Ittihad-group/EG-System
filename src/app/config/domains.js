/**
 * Hostname → ERP module mapping.
 * All subdomains serve the same SPA build; this only scopes navigation/default route.
 * Authorization remains separate (role/permission checks).
 */
export const MODULES = Object.freeze({
  APP: 'app',
  SALES: 'sales',
  PRODUCTION: 'production',
  WAREHOUSE: 'warehouse',
  FINANCE: 'finance',
  HR: 'hr',
})

/** Subdomain label → module id */
export const SUBDOMAIN_MODULE_MAP = Object.freeze({
  app: MODULES.APP,
  sales: MODULES.SALES,
  production: MODULES.PRODUCTION,
  warehouse: MODULES.WAREHOUSE,
  inventory: MODULES.WAREHOUSE,
  finance: MODULES.FINANCE,
  hr: MODULES.HR,
})

/**
 * Which route prefixes each module exposes in the shell nav.
 * Paths are app routes (not hostnames).
 */
export const MODULE_ROUTE_KEYS = Object.freeze({
  [MODULES.APP]: [
    'dashboard',
    'products',
    'inventory',
    'sales',
    'production',
    'customers',
    'suppliers',
    'purchases',
    'hr',
    'finance',
    'settings',
  ],
  [MODULES.SALES]: ['dashboard', 'sales', 'customers', 'products'],
  [MODULES.PRODUCTION]: ['dashboard', 'production', 'products', 'inventory'],
  [MODULES.WAREHOUSE]: ['dashboard', 'inventory', 'products', 'purchases', 'suppliers'],
  [MODULES.FINANCE]: ['dashboard', 'finance', 'sales', 'purchases'],
  [MODULES.HR]: ['dashboard', 'hr', 'settings'],
})

export const MODULE_HOME_PATH = Object.freeze({
  [MODULES.APP]: '/',
  [MODULES.SALES]: '/sales',
  [MODULES.PRODUCTION]: '/production',
  [MODULES.WAREHOUSE]: '/inventory',
  [MODULES.FINANCE]: '/finance',
  [MODULES.HR]: '/hr',
})
