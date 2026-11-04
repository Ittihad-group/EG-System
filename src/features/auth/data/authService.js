import { env } from '@app/config/env'
import { toSessionUser } from '../domain/sessionUser'
import { apiAuthSource } from './apiAuthSource'
import { demoAuthSource } from './demoAuthSource'

const source = env.authMode === 'api' ? apiAuthSource : demoAuthSource

/**
 * The only auth entry point the app uses. Switching demo → real backend is
 * `VITE_AUTH_MODE=api`; nothing else in the app changes.
 */
export const authService = {
  mode: env.authMode,

  /** Restore the session on boot. Returns the user or null (never throws). */
  async restore() {
    try {
      const dto = await source.me()
      return dto ? toSessionUser(dto) : null
    } catch {
      return null
    }
  },

  /** @returns {Promise<{ ok: true, user: import('@shared/types').AppUser } | { ok: false, reason: 'invalid_credentials' | 'unavailable' }>} */
  async login(email, password) {
    try {
      return { ok: true, user: toSessionUser(await source.login(email, password)) }
    } catch (error) {
      return { ok: false, reason: error?.status === 401 ? 'invalid_credentials' : 'unavailable' }
    }
  },

  async logout() {
    try {
      await source.logout()
    } catch {
      // The local session is dropped regardless; the cookie expires server-side.
    }
  },
}
