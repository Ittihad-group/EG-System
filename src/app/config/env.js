/**
 * Centralized public environment access.
 * Only VITE_* values are available in the browser bundle.
 */
const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''

export const env = Object.freeze({
  apiBaseUrl: String(rawApiBaseUrl).trim().replace(/\/$/, ''),
  /** `demo` = seed users (prototype). `api` = httpOnly cookie session from the backend. */
  authMode: import.meta.env.VITE_AUTH_MODE === 'api' ? 'api' : 'demo',
  appEnv: import.meta.env.VITE_APP_ENV || import.meta.env.MODE || 'development',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
})
