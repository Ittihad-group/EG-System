import { env } from '@app/config/env'

/**
 * Thin HTTP client for the external backend.
 * API URL comes from VITE_API_BASE_URL — never hardcode production hosts.
 */
export async function apiRequest(path, options = {}) {
  if (!env.apiBaseUrl) {
    throw new Error('VITE_API_BASE_URL is not configured')
  }

  const url = `${env.apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`
  const headers = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const message = `API ${response.status}: ${response.statusText}`
    throw new Error(message)
  }

  if (response.status === 204) return null
  return response.json()
}
