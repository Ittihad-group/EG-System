import { env } from '@app/config/env'

/** Fired on any 401 so the app can drop the session and send the user to /login. */
export const UNAUTHORIZED_EVENT = 'eg:unauthorized'

export class ApiError extends Error {
  constructor(status, message, body) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

/**
 * Thin HTTP client for the external backend.
 * API URL comes from VITE_API_BASE_URL — never hardcode production hosts.
 *
 * Auth: the session is an httpOnly cookie set by the API, so every request goes
 * out with `credentials: 'include'`. No tokens are read or stored in JS.
 *
 * @param {string} path
 * @param {RequestInit & { skipUnauthorizedEvent?: boolean }} [options]
 */
export async function apiRequest(path, options = {}) {
  if (!env.apiBaseUrl) {
    throw new Error('VITE_API_BASE_URL is not configured')
  }

  const { skipUnauthorizedEvent = false, ...init } = options
  const url = `${env.apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`
  const headers = {
    Accept: 'application/json',
    ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    ...init.headers,
  }

  const response = await fetch(url, {
    ...init,
    headers,
    credentials: 'include',
  })

  if (!response.ok) {
    if (response.status === 401 && !skipUnauthorizedEvent) {
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT))
    }
    const body = await response.json().catch(() => null)
    throw new ApiError(response.status, `API ${response.status}: ${response.statusText}`, body)
  }

  if (response.status === 204) return null
  return response.json()
}
