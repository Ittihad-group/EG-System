/**
 * Centralized public environment access.
 * Only VITE_* values are available in the browser bundle.
 */
const rawBaseDomain = import.meta.env.VITE_BASE_DOMAIN || 'localhost'
const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''

export const env = Object.freeze({
  baseDomain: String(rawBaseDomain).trim().toLowerCase(),
  apiBaseUrl: String(rawApiBaseUrl).trim().replace(/\/$/, ''),
  appEnv: import.meta.env.VITE_APP_ENV || import.meta.env.MODE || 'development',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
})
