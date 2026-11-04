import { apiRequest } from '@shared/services/apiClient'

/**
 * Production auth: the API owns the session as an httpOnly, Secure cookie.
 * The frontend never sees or stores a token.
 *
 *   GET  /auth/me      → 200 user | 401 when not signed in
 *   POST /auth/login   → 200 user (+ Set-Cookie) | 401 bad credentials
 *   POST /auth/logout  → 204 (cookie cleared)
 */
export const apiAuthSource = {
  async me() {
    try {
      return await apiRequest('/auth/me', { skipUnauthorizedEvent: true })
    } catch (error) {
      if (error?.status === 401) return null
      throw error
    }
  },

  login(email, password) {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipUnauthorizedEvent: true,
    })
  },

  async logout() {
    await apiRequest('/auth/logout', { method: 'POST', skipUnauthorizedEvent: true })
  },
}
