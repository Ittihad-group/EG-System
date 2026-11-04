/**
 * Permission keys — format: `<module>.<resource>.<action>`.
 *
 * The frontend only uses these to show/hide UI and guard routes (UX).
 * The backend must enforce the same keys on every endpoint.
 *
 * Grants may use wildcards: `*` (everything), `sales.*`, `sales.orders.*`.
 */
export const PERMISSIONS = Object.freeze({
  DASHBOARD_VIEW: 'dashboard.view',

  SALES_ORDERS_READ: 'sales.orders.read',
  SALES_CUSTOMERS_READ: 'sales.customers.read',

  INVENTORY_STOCK_READ: 'inventory.stock.read',
  INVENTORY_PRODUCTS_READ: 'inventory.products.read',

  PURCHASING_ORDERS_READ: 'purchasing.orders.read',
  PURCHASING_SUPPLIERS_READ: 'purchasing.suppliers.read',

  PRODUCTION_WORK_ORDERS_READ: 'production.work-orders.read',

  FINANCE_OVERVIEW_READ: 'finance.overview.read',

  HR_EMPLOYEES_READ: 'hr.employees.read',

  SETTINGS_GENERAL_MANAGE: 'settings.general.manage',
})
